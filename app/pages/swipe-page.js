import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    Text,
    Button
} from 'react-native';
import Image from 'react-native-remote-svg';
import checkIcon from '../assets/checked.svg';
import cancelIcon from '../assets/cancel.svg';
import Card from "../Card";
import EmptyState from '../EmptyState';
import { ProductService } from '../services/product-service'
import Modal from "react-native-modal";
import MatchDialog from '../components/match-dealog'
import ImagePicker from 'react-native-image-picker';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SwipePage extends React.Component {

    constructor() {
        super();
        this.state = { 
            isLoading: true, 
            products: [],
            matchedProduct: null
        };
        this.productService = new ProductService();
        this.closeWon = this.closeWon.bind(this);
        this.showImagePicker = this.showImagePicker.bind(this);

    }

    async fetchProducts(){
        this.setState({ isLoading: true });

        return this.productService.getProducts().then((products) => {
            let lastItemPosition = false;
            products.forEach((product, i) => {
                const position = new Animated.ValueXY();
                product.position = position;
                product.parentPosition = lastItemPosition;
                lastItemPosition = position;
            });
            this.setState({
                isLoading: false,
                products: products
            })
        })
    }

    componentDidMount() {
        this.fetchProducts();
    }

    closeWon() {
        this.setState({
            matchedProduct: null
        })
    }

    onProductSwiped = (id) => {
        this.setState(prevState => {
            const swipedIndex = prevState.products.findIndex(card => card.id === id);
            const isLastIndex = swipedIndex === (prevState.products.length - 1);
            const nextIndex = swipedIndex + 1;
            const newState = { ...prevState };
            newState.products[swipedIndex]['isActive'] = false;
            if (isLastIndex) return prevState;
            newState.products[nextIndex]['isActive'] = true;
            return newState;
        });
    }

    handleNopeSelect = (dy = 0, position = false) => {
        const activeIndex = this.state.products.findIndex(card => card.isActive);
        if (activeIndex < 0) return;
        if (!position) {
            position = this.state.products[activeIndex].position;
        }
        Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: dy }
        }).start(this.onProductSwiped(this.state.products[activeIndex].id));

        this.productService.dislikeProduct(this.state.products[activeIndex].id);
    }

    handleLikeSelect = (dy = 0, position = false) => {
        const activeIndex = this.state.products.findIndex(card => card.isActive);
        if (activeIndex < 0) return;
        if (!position) {
            position = this.state.products[activeIndex].position;
        }
        Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: dy }
        }).start(this.onProductSwiped(this.state.products[activeIndex].id));

        this.productService.likeProduct(this.state.products[activeIndex].id);
        this.setState({
            matchedProduct: this.state.products[activeIndex]
        })
    }

    renderProducts = (products) => {
        if (this.isEmptyState()) return <EmptyState reloadProducts={this.reloadProducts} />

        return products.map((card, index) => {
            return <Card key={card.id} {...card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} />;
        }).reverse();
    }

    reloadProducts = () => {
        this.fetchProducts();
    }

    isEmptyState = () => {
        return this.state.products.findIndex(card => card.isActive) < 0;
    }

    showImagePicker() {
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Text>Loading Gifts...</Text>
            )
        } else {
            return (
                <View style={styles.container} >
                    <View style={styles.cardArea} >
                        {this.renderProducts(this.state.products)}
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.handleLikeSelect()} >
                            <Image source={checkIcon} style={styles.btnIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => this.handleNopeSelect()} >
                            <Image source={cancelIcon} style={styles.btnIcon} />
                        </TouchableOpacity>
                    </View>
                    <Button onPress={this.showImagePicker}></Button>
                    <Modal 
                        isVisible={this.state.matchedProduct != null} 
                        animationIn='flipInY'
                        backdropOpacity={0.3}>
                        <MatchDialog product={this.state.matchedProduct} onClick={this.closeWon}></MatchDialog>
                    </Modal>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'stretch',
    },
    cardArea: {
        flex: 10,
        marginTop: 30
    },
    btnContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    btn: {
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        backgroundColor: '#efefef',
    },
    btnIcon: {
        height: 25,
        width: 25,
    },
});

import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    Text
} from 'react-native';
import Image from 'react-native-remote-svg';
import checkIcon from '../assets/checked.svg';
import cancelIcon from '../assets/cancel.svg';
import Card from "../Card";
import EmptyState from '../EmptyState';
import { ProductService } from '../services/product-service'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// const getproducts = () => {
//     const products = [
//         { id: '1', image: img1, isActive: true },
//         { id: '2', image: img2, isActive: false },
//         { id: '3', image: img3, isActive: false },
//         { id: '4', image: img4, isActive: false },
//         { id: '5', image: img5, isActive: false },
//     ];
//     let lastItemPosition = false;
//     products.forEach((card, i) => {
//         const position = new Animated.ValueXY();
//         card.position = position;
//         card.parentPosition = lastItemPosition;
//         lastItemPosition = position;
//     });
//     return products;
// }

export default class SwipePage extends React.Component {

    constructor() {
        super();
        this.state = { isLoading: true, products: [] };
        this.productService = new ProductService();
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

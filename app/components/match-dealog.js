import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

export default function MatchDialog({ user, product, onClick }) {
    return (
        <View style={styles.container}>
            <View style={styles.dialog}>
                <Text>IT'S A MATCH!</Text>
                {
                    product && <Image style={styles.productImage} source={product.image}></Image>
                }
                <TouchableOpacity onPress={onClick}>
                    <Text>Hide me!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialog: {
        width: '80%',
        height: '70%',
        backgroundColor: 'rgba(91, 215, 91, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    productImage: {
        borderRadius: 20,
    height: '50%',
    width: null
    
    }
});
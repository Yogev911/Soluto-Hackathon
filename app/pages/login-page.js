import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Animated,
    Dimensions,
    Image,
    TextInput,
    Button,
    TouchableHighlight,
  } from 'react-native';
import { UserService } from '../services/user-service';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
        this.userService = new UserService()
    }
   

    render() {return (           
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="username"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(username) => this.setState({username})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>
    
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.onLogin(this.state.username, this.state.password)}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
    
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.onClickListener('restore_password')}>
              <Text>Forgot your password?</Text>
          </TouchableHighlight>
    
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.onClickListener('register')}>
              <Text>Register</Text>
          </TouchableHighlight>
        </View>
        
        )
         }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    }
});

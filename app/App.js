import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Button,
  TouchableHighlight,
  Alert
} from 'react-native';
import Image from 'react-native-remote-svg';
import checkIcon from './assets/checked.svg';
import cancelIcon from './assets/cancel.svg';
import Card from "./Card";
import img1 from './assets/image1.jpeg';
import img2 from './assets/image2.jpeg';
import img3 from './assets/image3.jpeg';
import img4 from './assets/image4.jpeg';
import img5 from './assets/image5.jpeg';
import EmptyState from './EmptyState';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const getCards = () => {
  const cards = [
    { id: '1', image: img1, isActive: true },
    { id: '2', image: img2, isActive: false },
    { id: '3', image: img3, isActive: false },
    { id: '4', image: img4, isActive: false },
    { id: '5', image: img5, isActive: false },
  ];
  let lastItemPosition = false;
  cards.forEach((card, i) => {
    const position = new Animated.ValueXY();
    card.position = position;
    card.parentPosition = lastItemPosition;
    lastItemPosition = position;
  });
  return cards;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    stage = {
      username : '',
      password: '',
    }
    const cards = getCards();
    const is_login = false;

    this.state = {cards, is_login};
  }

  onClickListener = (viewId) => {
    this.setState({is_login:true})
    }

  onCardSwiped = (id) => {
    this.setState(prevState => {
      const swipedIndex = prevState.cards.findIndex(card => card.id === id);
      const isLastIndex = swipedIndex === (prevState.cards.length - 1);
      const nextIndex = swipedIndex + 1;
      const newState = {...prevState};
      newState.cards[swipedIndex]['isActive'] = false;
      if (isLastIndex) return prevState;
      newState.cards[nextIndex]['isActive'] = true;
      return newState;
    });
  }

  handleNopeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
  }

  handleLikeSelect = (dy=0, position=false) => {
    const activeIndex = this.state.cards.findIndex(card => card.isActive);
    if (activeIndex < 0) return;
    if (!position) {
      position = this.state.cards[activeIndex].position;
    }
    Animated.spring(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: dy }
    }).start(this.onCardSwiped(this.state.cards[activeIndex].id));
  }

  renderCards = (cards) => {
    if (this.isEmptyState()) return <EmptyState reloadCards={this.reloadCards} />
    
    return cards.map((card, index) => {
      return <Card key={card.id} {...card} handleNopeSelect={this.handleNopeSelect} handleLikeSelect={this.handleLikeSelect} />;
    }).reverse();
  }

  reloadCards = () => {
    const cards = getCards();
    this.setState({cards});
  }

  isEmptyState = () => {
    return this.state.cards.findIndex(card => card.isActive) < 0;
  }

  render() {
    if(this.state.is_login){
    return (

      <View style={styles.container} >
        <View style={styles.cardArea} >
          <Text>{this.state.is_login}</Text>
          {this.renderCards(this.state.cards)}
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
  else{
    
    return (           
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <Text>{this.state.is_login}</Text>
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

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
          <Text>Register</Text>
      </TouchableHighlight>
    </View>
    
    )
  }
}
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
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

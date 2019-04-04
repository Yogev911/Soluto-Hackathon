import React from 'react';
import SwipePage from './pages/swipe-page'
import LoginPage from './pages/login-page'
export default class App extends React.Component {

  constructor(props) {
    super(props);
    const is_login = false;
    this.state = {is_login};
  }

  onClickListener = (viewId) => {
    this.setState({is_login:true})
    }
  
  render() {
    if(this.state.is_login){
      return (
        <SwipePage></SwipePage>
      )
    }
    else{
      return(
        <LoginPage onClickListener={this.onClickListener}/>
      )
    }
  }
}

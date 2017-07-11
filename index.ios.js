/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

var Login         = require('./Login.js'),
    AppContainer  = require('./AppContainer.js'),
    AuthService   = require('./AuthService.js')

export default class github extends Component {
  componentDidMount(){
    AuthService.getAuthInfo((err, authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    })
  }
  constructor(props) {
    super(props);
      this.state = {
        isLoggedIn: false,
        onLogin: () => {
          this.setState({isLoggedIn: true});
        },
        checkingAuth: true
      };
  }

  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      )
    } else if (this.state.isLoggedIn) {
      return (
        <AppContainer/>
      )
    } else {
      return (
          <Login onLogin={this.state.onLogin}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('github', () => github);

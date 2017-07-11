'use strict';

// var React = require('react-native');
var buffer = require('buffer');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      showProgress: false
    }
  }
  render(){
    var errorCtrl = <View />
    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>
                    That username and password combination did not work
                  </Text>
    } else if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
                    We have experienced an unexpected issue
                  </Text>
    }
    return (
      <View style={styles.container}>
      <Image style={styles.logo} source={require('./mark-github.png')} />
      <Text style={styles.heading}>Github browser............</Text>
      <TextInput style={styles.input} placeholder="Github username" onChangeText={(text)=> this.setState({username: text})}/>
      <TextInput style={styles.input} placeholder="Github password" secureTextEntry='true' onChangeText={(text)=> this.setState({password: text})}/>
      <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableHighlight>
      {errorCtrl}
      <ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader}/>
      </View>
    )
  }

  onLoginPressed(){
    this.setState({showProgress: true});
    var AuthService = require('./AuthService');
      AuthService.login(
        {
          username: this.state.username,
          password: this.state.password
        },
        (results) => {
          this.setState(Object.assign({
            showProgress: false
          }, results));

          if(results.success && this.props.onLogin){
            this.props.onLogin();
          }
        }
      );
  };


};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10,
  },
  logo:{
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    backgroundColor: '#48bbec',
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#FFF'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
})

module.exports = Login;

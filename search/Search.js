'use strict';

// var React = require('react-native');
var SearchResults = require('./SearchResults.js');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';

class Search extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search repos" onChangeText={(text)=> this.setState({searchQuery: text})}/>
      <TouchableHighlight onPress={this.onSearchPressed.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableHighlight>

      </View>
    )
  }
  onSearchPressed(){
    this.props.navigator.push({
      component: SearchResults,
      title: "Results",
      passProps: {
        searchQuery: this.state.searchQuery
      }
    });
    
  };
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
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
  }
})

module.exports = Search;

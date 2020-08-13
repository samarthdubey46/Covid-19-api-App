
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import { Base64 } from 'js-base64';
import Main from './src/navigators/index'

export default class App extends React.Component{
  render(){
      return (<Main {...this.props} />)
  }
}
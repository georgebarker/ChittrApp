import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
export default class ChitsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: null
    }
  }

  async getToken () {
    try {
      const value = await AsyncStorage.getItem('TOKEN_KEY')
      if (value !== null) {
        this.setState({ token: value })
      }
    } catch (e) {
      // error reading value
    }
  }

  render () {
    this.getToken()
    return (
      <View>
        <Text>Chits Screen!</Text>
        <Text>{this.state.token}</Text>
      </View>
    )
  }
}

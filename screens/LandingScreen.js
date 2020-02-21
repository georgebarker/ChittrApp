import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
export default class LandingScreen extends Component {
  render () {
    return (
      <View>
        <Text>Landing Screen</Text>
        <Button
          title='Login'
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

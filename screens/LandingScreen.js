import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'
export default class LandingScreen extends Component {
  constructor () {
    super()
    this.state = {
      isTokenLoading: true
    }
  }

  static navigationOptions () {
    return {
      headerShown: false
    }
  }

  async getToken () {
    try {
      const token = await AsyncStorage.getItem('TOKEN_KEY')
      this.setState({
        isTokenLoading: false
      })
      if (token !== null) {
        this.props.navigation.navigate('Chits')
      }
    } catch (error) {
      console.log('Couldn\'t get token')
    }
  }

  componentDidMount () {
    this.getToken()
  }

  render () {
    if (this.state.isTokenLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Text
          style={{
            fontSize: 40,
            margin: 30
          }}
        >Chittr
        </Text>

        <View
          style={styles.buttonContainer}
        >
          <Button
            title='Sign up'
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>

        <View
          style={styles.buttonContainer}
        >
          <Button
            title='Log in'
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
    width: 100
  }
})

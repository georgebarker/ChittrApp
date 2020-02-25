/* global fetch */
import React, { Component } from 'react'
import { Text, View, TextInput, Button, Alert } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import AsyncStorage from '@react-native-community/async-storage'
export default class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: null,
      password: null
    }
  }

  async saveToken (token) {
    try {
      await AsyncStorage.setItem('TOKEN_KEY', JSON.stringify(token))
      return true
    } catch (e) {
      console.log('Failed to set the token')
      return false
    }
  }

  onLoginPressed () {
    if (this.isRequestValid()) {
      fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then((response) => {
          if (!response.ok) {
            throw Error()
          }
          return response.json()
        })
        .then((responseJson) => {
          this.handleSuccess(responseJson)
        })
        .catch((error) => {
          console.log(error)
          this.handleFailure()
        })
    } else {
      this.handleFailure()
    }
  }

  handleSuccess (responseJson) {
    if (this.saveToken(responseJson)) {
      this.props.navigation.navigate('Chits')
    } else {
      this.handleTokenFailure()
    }
  }

  handleTokenFailure () {
    Alert.alert('Oops!', 'Something went wrong whilst logging you in. Please try again.')
  }

  handleFailure () {
    Alert.alert('Oops!', 'Your login details are incorrect. Please try again.')
  }

  isRequestValid () {
    return this.state.email && this.state.password
  }

  render () {
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
            fontSize: 40
          }}
        >Chittr
        </Text>
        <View style={GlobalStyles.formContainer}>
          <Text>Email address</Text>
          <TextInput
            textContentType='emailAddress' maxLength={320} style={GlobalStyles.textInput}
            onChangeText={(text) => this.setState({ email: text, isEmailValid: true })}
          />
          <Text>Password</Text>
          <TextInput
            secureTextEntry textContentType='newPassword' maxLength={512} style={GlobalStyles.textInput}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View
          style={GlobalStyles.buttonContainer}
        >
          <Button
            title='Login'
            onPress={() => this.onLoginPressed()}
          />
        </View>
      </View>
    )
  }
}

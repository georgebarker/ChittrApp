/* global fetch */
import React, { Component } from 'react'
import { Text, View, TextInput, Button, Alert, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { loginUrl } from '../UrlHelper'
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
      fetch(loginUrl(), {
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
        <View style={styles.formContainer}>
          <Text>Email address</Text>
          <TextInput
            textContentType='emailAddress' maxLength={320} style={styles.textInput}
            onChangeText={(text) => this.setState({ email: text, isEmailValid: true })}
          />
          <Text>Password</Text>
          <TextInput
            secureTextEntry textContentType='newPassword' maxLength={512} style={styles.textInput}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View
          style={styles.buttonContainer}
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

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20
  },
  formContainer: {
    padding: 10,
    margin: 20,
    alignSelf: 'stretch'
  },
  buttonContainer: {
    width: 100,
    backgroundColor: 'green'
  }
})

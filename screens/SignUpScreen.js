/* global fetch */
import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, TextInput, Alert } from 'react-native'
import GlobalStyles from '../GlobalStyles'
export default class SignUpScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      givenName: null,
      familyName: null,
      email: null,
      password: null,
      isEmailValid: true
    }
  }

  onSignUpPressed () {
    if (this.isRequestValid()) {
      fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          given_name: this.state.givenName,
          family_name: this.state.familyName,
          email: this.state.email,
          password: this.state.password
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw Error()
          }
          this.handleSuccess()
        })
        .catch((error) => {
          console.log(error)
          this.handleFailure()
        })
    }
  }

  handleSuccess () {
    Alert.alert('Success!',
      'Your account was created successfully.',
      [{ text: 'Log in', onPress: () => this.props.navigation.navigate('Login') }])
  }

  handleFailure () {
    Alert.alert('Oops!',
      'Something went wrong. Please try again.')
  }

  /** Checks if sign up request is valid.
   * Will display error message UI indicators if requests are invalid. */
  isRequestValid () {
    var isRequestValid = true

    Object.entries(this.state).forEach(([key, value]) => {
      // Check for null or empty fields
      if (value === null || value === '') {
        isRequestValid = false
        this.setState({ [key]: '' })
      }
      // Check for invalid email address
      if (key === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        isRequestValid = false
        this.setState({ isEmailValid: false })
      }
    })

    return isRequestValid
  }

  displayError (prop) {
    return prop !== '' ? { display: 'none' } : { display: 'flex' }
  }

  displayEmailError () {
    return this.state.isEmailValid ? { display: 'none' } : { display: 'flex' }
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
          <Text>Given name</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.givenName)]}>Field is required</Text>
          <TextInput
            textContentType='givenName' maxLength={50} style={GlobalStyles.textInput}
            onChangeText={(text) => this.setState({ givenName: text })}
          />
          <Text>Family name</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.familyName)]}>Field is required</Text>
          <TextInput
            textContentType='familyName' maxLength={50} style={GlobalStyles.textInput}
            onChangeText={(text) => this.setState({ familyName: text })}
          />
          <Text>Email address</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.email)]}>Field is required</Text>
          <Text style={[styles.errorMessage, this.displayEmailError()]}>Enter a valid email address (e.g. george@google.com)</Text>
          <TextInput
            textContentType='emailAddress' maxLength={320} style={GlobalStyles.textInput}
            onChangeText={(text) => this.setState({ email: text, isEmailValid: true })}
          />
          <Text>Password</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.password)]}>Field is required</Text>
          <TextInput
            secureTextEntry textContentType='newPassword' maxLength={512} style={GlobalStyles.textInput}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View
          style={GlobalStyles.buttonContainer}
        >
          <Button
            title='Sign up'
            onPress={() => this.onSignUpPressed()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red'
  }
})

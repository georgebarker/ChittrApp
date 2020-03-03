/* global fetch */
import React, { Component } from 'react'
import { Alert } from 'react-native'
import UserDetailsForm from '../components/UserDetailsForm'

export default class SignUpScreen extends Component {
  onSignUpPressed (userDetailsForm) {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetailsForm)
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

  handleSuccess () {
    Alert.alert('Success!',
      'Your account was created successfully.',
      [{ text: 'Log in', onPress: () => this.props.navigation.navigate('Login') }])
  }

  handleFailure () {
    Alert.alert('Oops!',
      'Something went wrong. Please try again.')
  }

  render () {
    return (
      <UserDetailsForm submitButtonText='Sign up' onSubmitPressed={this.onSignUpPressed.bind(this)} />
    )
  }
}

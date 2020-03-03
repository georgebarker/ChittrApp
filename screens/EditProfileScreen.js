/* global fetch */
import React, { Component } from 'react'
import { Alert } from 'react-native'
import UserDetailsForm from '../components/UserDetailsForm'
export default class EditProfileScreen extends Component {
  onSaveProfilePressed (userDetailsForm) {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.props.navigation.state.params.user.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.props.navigation.state.params.user.token.token
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
      'Your profile was updated successfully.',
      [{
        text: 'Okay',
        onPress: () => {
          this.props.navigation.state.params.onProfileUpdated()
          this.props.navigation.goBack()
        }
      }])
  }

  handleFailure () {
    Alert.alert('Oops!',
      'Something went wrong. Please try again.')
  }

  render () {
    return (
      <UserDetailsForm
        existingUser={this.props.navigation.state.params.user}
        submitButtonText='Save profile'
        onSubmitPressed={this.onSaveProfilePressed.bind(this)}
      />
    )
  }
}

import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
export default class UserDetailsForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      givenName: this.props.existingUser ? this.props.existingUser.givenName : null,
      familyName: this.props.existingUser ? this.props.existingUser.familyName : null,
      email: this.props.existingUser ? this.props.existingUser.email : null,
      password: null,
      isEmailValid: true
    }
  }

  onSubmitPressed () {
    if (this.isRequestValid()) {
      var userDetailsForm = {}
      // If this is just an update, only send back what's necessary
      if (this.props.existingUser) {
        if (this.props.existingUser.givenName !== this.state.givenName) {
          userDetailsForm.given_name = this.state.givenName
        }

        if (this.props.existingUser.familyName !== this.state.familyName) {
          userDetailsForm.family_name = this.state.familyName
        }

        if (this.props.existingUser.email !== this.state.email) {
          userDetailsForm.email = this.state.email
        }

        if (this.state.password !== null) {
          userDetailsForm.password = this.state.password
        }
      } else {
        userDetailsForm = {
          given_name: this.state.givenName,
          family_name: this.state.familyName,
          email: this.state.email,
          password: this.state.password
        }
      }
      this.props.onSubmitPressed(userDetailsForm)
    }
  }

  /** Checks if sign up request is valid.
   * Will display error message UI indicators if requests are invalid. */
  isRequestValid () {
    var isRequestValid = true

    Object.entries(this.state).forEach(([key, value]) => {
      // Check for null or empty fields
      if ((value === null || value === '') && key !== 'password') {
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
        <Text style={{ fontSize: 40 }}>Chittr</Text>
        <View style={styles.formContainer}>
          <Text>Given name</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.givenName)]}>Field is required</Text>
          <TextInput
            value={this.state.givenName}
            textContentType='givenName' maxLength={50} style={styles.textInput}
            onChangeText={(text) => this.setState({ givenName: text })}
          />
          <Text>Family name</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.familyName)]}>Field is required</Text>
          <TextInput
            value={this.state.familyName}
            textContentType='familyName' maxLength={50} style={styles.textInput}
            onChangeText={(text) => this.setState({ familyName: text })}
          />
          <Text>Email address</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.email)]}>Field is required</Text>
          <Text style={[styles.errorMessage, this.displayEmailError()]}>Enter a valid email address (e.g. george@google.com)</Text>
          <TextInput
            value={this.state.email}
            textContentType='emailAddress' maxLength={320} style={styles.textInput}
            onChangeText={(text) => this.setState({ email: text, isEmailValid: true })}
          />
          <Text>Password</Text>
          <Text style={[styles.errorMessage, this.displayError(this.state.password)]}>Field is required</Text>
          <TextInput
            secureTextEntry textContentType='newPassword' maxLength={512} style={styles.textInput}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View
          style={styles.buttonContainer}
        >
          <Button
            title={this.props.submitButtonText}
            onPress={() => this.onSubmitPressed()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red'
  },
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
    width: 100
  }
})

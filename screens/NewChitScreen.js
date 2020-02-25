/* global fetch */
import React, { Component } from 'react'
import { View, TextInput, Button, Alert, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
export default class NewChitScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chitContent: '',
      token: null
    }
  }

  async getToken () {
    try {
      const token = await AsyncStorage.getItem('TOKEN_KEY')
      this.setState({
        token: JSON.parse(token)
      })
    } catch (error) {
      console.log('Couldn\'t get token')
    }
  }

  componentDidMount () {
    this.getToken()
  }

  handleOnSendChitPress () {
    if (this.state.chitContent.length > 141) {
      Alert.alert('Oops!', 'Chits cannot be longer than 141 characters.')
      return
    }
    if (this.state.chitContent.length <= 0) {
      Alert.alert('Oops!', 'Your chit doesn\'t say anything!')
      return
    }
    fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token.token
      },
      body: JSON.stringify({
        timestamp: Date.now(),
        chit_content: this.state.chitContent,
        user: {
          user_id: this.state.token.id
        }
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

  handleSuccess () {
    Alert.alert('Success!', 'Chit posted.')
    this.props.navigation.state.params.refreshChits()
    this.props.navigation.goBack()
  }

  handleFailure () {
    Alert.alert('Oops!', 'Failed.')
  }

  render () {
    return (
      <View style={{
        flex: 1,
        padding: 10,
        margin: 10
      }}
      >
        <TextInput
          placeholder={'What\'s on your mind?'}
          autoFocus
          multiline
          textAlignVertical='top'
          onChangeText={(text) => this.setState({ chitContent: text })}
          style={{
            flex: 1,
            fontSize: 20
          }}
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'flex-end'

          }}
        >
          <Text style={{
            fontSize: 16,
            flex: 1,
            textAlignVertical: 'center',
            color: this.state.chitContent.length <= 141 ? 'black' : 'red'
          }}
          >{141 - this.state.chitContent.length + ' characters remaining'}
          </Text>
          <Button style={{ flex: 1 }} title='Send' onPress={() => this.handleOnSendChitPress()} />
        </View>

      </View>
    )
  }
}

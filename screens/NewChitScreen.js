/* global fetch */
import React, { Component } from 'react'
import { View, TextInput, Button, Alert, Text, PermissionsAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { postPhotoAttachmentUrl, postChitsUrl } from '../UrlHelper'
export default class NewChitScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chitContent: '',
      location: null,
      photo: null,
      token: null,
      draftTimestamp: null
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

  handleTakePhotoPressed () {
    this.props.navigation.navigate('ChitCamera', { onPhotoTaken: this.onPhotoTaken.bind(this) })
  }

  navigateToDrafts () {
    this.props.navigation.navigate('Drafts', {
      onDraftSelected: this.onDraftSelected.bind(this),
      onDraftDeletePressed: this.removeFromDrafts.bind(this)
    })
  }

  onDraftSelected (draft) {
    this.setState({
      chitContent: draft.chit_content,
      location: draft.location,
      photo: draft.photo,
      draftTimestamp: draft.timestamp
    })
  }

  onPhotoTaken (photo) {
    this.setState({ photo: photo })
  }

  async saveToDrafts () {
    try {
      const drafts = await AsyncStorage.getItem('DRAFTS_KEY')
      const draftsToSave = drafts ? JSON.parse(drafts) : []
      const chit = this.constructChitBody()
      if (this.state.photo) {
        chit.photo = this.state.photo
      }

      draftsToSave.push(chit)
      await AsyncStorage.setItem('DRAFTS_KEY', JSON.stringify(draftsToSave))
      Alert.alert('Success!', 'Chit saved to drafts successfully.')
      this.props.navigation.goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Oops!', 'Couldn\'t save Chit to drafts. Please try again.')
    }
  }

  async removeFromDrafts (draftTimestamp) {
    if (draftTimestamp) {
      const drafts = await AsyncStorage.getItem('DRAFTS_KEY')
      const draftsWithItemRemoved = JSON.parse(drafts).filter(_draft => _draft.timestamp !== draftTimestamp)
      await AsyncStorage.setItem('DRAFTS_KEY', JSON.stringify(draftsWithItemRemoved))
    }
  }

  constructChitBody () {
    const chitBody = {
      timestamp: Date.now(),
      chit_content: this.state.chitContent,
      user: {
        user_id: this.state.token.id
      }
    }

    if (this.state.location) {
      chitBody.location = this.state.location
    }

    return chitBody
  }

  postPhotoAttachment (chitId) {
    fetch(postPhotoAttachmentUrl(chitId), {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': this.state.token.token
      },
      body: this.state.photo
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

  handleMissingLocationPermissions () {
    Alert.alert('Oops!', 'Sorry, Chittr cannot add your location without permission.')
  }

  async requestLocationPermission () {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Chittr',
      message: 'Chittr needs to know your location in order to add it to a Chit.',
      buttonPositive: 'Okay'
    })

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      this.getCurrentLocation()
    } else {
      this.handleMissingLocationPermissions()
    }
  }

  getCurrentLocation () {
    this.requestLocationPermission()
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      },
      (error) => {
        console.log(error)
        this.handleMissingLocationPermissions()
      }, {
        enableHighAccuracy: true,
        timeout: 5 * 1000, // (ms) 5 seconds
        maximumAge: 5 * 60 * 1000 // (ms) 5 minutes
      })
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

    const chitBody = this.constructChitBody()
    fetch(postChitsUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token.token
      },
      body: JSON.stringify(chitBody)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error()
        }
        return response.json()
      })
      .then((responseJson) => {
        if (this.state.photo) {
          this.postPhotoAttachment(responseJson.chit_id)
        } else {
          this.handleSuccess()
        }
      })
      .catch((error) => {
        console.log(error)
        this.handleFailure()
      })
  }

  handleSuccess () {
    Alert.alert('Success!', 'Chit posted.')
    this.removeFromDrafts(this.state.draftTimestamp)
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
          value={this.state.chitContent}
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 16,
              textAlignVertical: 'center',
              color: this.state.chitContent.length <= 141 ? 'black' : 'red'
            }}
            >{141 - this.state.chitContent.length + ' characters remaining'}
            </Text>
            <Text style={{ display: this.state.location ? 'flex' : 'none' }}>Location added</Text>
            <Text style={{ display: this.state.photo ? 'flex' : 'none' }}>Photo attached</Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1, marginRight: 16, justifyContent: 'center' }}
            onPress={() => this.navigateToDrafts()}
          >
            <Icon name='archive' size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginRight: 16, justifyContent: 'center' }}
            onPress={() => this.saveToDrafts()}
          >
            <Icon name='save' size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginRight: 16, justifyContent: 'center' }}
            onPress={() => this.handleTakePhotoPressed()}
          >
            <Icon name='camera' size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, marginRight: 16, justifyContent: 'center' }}
            onPress={() => this.getCurrentLocation()}
          >
            <Icon name='map-marker' size={20} />
          </TouchableOpacity>
          <Button style={{ flex: 1 }} title='Send' onPress={() => this.handleOnSendChitPress()} />
        </View>

      </View>
    )
  }
}

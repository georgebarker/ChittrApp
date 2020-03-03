/* global fetch, FileReader */
import React, { Component } from 'react'
import { Image, Alert } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default class UserPhoto extends Component {
  constructor () {
    super()
    this.state = {
      image: null
    }
  }

  onPhotoTaken (photo) {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': this.props.token.token
      },
      body: photo
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
    this.setState({ image: null })
    this.fetchUserPhoto()
  }

  handleFailure () {
    Alert.alert('Oops!', 'Something went wrong when updating your photo. Please try again.')
  }

  onEditPhotoPressed () {
    this.props.navigation.navigate('ChitCamera', { onPhotoTaken: this.onPhotoTaken.bind(this) })
  }

  fetchUserPhoto () {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.props.userId + '/photo', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.blob())
      .then((responseBlob) => {
        var reader = new FileReader()
        reader.readAsDataURL(responseBlob)
        reader.onloadend = () => {
          this.setState({ image: reader.result })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount () {
    this.fetchUserPhoto()
  }

  render () {
    if (!this.state.image) {
      return (
        <ActivityIndicator />
      )
    }

    if (this.props.editable) {
      return (
        <TouchableOpacity
          onPress={() => this.onEditPhotoPressed()}
        >
          <Icon style={{ position: 'absolute', zIndex: 1, right: 4, bottom: 4 }} name='edit' size={32} />
          <Image
            style={{ width: this.props.width, height: this.props.height }}
            source={{ uri: this.state.image }}
          />
        </TouchableOpacity>
      )
    }

    return (
      <Image
        style={{ width: this.props.width, height: this.props.height }}
        source={{ uri: this.state.image }}
      />
    )
  }
}

/* global fetch, FileReader */
import React, { Component } from 'react'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
export default class UserPhoto extends Component {
  constructor () {
    super()
    this.state = {
      image: null
    }
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
    return (
      <Image
        style={{ width: this.props.width, height: this.props.height }}
        source={{ uri: this.state.image }}
      />
    )
  }
}

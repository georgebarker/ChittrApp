/* global fetch, FileReader */
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { getChitPhotoUrl } from '../UrlHelper'
export default class ChitPhotoView extends Component {
  constructor () {
    super()
    this.state = {
      photo: null
    }
  }

  componentDidMount () {
    this.fetchChitPhoto()
  }

  fetchChitPhoto () {
    return fetch(getChitPhotoUrl(this.props.chit.chit_id))
      .then((response) => {
        if (response.status !== 404) {
          return response.blob()
        } else {
          throw Error('No image found for ChitID: ' + this.props.chit.chit_id)
        }
      })
      .then((responseBlob) => {
        var reader = new FileReader()
        reader.readAsDataURL(responseBlob)
        reader.onloadend = () => {
          this.setState({ photo: reader.result })
          this.props.notifyPhotoIsAvailable()
        }
      }).catch(() => {
        // Error thrown because no image found; no need to worry.
      })
  }

  render () {
    if (this.state.photo && this.props.isVisible) {
      return (
        <View>
          <Image
            style={{ width: 500, height: 250 }}
            source={{ uri: this.state.photo }}
          />
        </View>
      )
    }
    return null
  }
}

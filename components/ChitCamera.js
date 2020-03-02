import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class ChitCamera extends Component {
  static navigationOptions () {
    return {
      headerShown: false
    }
  }

  async takePhoto () {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      this.props.navigation.state.params.onPhotoTaken(data)
      this.props.navigation.goBack()
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          captureAudio={false}
          ref={ref => { this.camera = ref }}
          style={{ flex: 1 }}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 20
          }}
          onPress={() => this.takePhoto()}
        >
          <Icon name='camera' size={28} />
          <Text style={{ fontSize: 20 }}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Button } from 'react-native'
export default class Follower extends Component {
  navigateToProfile (userId) {
    this.props.navigation.navigate('Profile', { userId: userId })
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0
          }}
          onPress={() => this.navigateToProfile(this.props.user.user_id)}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
          />
        </TouchableOpacity>

        <Text
          onPress={() => this.navigateToProfile(this.props.user.user_id)}
          style={{ flex: 1, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}
        >{this.props.user.given_name + ' ' + this.props.user.family_name}
        </Text>
        <Button style={{ flex: 1 }} title='Follow' />

      </View>
    )
  }
}

import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
export default class Chit extends Component {
  navigateToProfile (userId) {
    this.props.navigation.navigate('Profile', { userId: userId })
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 15
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => this.navigateToProfile(this.props.chit.user.user_id)}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 5, padding: 5 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text
              onPress={() => this.navigateToProfile(this.props.chit.user.user_id)}
              style={{ fontWeight: 'bold' }}
            >{this.props.chit.user.given_name + ' ' + this.props.chit.user.family_name}
            </Text>
            <TimeAgo
              style={{ fontStyle: 'italic' }} time={this.props.chit.timestamp}
            />
          </View>
          <Text style={{ marginTop: 5 }}>{this.props.chit.chit_content}</Text>
        </View>
      </View>
    )
  }
}

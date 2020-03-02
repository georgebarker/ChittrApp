import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import UserPhoto from './UserPhoto'
export default class User extends Component {
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
          <UserPhoto width={50} height={50} userId={this.props.user.user_id} />
        </TouchableOpacity>

        <Text
          onPress={() => this.navigateToProfile(this.props.user.user_id)}
          style={{ flex: 1, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}
        >{this.props.user.given_name + ' ' + this.props.user.family_name}
        </Text>
      </View>
    )
  }
}

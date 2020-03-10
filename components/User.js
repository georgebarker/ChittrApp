import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import UserPhoto from './UserPhoto'
export default class User extends Component {
  navigateToProfile (userId) {
    this.props.navigation.navigate('Profile', { userId: userId })
  }

  render () {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          marginLeft: 20,
          marginRight: 20
        }}
        onPress={() => this.navigateToProfile(this.props.user.user_id)}
      >
        <View style={{ flex: 0 }}>
          <UserPhoto width={50} height={50} userId={this.props.user.user_id} />
        </View>
        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
          {this.props.user.given_name + ' ' + this.props.user.family_name}
        </Text>
      </TouchableOpacity>
    )
  }
}

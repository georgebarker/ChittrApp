import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChitMapView from './ChitMapView'

export default class Chit extends Component {
  constructor () {
    super()
    this.state = {
      isMapVisible: false
    }
  }

  navigateToProfile (userId) {
    this.props.navigation.navigate('Profile', { userId: userId })
  }

  render () {
    return (
      <View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 10
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

        <TouchableOpacity
          style={{ flexDirection: 'row', marginStart: 20, marginBottom: 5, alignItems: 'center', display: this.props.chit.location ? 'flex' : 'none' }}
          onPress={() => this.setState({ isMapVisible: !this.state.isMapVisible })}
        >
          <Icon style={{ marginRight: 6 }} name='map-marker' size={16} />
          <Text style={{ fontWeight: 'bold' }}>View Chit location</Text>
        </TouchableOpacity>
        <ChitMapView location={this.props.chit.location} isVisible={this.state.isMapVisible} />

      </View>
    )
  }
}

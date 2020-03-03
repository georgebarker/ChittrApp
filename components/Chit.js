import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChitMapView from './ChitMapView'
import UserPhoto from './UserPhoto'
import ChitPhotoView from './ChitPhotoView'

export default class Chit extends Component {
  constructor () {
    super()
    this.state = {
      isMapVisible: false,
      isPhotoVisible: false,
      isPhotoAvailable: false
    }
  }

  navigateToProfile (userId) {
    this.props.navigation.navigate('Profile', { userId: userId })
  }

  notifyPhotoIsAvailable () {
    this.setState({ isPhotoAvailable: true })
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
            <UserPhoto width={50} height={50} userId={this.props.chit.user.user_id} />
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 20, marginEnd: 20 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center', display: this.props.chit.location ? 'flex' : 'none' }}
            onPress={() => this.setState({ isMapVisible: !this.state.isMapVisible })}
          >
            <Icon style={{ marginRight: 6 }} name='map-marker' size={16} />
            <Text style={{ fontWeight: 'bold' }}>View Chit location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center', display: this.state.isPhotoAvailable ? 'flex' : 'none' }}
            onPress={() => this.setState({ isPhotoVisible: !this.state.isPhotoVisible })}
          >
            <Icon style={{ marginRight: 6 }} name='camera' size={16} />
            <Text style={{ fontWeight: 'bold' }}>View Chit photo</Text>
          </TouchableOpacity>
        </View>

        <ChitMapView location={this.props.chit.location} isVisible={this.state.isMapVisible} />
        <ChitPhotoView chit={this.props.chit} isVisible={this.state.isPhotoVisible} notifyPhotoIsAvailable={this.notifyPhotoIsAvailable.bind(this)} />
      </View>
    )
  }
}

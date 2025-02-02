/* global fetch */
import React, { Component } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import LoadingView from '../components/LoadingView'
import ChitList from '../components/ChitList'
import VerticalDivider from '../components/VerticalDivider'
import UserPhoto from '../components/UserPhoto'
import { followUserUrl, getFollowingUrl, getFollowersUrl, getUserProfileUrl } from '../UrlHelper'
export default class ProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: this.props.navigation.state.params.userId,
      givenName: null,
      familyName: null,
      email: null,
      following: [],
      followers: [],
      chits: null,
      token: null,
      doesCurrentUserFollowThem: null,
      isProfileLoading: true,
      isFollowersLoading: true,
      isFollowingLoading: true,
      profileUpdateTriggered: false
    }
  }

  async getToken () {
    try {
      const token = await AsyncStorage.getItem('TOKEN_KEY')
      this.setState({
        token: JSON.parse(token)
      })
    } catch (error) {
      console.log('Couldn\'t get token')
    }
  }

  isViewingOwnProfile () {
    return this.state.token.id === this.state.userId
  }

  doesCurrentUserFollowThem () {
    var doesUserFollow = this.state.followers.filter(user => user.user_id === this.state.token.id).length > 0
    this.setState({ doesCurrentUserFollowThem: doesUserFollow })
  }

  navigateToFollowing () {
    this.props.navigation.navigate('Following', { users: this.state.following })
  }

  navigateToFollowers () {
    this.props.navigation.navigate('Followers', { users: this.state.followers })
  }

  navigateToEditProfile () {
    this.props.navigation.navigate('EditProfile',
      {
        user: {
          id: this.state.userId,
          givenName: this.state.givenName,
          familyName: this.state.familyName,
          email: this.state.email,
          token: this.state.token
        },
        onProfileUpdated: this.updateProfile.bind(this)
      })
  }

  isViewLoading () {
    return this.state.isProfileLoading || this.state.isFollowersLoading || this.state.isFollowingLoading
  }

  componentDidMount () {
    this.getToken()
    this.getProfile()
    this.getFollowers()
    this.getFollowing()
  }

  // This method is used to update the component when a different user's profile has been clicked on
  componentDidUpdate (prevProps) {
    if (prevProps.navigation.state.params.userId !== this.props.navigation.state.params.userId && !this.state.profileUpdateTriggered) {
      this.updateProfile()
    }
  }

  updateProfile () {
    this.setState({
      profileUpdateTriggered: true
    })
    this.getProfile()
    this.getFollowers()
    this.getFollowing()
    if (!this.isViewLoading()) {
      this.setState({
        profileUpdateTriggered: false
      })
    }
  }

  onFollowButtonPressed () {
    if (this.isViewingOwnProfile()) {
      Alert.alert('Oops!', 'You can\'t follow yourself!')
      return
    }

    var method
    var message
    if (this.state.doesCurrentUserFollowThem) {
      method = 'DELETE'
      message = 'You have unfollowed ' + this.state.givenName + ' ' + this.state.familyName
    } else {
      method = 'POST'
      message = 'You are now following ' + this.state.givenName + ' ' + this.state.familyName
    }
    fetch(followUserUrl(this.state.userId), {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.token.token
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error()
        }
        Alert.alert('Success!', message)
        this.getFollowers()
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Oops!', 'Something went wrong. Please try again.')
      })
  }

  getFollowing () {
    this.setState({ isFollowingLoading: true })
    fetch(getFollowingUrl(this.props.navigation.state.params.userId))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          following: responseJson,
          isFollowingLoading: false
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  getFollowers () {
    this.setState({ isFollowersLoading: true })
    fetch(getFollowersUrl(this.props.navigation.state.params.userId))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          followers: responseJson,
          isFollowersLoading: false
        })
        this.doesCurrentUserFollowThem()
      }).catch((error) => {
        console.log(error)
      })
  }

  getProfile () {
    this.setState({ isProfileLoading: true })
    fetch(getUserProfileUrl(this.props.navigation.state.params.userId))
      .then((response) => response.json())
      .then((responseJson) => {
      // populates Chits with user metadata
        responseJson.recent_chits.map((chit) => {
          chit.user = {
            user_id: this.props.navigation.state.params.userId,
            given_name: responseJson.given_name,
            family_name: responseJson.family_name
          }
        })

        this.setState({
          userId: responseJson.user_id,
          givenName: responseJson.given_name,
          familyName: responseJson.family_name,
          email: responseJson.email,
          chits: responseJson.recent_chits,
          isProfileLoading: false
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    if (this.isViewLoading()) {
      return (
        <LoadingView text='Loading profile...' />
      )
    }
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column'
      }}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <UserPhoto
              width={100}
              height={100}
              userId={this.state.userId}
              editable={this.isViewingOwnProfile()}
              token={this.state.token}
              navigation={this.props.navigation}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Text>{this.state.givenName + ' ' + this.state.familyName}</Text>
            <Text>{this.state.email}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text onPress={() => this.navigateToFollowing()}>{this.state.following.length + ' Following'}</Text>
              <VerticalDivider />
              <Text onPress={() => this.navigateToFollowers()}>{this.state.followers.length + ' Followers'}</Text>
            </View>
            <View
              style={{ margin: 10, display: this.isViewingOwnProfile() ? 'none' : 'flex' }}
            >
              <Button
                title={this.state.doesCurrentUserFollowThem ? 'Unfollow' : 'Follow'}
                onPress={() => this.onFollowButtonPressed()}
              />
            </View>
            <View
              style={{ margin: 10, display: this.isViewingOwnProfile() ? 'flex' : 'none' }}
            >
              <Button
                title='Edit profile'
                onPress={() => this.navigateToEditProfile()}
              />
            </View>
          </View>

        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>{this.state.givenName + ' ' + this.state.familyName + '\'s recent chits'}</Text>
          <View>
            <ChitList
              chits={this.state.chits}
              navigation={this.props.navigation}
            />
          </View>
        </View>
      </View>
    )
  }
}

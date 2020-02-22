/* global fetch */
import React, { Component } from 'react'
import { View, Text, Image, Button } from 'react-native'
import LoadingView from '../components/LoadingView'
import GlobalStyles from '../GlobalStyles'
import ChitList from '../components/ChitList'
import VerticalDivider from '../components/VerticalDivider'
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
      isProfileLoading: true,
      isFollowersLoading: true,
      profileUpdateTriggered: false
    }
    this.getProfile()
    this.getFollowers()
  }

  navigateToFollowers () {
    this.props.navigation.navigate('Followers', { followers: this.state.followers })
  }

  // This method is used to re-render the component when a different user's profile has been clicked on
  componentDidUpdate () {
    if (this.state.userId !== this.props.navigation.state.params.userId && !this.state.profileUpdateTriggered) {
      this.setState({
        isProfileLoading: true,
        isFollowersLoading: true,
        profileUpdateTriggered: true
      })
      this.getProfile()
      this.getFollowers()
    }
  }

  getFollowers () {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.props.navigation.state.params.userId + '/followers').then((response) => response.json()).then((responseJson) => {
      this.setState({
        followers: responseJson,
        isFollowersLoading: false
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  getProfile () {
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.props.navigation.state.params.userId).then((response) => response.json()).then((responseJson) => {
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
    if (this.state.isProfileLoading || this.state.isFollowersLoading) {
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
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Text>{this.state.givenName + ' ' + this.state.familyName}</Text>
            <Text>{this.state.email}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text>{this.state.following.length + ' Following'}</Text>
              <VerticalDivider />
              <Text onPress={() => this.navigateToFollowers()}>{this.state.followers.length + ' Followers'}</Text>
            </View>
            <View
              style={[GlobalStyles.buttonContainer, { margin: 10 }]}
            >
              <Button
                title='Follow'
              />
            </View>
          </View>

        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>{this.state.givenName + ' ' + this.state.familyName + '\'s recent chits'}</Text>
          <View>
            <ChitList chits={this.state.chits} navigation={this.props.navigation} />
          </View>
        </View>
      </View>
    )
  }
}

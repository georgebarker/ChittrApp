/* global fetch */
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import UserList from '../components/UserList'
import { Searchbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class UserSearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchUsers: null
    }
  }

  static navigationOptions () {
    return {
      title: 'User search'
    }
  }

  searchUsers (query) {
    if (query.length === 0) {
      this.setState({ searchUsers: null })
      return
    }
    return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + query).then((response) => response.json()).then((responseJson) => {
      this.setState({
        searchUsers: responseJson
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Searchbar
          placeholder='Search'
          style={{ margin: 10 }}
          onChangeText={(query) => { this.searchUsers(query) }}
        />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: !this.state.searchUsers ? 'flex' : 'none' }}>
          <Icon name='search' size={48} />
          <Text style={{ padding: 20, fontSize: 20 }}>Start typing to find fellow Chitters...</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: this.state.searchUsers && !this.state.searchUsers.length ? 'flex' : 'none' }}>
          <Icon name='user' size={48} />
          <Text style={{ padding: 20, fontSize: 20 }}>No Chitters found!</Text>
        </View>

        <UserList users={this.state.searchUsers} navigation={this.props.navigation} />
      </View>

    )
  }
}

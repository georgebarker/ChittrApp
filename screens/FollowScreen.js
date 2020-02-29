import React, { Component } from 'react'
import UserList from '../components/UserList'
export default class FollowScreen extends Component {
  render () {
    return (
      <UserList users={this.props.navigation.state.params.users} navigation={this.props.navigation} />
    )
  }
}

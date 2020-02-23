import React, { Component } from 'react'
import FollowList from '../components/FollowList'
export default class FollowScreen extends Component {
  render () {
    return (
      <FollowList followUsers={this.props.navigation.state.params.followUsers} navigation={this.props.navigation} />
    )
  }
}

import React, { Component } from 'react'
import FollowerList from '../components/FollowerList'
export default class FollowersScreen extends Component {
  render () {
    return (
      <FollowerList followers={this.props.navigation.state.params.followers} navigation={this.props.navigation} />
    )
  }
}

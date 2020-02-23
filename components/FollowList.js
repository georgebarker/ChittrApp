import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import HorizontalDivider from './HorizontalDivider'
import FollowUser from './FollowUser'
export default class FollowList extends Component {
  render () {
    return (
      <View>
        <FlatList
          data={this.props.followUsers}
          renderItem={({ item }) => <FollowUser user={item} navigation={this.props.navigation} />}
          keyExtractor={item => item.user_id.toString()}
          ItemSeparatorComponent={HorizontalDivider}
        />
      </View>
    )
  }
}

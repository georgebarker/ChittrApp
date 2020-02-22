import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import HorizontalDivider from './HorizontalDivider'
import Follower from '../components/Follower'
export default class FollowerList extends Component {
  render () {
    return (
      <View>
        <FlatList
          data={this.props.followers}
          renderItem={({ item }) => <Follower user={item} navigation={this.props.navigation} />}
          keyExtractor={item => item.user_id.toString()}
          ItemSeparatorComponent={HorizontalDivider}
        />
      </View>
    )
  }
}

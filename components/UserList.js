import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import HorizontalDivider from './HorizontalDivider'
import User from './User'
export default class UserList extends Component {
  render () {
    return (
      <View>
        <FlatList
          data={this.props.users}
          renderItem={({ item }) => <User user={item} navigation={this.props.navigation} />}
          keyExtractor={item => item.user_id.toString()}
          ItemSeparatorComponent={HorizontalDivider}
        />
      </View>
    )
  }
}

import React, { Component } from 'react'
import { FlatList } from 'react-native'
import HorizontalDivider from './HorizontalDivider'
import Chit from './Chit'
export default class ChitList extends Component {
  render () {
    return (
      <FlatList
        data={this.props.chits}
        renderItem={({ item }) => <Chit chit={item} navigation={this.props.navigation} />}
        keyExtractor={item => item.chit_id.toString()}
        ItemSeparatorComponent={HorizontalDivider}
        onRefresh={this.props.onRefresh}
        refreshing={this.props.isLoading}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.1}
      />
    )
  }
}

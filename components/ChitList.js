import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import HorizontalDivider from './HorizontalDivider'
import Chit from './Chit'
export default class ChitList extends Component {
  render () {
    return (
      <View>
        <FlatList
          data={this.props.chits}
          renderItem={({ item }) => <Chit chit={item} navigation={this.props.navigation} />}
          keyExtractor={item => item.chit_id.toString()}
          ItemSeparatorComponent={HorizontalDivider}
        />
      </View>
    )
  }
}

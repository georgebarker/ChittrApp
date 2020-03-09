import React, { Component } from 'react'
import { FlatList } from 'react-native'
import HorizontalDivider from './HorizontalDivider'
import ChitDraft from './ChitDraft'
export default class ChitDraftList extends Component {
  render () {
    return (
      <FlatList
        data={this.props.drafts}
        renderItem={({ item }) => <ChitDraft draft={item} navigation={this.props.navigation} />}
        keyExtractor={item => item.timestamp.toString()}
        ItemSeparatorComponent={HorizontalDivider}
      />
    )
  }
}

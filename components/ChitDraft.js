import React, { Component } from 'react'
import { Text, View, Alert } from 'react-native'
import TimeAgo from 'react-native-timeago'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
export default class ChitDraft extends Component {
  onChitDraftPressed () {
    this.props.navigation.state.params.onDraftSelected(this.props.draft)
    this.props.navigation.goBack()
  }

  onDeleteDraftPressed () {
    this.props.navigation.state.params.onDraftDeletePressed(this.props.draft.timestamp)
    this.props.navigation.goBack()
    Alert.alert('Success!', 'Draft removed successfully.')
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.onChitDraftPressed()}>
            <Text style={{ fontSize: 18 }}>{this.props.draft.chit_content}</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ display: this.props.draft.location ? 'flex' : 'none' }}>Location added</Text>
              <Text style={{ display: this.props.draft.photo ? 'flex' : 'none' }}>Photo attached</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{ alignItems: 'center' }}>
          <TimeAgo
            style={{ fontStyle: 'italic' }} time={this.props.draft.timestamp}
          />
          <TouchableOpacity style={{ marginTop: 5, alignItems: 'center' }} onPress={() => this.onDeleteDraftPressed()}>
            <Icon name='trash' size={28} />
          </TouchableOpacity>
        </View>

      </View>

    )
  }
}

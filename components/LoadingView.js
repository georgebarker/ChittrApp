import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
export default class LoadingView extends Component {
  render () {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator />
        <Text style={{ padding: 20 }}>{this.props.text}</Text>
      </View>
    )
  }
}

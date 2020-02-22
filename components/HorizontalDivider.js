import React, { Component } from 'react'
import { View } from 'react-native'
export default class HorizontalDivider extends Component {
  render () {
    return (
      <View
        style={{
          borderTopColor: 'black',
          borderTopWidth: 1
        }}
      />
    )
  }
}

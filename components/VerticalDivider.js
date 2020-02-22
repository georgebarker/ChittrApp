import React, { Component } from 'react'
import { View } from 'react-native'
export default class VerticalDivider extends Component {
  render () {
    return (
      <View
        style={{
          borderRightColor: 'black',
          borderRightWidth: 1,
          marginLeft: 10,
          marginRight: 10
        }}
      />
    )
  }
}

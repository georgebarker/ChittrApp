import React, { Component } from 'react'
import { View, Text } from 'react-native'
export default class NoChitsFound extends Component {
  render () {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 20 }}>No chits found! Why not create one?</Text>
      </View>
    )
  }
}

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { FAB as Fab } from 'react-native-paper'
export default class FloatingActionButton extends Component {
  render () {
    return (

      <Fab
        style={styles.fab}
        icon='plus'
        color='white'
        onPress={this.props.onPress}
      />

    )
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00acee',
    zIndex: 1
  }
})

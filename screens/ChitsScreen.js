/* global fetch */
import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import Chit from '../components/Chit'
import FlatListItemSeparator from '../components/FlatListItemSeparator'
import LoadingView from '../components/LoadingView'
import NoChitsFound from '../components/NoChitsFound'
export default class ChitsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: null,
      chits: [],
      isLoading: true
    }
    this.getChits()
  }

  getChits () {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=10').then((response) => response.json()).then((responseJson) => {
      console.log(responseJson)
      this.setState({
        chits: responseJson,
        isLoading: false
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <LoadingView text='Loading chits...' />
      )
    }

    if (!this.state.isLoading && this.state.chits.length === 0) {
      return (
        <NoChitsFound />
      )
    }

    return (
      <View>
        <FlatList
          data={this.state.chits}
          renderItem={({ item }) => <Chit chit={item} />}
          keyExtractor={item => item.chit_id.toString()}
          ItemSeparatorComponent={FlatListItemSeparator}
        />
      </View>
    )
  }
}

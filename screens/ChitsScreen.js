/* global fetch */
import React, { Component } from 'react'
import { View } from 'react-native'
import LoadingView from '../components/LoadingView'
import NoChitsFound from '../components/NoChitsFound'
import ChitList from '../components/ChitList'
import FloatingActionButton from '../components/FloatingActionButton'

export default class ChitsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: null,
      chits: [],
      isLoading: true
    }
  }

  componentDidMount () {
    this.getChits()
  }

  getChits () {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=10').then((response) => response.json()).then((responseJson) => {
      this.setState({
        chits: responseJson,
        isLoading: false
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  refreshChits () {
    this.setState({ isLoading: true })
    this.getChits()
  }

  onNewChitButtonClicked () {
    this.props.navigation.navigate('NewChit', { refreshChits: () => this.refreshChits() })
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
        <FloatingActionButton onPress={() => this.onNewChitButtonClicked()} />
        <ChitList chits={this.state.chits} navigation={this.props.navigation} />
      </View>
    )
  }
}

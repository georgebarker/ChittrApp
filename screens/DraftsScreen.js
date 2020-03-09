import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import LoadingView from '../components/LoadingView'
import ChitDraftList from '../components/ChitDraftList'
import NoChitsFound from '../components/NoChitsFound'

export default class DraftsScreen extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      drafts: []
    }
  }

  componentDidMount () {
    this.getDrafts()
  }

  async getDrafts () {
    const drafts = await AsyncStorage.getItem('DRAFTS_KEY')
    this.setState({ drafts: JSON.parse(drafts), isLoading: false })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <LoadingView text='Loading drafts...' />
      )
    }

    if (!this.state.drafts || !this.state.drafts.length) {
      return (
        <NoChitsFound />
      )
    }

    return (
      <ChitDraftList
        drafts={this.state.drafts}
        navigation={this.props.navigation}
        handleDraftSelected={this.props.navigation.state.params.onDraftSelected}
      />
    )
  }
}

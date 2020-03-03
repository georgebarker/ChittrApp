/* global fetch */
import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import LoadingView from '../components/LoadingView'
import NoChitsFound from '../components/NoChitsFound'
import ChitList from '../components/ChitList'
import FloatingActionButton from '../components/FloatingActionButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
var count = 0
export default class ChitsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chits: [],
      isLoading: true
    }
  }

  static navigationOptions ({ navigation }) {
    return {
      headerLeft: () => null,
      headerRight: () =>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ margin: 8 }}
            onPress={() => navigation.navigate('Profile', { userId: navigation.state.params.token.id })}
          >
            <Icon name='user' size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 8 }} onPress={() => navigation.navigate('UserSearch')}>
            <Icon name='search' size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 8 }} onPress={() => navigation.state.params.handleSignOut(navigation)}>
            <Icon name='sign-out' size={24} />
          </TouchableOpacity>
        </View>
    }
  }

  componentDidMount () {
    this.getToken()
    this.getChits()
    this.props.navigation.setParams({ handleSignOut: this.handleSignOut })
  }

  async getToken () {
    try {
      const token = await AsyncStorage.getItem('TOKEN_KEY')
      this.props.navigation.setParams({ token: JSON.parse(token) })
    } catch (error) {
      console.log('Couldn\'t get token')
    }
  }

  async handleSignOut (navigation) {
    try {
      await AsyncStorage.removeItem('TOKEN_KEY')
      navigation.navigate('Landing')
      Alert.alert('Success!', 'You have been signed out successfully.')
    } catch (e) {
      console.log(e)
    }
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
      <View style={{ flex: 1 }}>
        <FloatingActionButton onPress={() => this.onNewChitButtonClicked()} />
        <ChitList chits={this.state.chits} navigation={this.props.navigation} onRefresh={this.refreshChits.bind(this)} isLoading={this.state.isLoading} />
      </View>
    )
  }
}

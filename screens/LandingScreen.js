import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
export default class LandingScreen extends Component {
  static navigationOptions () {
    return {
      headerShown: false
    }
  }

  render () {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Text
          style={{
            fontSize: 40,
            margin: 30
          }}
        >Chittr
        </Text>

        <View
          style={styles.buttonContainer}
        >
          <Button
            title='Sign up'
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>

        <View
          style={styles.buttonContainer}
        >
          <Button
            title='Log in'
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
    width: 100
  }
})

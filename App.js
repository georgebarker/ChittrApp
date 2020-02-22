import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ChitsScreen from './screens/ChitsScreen'

const AppStackNav = createStackNavigator({
  Landing: {
    screen: LandingScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  Chits: {
    screen: ChitsScreen
  }
})

const AppContainer = createAppContainer(AppStackNav)

export default AppContainer

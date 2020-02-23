import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ChitsScreen from './screens/ChitsScreen'
import ProfileScreen from './screens/ProfileScreen'
import FollowScreen from './screens/FollowScreen'

const AppStackNav = createStackNavigator({
  Chits: {
    screen: ChitsScreen
  },
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
  Profile: {
    screen: ProfileScreen
  },
  Followers: {
    screen: FollowScreen
  },
  Following: {
    screen: FollowScreen
  }
})

const AppContainer = createAppContainer(AppStackNav)

export default AppContainer

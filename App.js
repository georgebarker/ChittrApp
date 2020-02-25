import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ChitsScreen from './screens/ChitsScreen'
import ProfileScreen from './screens/ProfileScreen'
import FollowScreen from './screens/FollowScreen'
import NewChitScreen from './screens/NewChitScreen'
const AppStackNav = createStackNavigator({
  Landing: {
    screen: LandingScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Chits: {
    screen: ChitsScreen,
    navigationOptions: {
      headerLeft: () => null
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
  },
  NewChit: {
    screen: NewChitScreen,
    navigationOptions: {
      title: 'Send a chit'
    }
  }
})

const AppContainer = createAppContainer(AppStackNav)

export default AppContainer

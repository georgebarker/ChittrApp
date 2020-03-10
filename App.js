import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ChitsScreen from './screens/ChitsScreen'
import ProfileScreen from './screens/ProfileScreen'
import FollowScreen from './screens/FollowScreen'
import NewChitScreen from './screens/NewChitScreen'
import UserSearchScreen from './screens/UserSearchScreen'
import ChitCamera from './components/ChitCamera'
import EditProfileScreen from './screens/EditProfileScreen'
import DraftsScreen from './screens/DraftsScreen'

const AppStackNav = createStackNavigator({

  Landing: {
    screen: LandingScreen
  },
  Chits: {
    screen: ChitsScreen
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
  },
  UserSearch: {
    screen: UserSearchScreen
  },
  ChitCamera: {
    screen: ChitCamera
  },
  EditProfile: {
    screen: EditProfileScreen
  },
  Drafts: {
    screen: DraftsScreen
  }
})

const AppContainer = createAppContainer(AppStackNav)
export default AppContainer

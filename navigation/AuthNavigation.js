import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import OTP from '../screens/OTP'
import ForgotPassword from '../screens/ForgotPassword'
const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    OTP: { screen: OTP },
    Signup: { screen: Signup },
    ForgotPassword: { screen: ForgotPassword }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

export default AuthNavigation

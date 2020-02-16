import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './Main/Main'
import User from './User/User'

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User
    },{
       defaultNavigationOptions: {
           headerStyle: {
               backgroundColor: '#7159c1'
           },
           headerTintColor: '#fff',
           headerBackTitleVisible: false,
           headerTitleAlign: 'center'
       },
    })
)

export default Routes
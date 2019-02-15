import React from 'react';
// import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createStackNavigator, createAppContainer } from "react-navigation";

/* Import Screen */
import Home_screen from './app/Views/Home_screen'
import Detail_screen from './app/Views/Detail_screen'
import Cart_screen from './app/Views/Cart_screen'
import Checkout_screen from './app/Views/Checkout_screen'

const RootStack = createStackNavigator(
  {
    Home: Home_screen,
    Details: Detail_screen,
    Cart: Cart_screen,
    Checkout: Checkout_screen
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fb8642',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
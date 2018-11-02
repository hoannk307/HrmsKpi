import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from "./screens/home/";
import Login from "./screens/login/";
import Footer from "./screens/footer/";
import SideBar from "./screens/sidebar";
import KriCtGiao from "./screens/kpi/chitietCtGiao";
import BscCtGiao from "./screens/kpi/chitietBscCtGiao";

const Drawer = DrawerNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home },
    Footer: { screen: Footer },
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
    {
    Home: { screen: Home },
    KriCtGiao: { screen: KriCtGiao },
    BscCtGiao: { screen: BscCtGiao },
    Drawer: { screen: Drawer },
    Footer: { screen: Footer },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;

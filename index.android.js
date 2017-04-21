import React, { Component } from "react"
import {
  AppRegistry,
  Navigator,
} from "react-native"

import * as firebase from "firebase"

import Home from "./includes/views/home"
import Login from "./includes/views/login"
import Firebase from "./includes/firebase/firebase"

class App extends Component {
  constructor(props) {
    super(props);
    Firebase.initialise();

    this.getInitialView();

    this.state = {
      userLoaded: false,
      initialView: null
    };
  }

  getInitialView=() => {
    firebase.auth().onAuthStateChanged((user) => {
      let initialView = user ? "Home" : "Login";
      this.setState({
        userLoaded: true,
        initialView: initialView
      })
    });
  }

  renderScene=(route, navigator) => {
    switch (route.name) {
      case "Home":
        return (<Home navigator={navigator} />);
        break;
      case "Login":
        return (<Login navigator={navigator} />);
        break;
    }
  }

  configureScene=(route) => {
    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {}
      });
    }
  }

  render() {
    if (this.state.userLoaded) {
      return (
        <Navigator
          initialRoute={{name: this.state.initialView}}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />);
    } else {
      return null;
    }
  }
}

AppRegistry.registerComponent("RN_Firebase", () => App);

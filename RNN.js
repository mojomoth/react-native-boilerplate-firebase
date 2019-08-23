import { Navigation } from "react-native-navigation";

import App from "./App";

Navigation.registerComponent("App", () => App);
Navigation.startSingleScreenApp({
  screen: {
    screen: "App",
    navigatorStyle: {
      navBarHidden: true,
      modalPresentationStyle: "overFullScreen"
    },
    navigatorButtons: {}
  },
  appStyle: {
    screenBackgroundColor: "#ffffff",
    orientation: "portrait"
  },
  animationType: "none" // do not animate when start app
});

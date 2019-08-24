import React from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from "react-native";

import firebase from "react-native-firebase";
import MapView from "react-native-maps";
import Snackbar from "react-native-snackbar";
import YouTube from "react-native-youtube";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import OpenAppSettings from "react-native-app-settings";
import GPSState from "react-native-gps-state";
import FastImage from "react-native-fast-image";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import RNKakaoLogins from "react-native-kakao-logins";
import RNKakaoTools from "react-native-kakao-tools";
import OneSignal from "react-native-onesignal";
import KochavaTracker from "react-native-kochava-tracker";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gpsStatus: -1,
      isAuthorising: false,
      facebook: null,
      google: null,
      kakao: null
    };

    // mojomoth
    OneSignal.init("e6c5964e-6c1d-4702-8c02-bdb69ebbfcbd", {
      kOSSettingsKeyAutoPrompt: false
    });
    OneSignal.addEventListener("ids", this.onIds);

    // ConfKochavaTrackerigure.
    let configMapObject = {};
    configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] =
      "koiget-aacrp4h";
    configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] =
      "koiget-ios-35m2o9";
    KochavaTracker.configure(configMapObject);
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());
    // await firebase.analytics().logEvent('foo', { bar: '123'});
    Snackbar.show({
      title: "Hello world",
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        title: "UNDO",
        color: "green",
        onPress: () => {
          /* Do something. */
        }
      }
    });

    GPSState.addListener(status => {
      console.log(status);
      this.setState({ gpsStatus: status });
    });
  }

  calendarEvent = () => {
    AddCalendarEvent.presentEventCreatingDialog({
      title: "title",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      location: "location"
    })
      .then(eventInfo => {
        // console.warn(JSON.stringify(eventInfo));
      })
      .catch(error => {
        // console.warn(error);
      });
  };

  YourImage = () => (
    <FastImage
      style={{ width: 200, height: 200 }}
      source={{
        uri: "https://unsplash.it/400/400?image=1",
        headers: { Authorization: "someAuthToken" },
        priority: FastImage.priority.normal
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );

  fbAuth = async () => {
    try {
      const { isCancelled } = await LoginManager.logInWithPermissions([
        `public_profile`
      ]);

      this.setState({ isAuthorising: false });

      if (isCancelled === false) {
        const { accessToken } = await AccessToken.getCurrentAccessToken();
        console.log(accessToken);

        const response = await fetch(
          `https://graph.facebook.com/me?fields=email,name&access_token=${accessToken}`
        );

        let responseJson = await response.json();

        console.log(responseJson);

        this.setState({ facebook: JSON.stringify(responseJson) });
      } else {
      }
    } catch (e) {
      this.setState({ isAuthorising: false });
      if (AccessToken.getCurrentAccessToken() != null) {
        LoginManager.logOut();
      }
    }
  };

  googleAuth = async () => {
    GoogleSignin.configure({
      iosClientId:
        "547698618171-3a57enc1e4fdiq4t73bb8buhq8923vjb.apps.googleusercontent.com", // only for iOS
      webClientId:
        "547698618171-l97pscv1bg1sb34je2ra9k639dsm8bsh.apps.googleusercontent.com"
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ google: JSON.stringify(userInfo) });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  kakaoAuth = () => {
    RNKakaoLogins.login((err, result) => {
      if (err) {
        openBasicPopup(
          this.props.navigator,
          "아이겟 로그인",
          `카카오 로그인 실패\n${err.code}: ${err.message}`
        );
        return;
      }

      const token = result.token;

      RNKakaoLogins.getProfile(async (err, user) => {
        if (err) {
          console.log(err);
          return;
        }

        this.setState({ kakao: JSON.stringify(user) });
      });
    });
  };

  shareKakao = (url, text, image, buttonText) => {
    RNKakaoTools.link(
      `${text}`,
      `${buttonText}`,
      `${image}`,
      `${url}`,
      `${url}`,
      ``,
      ``,
      result => console.log(result)
    );
  };

  onIds = async device => {
    if (device.userId === null || device.userId === undefined) return;
    this.setState({ onsignalId: device.userId });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ width: "100%", height: 100 }}>
            <MapView
              style={{ width: "100%", height: `100%` }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            />
          </View>
          <Text style={{ fontFamily: "NanumSquareB" }}>{`가나다라마바사`}</Text>
          <Text>{`가나다라마바사`}</Text>
          {this.YourImage()}
          <YouTube
            videoId="TShWV0NK7cI" // The YouTube video ID
            apiKey="AIzaSyA5Zld_A_vOocb_-kw_mj3G48wNyAEQUn4"
            origin="http://www.youtube.com"
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{ alignSelf: "stretch", height: 300 }}
          />
          <Image
            source={require("./assets/ReactNativeFirebase.png")}
            style={[styles.logo]}
          />
          <Text>{`onesignal id : ${this.state.onsignalId}`}</Text>
          <TouchableHighlight
            onPress={() =>
              this.shareKakao("http://www.goog.com", "xxxxx", "", "confirm")
            }
          >
            <Text>{`Kakao Share`}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.kakaoAuth}>
            <Text>{`Kakao : ${this.state.kakao}`}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.googleAuth}>
            <Text>{`Google : ${this.state.google}`}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.fbAuth}>
            <Text>{`Facebook : ${this.state.facebook}`}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.calendarEvent}>
            <Text>calendar event</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => OpenAppSettings.open()}>
            <Text>open app setting</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => await GPSState.openLocationSettings(true)}
          >
            <Text>{`open gps setting (${this.state.gpsStatus})`}</Text>
          </TouchableHighlight>
          <Text style={styles.welcome}>
            Welcome to {"\n"} React Native Firebase
          </Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          {Platform.OS === "ios" ? (
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{"\n"}
              Cmd+D or shake for dev menu
            </Text>
          ) : (
            <Text style={styles.instructions}>
              Double tap R on your keyboard to reload,{"\n"}
              Cmd+M or shake for dev menu
            </Text>
          )}
          <View style={styles.modules}>
            <Text style={styles.modulesHeader}>
              The following Firebase modules are pre-installed:
            </Text>
            {firebase.admob.nativeModuleExists && (
              <Text style={styles.module}>admob()</Text>
            )}
            {firebase.analytics.nativeModuleExists && (
              <Text style={styles.module}>analytics()</Text>
            )}
            {firebase.auth.nativeModuleExists && (
              <Text style={styles.module}>auth()</Text>
            )}
            {firebase.config.nativeModuleExists && (
              <Text style={styles.module}>config()</Text>
            )}
            {firebase.crashlytics.nativeModuleExists && (
              <Text style={styles.module}>crashlytics()</Text>
            )}
            {firebase.database.nativeModuleExists && (
              <Text style={styles.module}>database()</Text>
            )}
            {firebase.firestore.nativeModuleExists && (
              <Text style={styles.module}>firestore()</Text>
            )}
            {firebase.functions.nativeModuleExists && (
              <Text style={styles.module}>functions()</Text>
            )}
            {firebase.iid.nativeModuleExists && (
              <Text style={styles.module}>iid()</Text>
            )}
            {firebase.links.nativeModuleExists && (
              <Text style={styles.module}>links()</Text>
            )}
            {firebase.messaging.nativeModuleExists && (
              <Text style={styles.module}>messaging()</Text>
            )}
            {firebase.notifications.nativeModuleExists && (
              <Text style={styles.module}>notifications()</Text>
            )}
            {firebase.perf.nativeModuleExists && (
              <Text style={styles.module}>perf()</Text>
            )}
            {firebase.storage.nativeModuleExists && (
              <Text style={styles.module}>storage()</Text>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logo: {
    height: 120,
    marginBottom: 16,
    marginTop: 64,
    padding: 10,
    width: 135
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  modules: {
    margin: 20
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center"
  }
});

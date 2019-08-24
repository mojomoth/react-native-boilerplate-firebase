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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gpsStatus: -1
    };
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

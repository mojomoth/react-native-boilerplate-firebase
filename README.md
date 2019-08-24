## Trouble Shooting

### react-native-gps-state

- GPSState.openLocationSettings
- https://github.com/neuberoliveira/react-native-gps-state/pull/29/files

### react-native-map

java.lang.ClassCastException: com.google.maps.api.android.lib6.impl.ap cannot be cast to android.view.ViewGroup

- `<View><MapView /></View>`

### react-native-fbsdk

'React/RCTComponentEvent.h' file not found RCTFBSDKLoginButtonManager.m

- Open React.xcodeproj > Build Phases > Copy Headers > Add RCTComponentEvent.h

package net.iget.www;

import android.content.Intent;
// import androidx.multidex.MultiDexApplication;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;

import com.facebook.react.ReactApplication;
import com.kochava.reactlibrary.RNKochavaTrackerPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.mojomoth.rnkakaotools.RNKakaoToolsPackage;
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.airbnb.android.react.maps.MapsPackage;
import br.com.dopaminamob.gpsstate.GPSStatePackage;
import com.krazylabs.OpenAppSettingsPackage;
import com.vonovak.AddCalendarEventPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.invertase.firebase.RNFirebasePackage;
// optional packages - add/remove as appropriate
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

import com.reactnativecommunity.geolocation.GeolocationPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNKochavaTrackerPackage(),
      new ReactNativeOneSignalPackage(),
      new RNKakaoToolsPackage(),
      new RNKakaoLoginsPackage(),
      new RNGoogleSigninPackage(),
      new FBSDKPackage(),
      new FastImageViewPackage(),
      new ReactNativeYouTube(),
      new SnackbarPackage(),
      new MapsPackage(),
      new GPSStatePackage(),
      new OpenAppSettingsPackage(),
      new AddCalendarEventPackage(),
      new GeolocationPackage(),
      new RNFirebasePackage(),
      // add/remove these packages as appropriate
      new RNFirebaseAdMobPackage(),
      new RNFirebaseAnalyticsPackage(),
      new RNFirebaseAuthPackage(),
      new RNFirebaseRemoteConfigPackage(),
      new RNFirebaseCrashlyticsPackage(),
      new RNFirebaseDatabasePackage(),
      new RNFirebaseFirestorePackage(),
      new RNFirebaseFunctionsPackage(),
      new RNFirebaseInstanceIdPackage(),
      new RNFirebaseLinksPackage(),
      new RNFirebaseMessagingPackage(),
      new RNFirebaseNotificationsPackage(),
      new RNFirebasePerformancePackage(),
      new RNFirebaseStoragePackage()
    );
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false); 
  }
}

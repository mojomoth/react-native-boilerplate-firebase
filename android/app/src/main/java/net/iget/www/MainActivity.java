package net.iget.www;

import com.reactnativenavigation.NavigationActivity;
import android.content.Intent;

public class MainActivity extends NavigationActivity {
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }
}

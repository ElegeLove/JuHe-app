package com.myjhzf;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // 启动页设置添加代码
public class MainActivity extends ReactActivity {

  /**
  * 设置启动页
  */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // 展示启动页设置代码
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "myJHZF";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
          @Override
          protected ReactRootView createRootView() {
                 return new RNGestureHandlerEnabledRootView(MainActivity.this);
          }
      };
   }
  }

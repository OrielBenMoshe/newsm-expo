import { useEffect, useState, useCallback } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";
import WebView from "react-native-webview";
import Signal from "./services/Signal";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default function App() {
  const [webViewSource, setWebViewSource] = useState("https://newsm.co.il");
  const [showWebView, setShowWebview] = useState(true);
  
  const redirect = useCallback((data) => {
    if (data.targetUrl) {
      setShowWebview(false);
      setTimeout(() => {
        setWebViewSource(data.targetUrl);
        setShowWebview(true);
      }, 500);
    }
  }, []);

  useEffect(() => {
    Signal.Register(redirect);

    return () => {
      Signal.Close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor="#1D9B94" barStyle="light-content" />
      {showWebView && (
        <WebView
          source={{ uri: webViewSource }}
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true}
          originWhitelist={["*"]}
          renderLoading={() => (
            <View style={styles.bg}>
              <Image style={styles.gif} source={require("./assets/splash.gif")} />
            </View>
          )}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // incognito={true}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </View>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
  },
  bg: {
    height: "100%",
    width: "100vw",
    backgroundColor: "#202b36",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    margin: "auto",
  },
});

AppRegistry.registerComponent("App", () => DarkTheme);

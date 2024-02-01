import { OneSignal, LogLevel } from "react-native-onesignal";
import Constants from "expo-constants";

OneSignal.Debug.setLogLevel(LogLevel.Verbose);
OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);


// if (lang === 'he') {
//   OneSignal.User.removeTag('lang')
//   OneSignal.User.addTag('lang', 'he')
// }
  
const setLocal = (lang) => {
  OneSignal.User.setLanguage(lang)
}
const Close = () => {
  OneSignal.Notifications.removeEventListener("click")
}
const Register = (callback, lang) => {
  OneSignal.Notifications.requestPermission(true);
  OneSignal.Notifications.addEventListener("click", (event) => {
    console.log({event});
    const data = event.notification.additionalData;
    console.log({data});
    callback(data);
  })

  //   OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  //     //   console.log("Prompt response:", response);
  //   });
  // Also need enable notifications to complete OneSignal setup

    //   OneSignal.setNotificationOpenedHandler((event) => {
    //     const notification = event.notification;
    //     const data = notification.additionalDat;
    //     callback(data);
    //   });
    //   // Method for handling notifications received while app in foreground
    //   OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
    //     // console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent)
    //     const notification = notificationReceivedEvent.getNotification();
    //     const data = notification.additionalData;
    //     callback(data);
    //     notificationReceivedEvent.complete();
  // });
};

if (__DEV__) OneSignal.User.addTag("tester", "yes");

export default { Register, setLocal, Close };

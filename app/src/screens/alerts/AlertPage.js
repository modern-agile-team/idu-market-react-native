// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";
// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";
// import Schedule from "./schedulePushNotification";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function App() {
//   // 알람토큰
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   // useEffect(() => {
//   //   registerForPushNotificationsAsync().then((token) =>
//   //     setExpoPushToken(token)
//   //   );

//   //   notificationListener.current =
//   //     Notifications.addNotificationReceivedListener((notification) => {
//   //       setNotification(notification);
//   //     });

//   //   responseListener.current =
//   //     Notifications.addNotificationResponseReceivedListener((response) => {
//   //       console.log(response);
//   //     });

//   //   return () => {
//   //     Notifications.removeNotificationSubscription(
//   //       notificationListener.current
//   //     );
//   //     Notifications.removeNotificationSubscription(responseListener.current);
//   //   };
//   // }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "space-around",
//       }}
//     >
//       {/* {console.log(1, expoPushToken)} */}
//       <View style={{ alignItems: "center", justifyContent: "center" }}>
//         <Text>
//           {notification && notification.request.content.title}
//           {"1"}
//         </Text>
//         <Text>{notification && notification.request.content.body}</Text>
//         {/* <Text>
//           {"dataㅁㅁ "}
//           {notification && JSON.stringify(notification.request.content.data)}
//         </Text> */}
//       </View>
//       <Button
//         title="ad"
//         onPress={async () => {
//           await Schedule.pushNotification();
//         }}
//       ></Button>
//     </View>
//   );
// }

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./app/screens/Homescreen";
import HistoryScreen from "./app/screens/HistoryScreen";
import PaymentScreen from "./app/screens/PaymentScreen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountsScreen from "./app/screens/AccountsScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import LoginScreen from "./app/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const username = user.email?.split("@")[0];
        setUser(username);
      } else {
        setUser(null)
      }
    });
  }, []);

  const screens = [
    // { name: "Login", options: { headerShown: false }, component: LoginScreen },
    { name: "Home", options: { headerShown: false }, component: Homescreen },
    { name: "Transactions", options: {}, component: HistoryScreen },
    { name: "Payment", options: {}, component: PaymentScreen },
    { name: "Accounts", options: {}, component: AccountsScreen },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          screens?.map((screen, index) => (
            <Stack.Screen
              key={index}
              name={screen.name}
              options={screen.options}
              component={screen.component}
            />
          ))
        ) : (
          <Stack.Screen
            name="Login"
            options={{ 
              animationTypeForReplace: !user ? 'pop' : 'push',
              headerShown: false }}
            component={LoginScreen}
            
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    alignItems: "center",
    padding: 20,
    // justifyContent: 'center',
  },
});

import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Button } from "react-native";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserData } from "../services/user";
import { ScrollView, RefreshControl } from "react-native";
import React from "react";

function Homescreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigation.navigate("Login");
      } else {
        const newUser = await getUserData(user?.uid);
        setUser(newUser);
        setRefreshing(false);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const buttons = [
    { text: "Notifications", navigationScreen: "Payment" },
    { text: "Transaction history", navigationScreen: "Transactions" },
    { text: "Pay Bills", navigationScreen: "Accounts" },
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>EASY-GO!</Text>

        <View>
          <Text style={styles.welcome}>Welcome, {user?.name}</Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>Balance: </Text>
          <Text style={styles.amount}>$ {user?.balance}</Text>
        </View>

        <View style={styles.btnContainer}>
          {buttons?.map((button, index) => (
            <Pressable
              key={index}
              style={styles.btn}
              onPress={() => navigation.navigate(button.navigationScreen)}
            >
              <Text>{button.text}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.logoutContainer}>
          <Pressable style={[styles.btn, styles.logout]} onPress={handleLogout}>
            <Text>Logout</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 200,
  },
  logo: {
    fontSize: 50,
    fontStyle: "italic",
    fontWeight: "bold",
    letterSpacing: -2,
    color: "grey",
  },
  welcome: {
    fontSize: 18,
  },
  balanceContainer: {
    display: "flex",
    // alignItems: "center",
    backgroundColor: "lightgrey",
    margin: 20,
    width: "90%",
    borderRadius: 14,
    padding: 20,
  },
  balance: {
    fontSize: 22,
  },
  amount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "grey",
    marginTop: 10,
    marginBottom: 30,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    width: "90%",
    margin: 50,
    // padding: 20,
  },
  btn: {
    backgroundColor: "#fff",
    padding: 15,
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
    textAlign: "center",
    elevation: 6,
  },
  logoutContainer: {
    width: "90%",
    display: "flex",
    alignItems: "center",
  },
  logout: {
    // position: "absolute",
    // bottom: 30,
    // margin: calc("100%" - 20),
    // margin: 0,
  },
});

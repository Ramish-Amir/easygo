import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Button } from "react-native";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { ScrollView } from "react-native";

function Homescreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("Login");
      } else {
        const username = user.email?.split("@")[0];
        setUser(username);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const buttons = [
    { text: "View Recent Payment", navigationScreen: "Payment" },
    { text: "View transaction history", navigationScreen: "Transactions" },
    { text: "Manage Bank Accounts", navigationScreen: "Accounts" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <Text style={styles.logo}>EASY-GO!</Text>

      <View>
        <Text style={styles.welcome}>Welcome, {user}</Text>
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

      <Pressable style={[styles.btn, styles.logout]} onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
    width: "100%",
    margin: 200,
  },
  btn: {
    backgroundColor: "#fff",
    padding: 15,
    width: "70%",
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
    textAlign: "center",
    elevation: 6,
  },
  logout: {
    position: "absolute",
    bottom: 30,
    // margin: 0,
  },
});

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { ScrollView } from "react-native";

function LoginScreen() {
  const navigation = useNavigation();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         navigation.navigate("Home");
  //       }
  //     });
  //   }, []);

  const handleLogin = () => {
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      alert("Both Username and Password are required");
      return;
    }
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((userCredential) => {
        console.log("LOGGED IN");
        // navigation.navigate("Home");
      })
      .catch((error) => {
        alert("Invalid Credentials");
        return;
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>EASY-GO!</Text>

        <View>
          <Text style={styles.welcome}>Login to your account</Text>
        </View>

        <View style={styles.btnContainer}>
          <TextInput
            style={styles.btn}
            value={loginForm.email}
            placeholder={"Username"}
            onChangeText={(value) =>
              setLoginForm({ ...loginForm, email: value })
            }
          />
          <TextInput
            style={styles.btn}
            value={loginForm.password}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(value) =>
              setLoginForm({ ...loginForm, password: value })
            }
          />
          <Pressable style={styles.btn} onPress={handleLogin}>
            <Text>{"Login"}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default LoginScreen;

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
  formInput: {
    width: "70%",
    backgroundColor: "red",
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
});

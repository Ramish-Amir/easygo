import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { getRecentPayment } from "../services/user";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase";
import { ScrollView } from "react-native";

function PaymentScreen() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const recentPayments = await getRecentPayment(user?.uid);
        setPayments(recentPayments);
      }
    });
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        {payments?.map((payment, index) => {
          const date = new Date(payment?.time?.seconds * 1000); // Convert seconds to milliseconds

          // Format date
          const dateFormatOptions = {
            month: "short",
            day: "numeric",
            year: "numeric",
          };
          const formattedDate = date.toLocaleDateString(
            "en-US",
            dateFormatOptions
          );

          // Format time
          const timeFormatOptions = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          };
          const formattedTime = date.toLocaleTimeString(
            "en-US",
            timeFormatOptions
          );

          return (
            <View style={styles.balanceContainer} key={index}>
              <Text>You recent payment</Text>
              <View style={styles.textRow}>
                <Text style={styles.text}>Amount:</Text>
                <Text style={styles.text}>$ {payment?.amount}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.text}>Date:</Text>
                <Text style={styles.text}>{formattedDate}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.text}>Time:</Text>
                <Text style={styles.text}>{formattedTime}</Text>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.text}>Paid to:</Text>
                <Text style={styles.text}>{payment?.provider}</Text>
              </View>
            </View>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  balanceContainer: {
    display: "flex",
    backgroundColor: "lightgrey",
    margin: 20,
    width: "90%",
    borderRadius: 14,
    padding: 20,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    marginTop: 5,
  },
});

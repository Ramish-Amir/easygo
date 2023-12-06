import React from "react";
import { Text, StyleSheet, View } from "react-native";

function Transaction(props) {
  const { amount, time, provider } = props?.transaction;
  const date = new Date(time?.seconds * 1000); // Convert seconds to milliseconds

  // Format date
  const dateFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", dateFormatOptions);

  // Format time
  const timeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedTime = date.toLocaleTimeString("en-US", timeFormatOptions);

  return (
    <View style={styles.balanceContainer}>
      <View style={styles.textRow}>
        <Text style={styles.text}>Amount:</Text>
        <Text style={styles.text}>$ {amount}</Text>
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
        <Text style={styles.text}>{provider}</Text>
      </View>
    </View>
  );
}

export default Transaction;

const styles = StyleSheet.create({
  balanceContainer: {
    display: "flex",
    backgroundColor: "lightgrey",
    marginTop: 10,
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
    // marginTop: ,
  },
});

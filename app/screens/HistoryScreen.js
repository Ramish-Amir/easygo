import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Transaction from "../components/Transaction";
import { useEffect } from "react";
import { getTrasactionHistory } from "../services/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { ScrollView } from "react-native";

function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const transactions = await getTrasactionHistory(user?.uid);
        setTransactions(transactions);
      }
    });
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {transactions?.map((transaction, index) => (
          <Transaction key={index} transaction={transaction} />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 5,
    // margin: 5,
    width: "100%",
    paddingTop: 100,
  },
});

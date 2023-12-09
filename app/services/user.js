import { db } from "../../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

const userCollectionName = "users";

export const getUserData = async (userId) => {
  try {
    const q = query(collection(db, userCollectionName));

    const querySnapshot = await getDocs(q);
    let user = null;

    querySnapshot.forEach((doc) => {
      if (doc.id === userId) {
        user = doc.data();
      }
    });

    return user;
  } catch (err) {
    console.log("ERROR >> ", err);
  }
};

export const getRecentPayment = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, userCollectionName, userId, "recentPayment")
    );
    const recentPayments = [];
    querySnapshot.forEach((doc) => {
      recentPayments?.push(doc?.data());
    });

    return recentPayments;
  } catch (err) {
    console.log("ERROR >> ", err);
  }
};

export const getTrasactionHistory = async (userId) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, userCollectionName, userId, "transaction"),
        orderBy("time", "desc")
      )
    );
    const transactions = [];
    querySnapshot.forEach((doc) => {
      transactions?.push(doc?.data());
    });

    return transactions;
  } catch (err) {
    console.log("ERROR >> ", err);
  }
};

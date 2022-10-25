import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem( itemData) {
  return <ExpenseItem{...itemData.item} />
}

const ExpensesList = ({ expenses }) => {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});

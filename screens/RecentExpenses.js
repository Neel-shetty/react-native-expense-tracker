import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext);
  //const [fetchedExpenses, setFetchedExpenses] = useState([])

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try{
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch Expenses!')
      }
      setIsFetching(false);
      
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null)
  }

  if(error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if(isFetching) {
    return <LoadingOverlay />
  }

  const RecentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={RecentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered in the last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});

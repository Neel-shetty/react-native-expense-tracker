import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 58.59,
    date: new Date("2022-10-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-10-24"),
  },
  {
    id: "e3",
    description: "fleshlight",
    amount: 69.69,
    date: new Date("2022-10-24"),
  },
  {
    id: "e4",
    description: "spotify",
    amount: 8.99,
    date: new Date("2022-10-28"),
  },
  {
    id: "e5",
    description: "game",
    amount: 75.99,
    date: new Date("2022-10-15"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 58.59,
    date: new Date("2022-10-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-10-24"),
  },
  {
    id: "e8",
    description: "fleshlight",
    amount: 69.69,
    date: new Date("2022-10-24"),
  },
  {
    id: "e9",
    description: "spotify",
    amount: 8.99,
    date: new Date("2022-10-28"),
  },
  {
    id: "e10",
    description: "game",
    amount: 75.99,
    date: new Date("2022-10-15"),
  },
  {
    id: "e11",
    description: "A pair of shoes",
    amount: 58.59,
    date: new Date("2022-10-19"),
  },
  {
    id: "e12",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-10-24"),
  },
  {
    id: "e13",
    description: "fleshlight",
    amount: 69.69,
    date: new Date("2022-10-24"),
  },
  {
    id: "e14",
    description: "spotify",
    amount: 8.99,
    date: new Date("2022-10-28"),
  },
  {
    id: "e15",
    description: "game",
    amount: 75.99,
    date: new Date("2022-10-15"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

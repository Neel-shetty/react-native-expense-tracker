import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
//import CustomTabBarButton from "./components/UI/CustomTabBarButton";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator
      activeColor="white"
      //labeled={false}
      shifting={true}
      barStyle={styles.tabBarStyle}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        //tabBarShowLabel: false,
        //tabBarIcon: ({color, size, focused}) => {},
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={26}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="hourglass" color={color} size={26} />
          ),
          tabBarLabel: "Recent",
        }}
      />
      {/*<Tab.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          //tabBarIcon: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color }) => (
            <IconButton
              icon="add"
              labeled={false}
              size={50}
              color={GlobalStyles.colors.accent500}
              onPress={() => {}}
            />
          ),

          //tabBarLabel: "Add",
          //borderRadius: 40,
          //overflow: "hidden",
        }}
      /> */}
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="file-tray-outline" color={color} size={26} />
          ),
          tabBarLabel: "All Expenses",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ headerShown: true, presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarStyle: {
    position: "absolute",
    backgroundColor: GlobalStyles.colors.primary500,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
  },
});

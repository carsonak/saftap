import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import DashboardScreen from "./screens/DashboardScreen";
import HistoryScreen from "./screens/HistoryScreen";
import FundWalletScreen from "./screens/FundWalletScreen";

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: "#a04100",
  primaryContainer: "#ff6b00",
  onPrimaryContainer: "#572000",
  surface: "#f8f9ff",
  onSurfaceVariant: "#5a4136",
};

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
          Home: "home",
          Wallet: "account-balance-wallet",
          History: "history",
          Profile: "person",
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.tabItemActive]}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={iconMap[route.name] ?? "home"}
              size={24}
              color={
                isFocused ? COLORS.onPrimaryContainer : COLORS.onSurfaceVariant
              }
            />
            <Text
              style={[
                styles.tabLabel,
                isFocused
                  ? styles.tabLabelActive
                  : styles.tabLabelInactive,
              ]}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="Home"
            component={DashboardScreen}
            options={{ tabBarLabel: "Home" }}
          />
          <Tab.Screen
            name="Wallet"
            component={FundWalletScreen}
            options={{ tabBarLabel: "Wallet" }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{ tabBarLabel: "History" }}
          />
          <Tab.Screen
            name="Profile"
            component={DashboardScreen}
            options={{ tabBarLabel: "Profile" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(248,249,255,0.95)",
    borderTopWidth: 0,
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: "#1a73e8",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
    height: 72,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tabItemActive: {
    backgroundColor: "#ff6b00",
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  tabLabelActive: {
    color: "#572000",
  },
  tabLabelInactive: {
    color: "#5a4136",
  },
});

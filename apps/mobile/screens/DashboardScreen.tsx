import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  primary: "#a04100",
  primaryContainer: "#ff6b00",
  onPrimaryContainer: "#572000",
  secondary: "#006d37",
  secondaryContainer: "#6bfe9c",
  onSecondaryContainer: "#00743a",
  tertiary: "#005bc0",
  tertiaryContainer: "#5c97ff",
  onTertiaryContainer: "#002f69",
  surface: "#f8f9ff",
  surfaceContainer: "#e6eeff",
  surfaceContainerHigh: "#dee9fc",
  surfaceContainerLow: "#eff4ff",
  onSurface: "#121c2a",
  onSurfaceVariant: "#5a4136",
  error: "#ba1a1a",
  outlineVariant: "#e2bfb0",
  white: "#ffffff",
};

const transactions = [
  {
    id: 1,
    name: "Java House, CBD",
    time: "Today • 12:45 PM",
    amount: "- KES 2,450",
    category: "Dining",
    icon: "restaurant" as const,
    iconBg: COLORS.secondaryContainer,
    iconColor: COLORS.onSecondaryContainer,
    amountColor: COLORS.error,
  },
  {
    id: 2,
    name: "Bolt Ride",
    time: "Today • 09:12 AM",
    amount: "- KES 850",
    category: "Transport",
    icon: "commute" as const,
    iconBg: COLORS.tertiaryContainer,
    iconColor: COLORS.onTertiaryContainer,
    amountColor: COLORS.error,
  },
  {
    id: 3,
    name: "Transfer from USD Card",
    time: "Yesterday • 04:30 PM",
    amount: "+ KES 50,000",
    category: "Top Up",
    icon: "download" as const,
    iconBg: "#6bfe9c",
    iconColor: "#005228",
    amountColor: COLORS.secondary,
  },
];

export default function DashboardScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100?img=11" }}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.logo}>SafTap</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <MaterialIcons name="notifications" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Jambo, Alex!</Text>
          <Text style={styles.greetingSubtitle}>Karibu. Your travel funds are ready.</Text>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>KES 142,500.00</Text>
            </View>
            <MaterialIcons name="account-balance-wallet" size={32} color={COLORS.white} />
          </View>
          <View style={styles.balanceBottom}>
            <View style={styles.balancePill}>
              <Text style={styles.balancePillText}>≈ $ 1,085.34 </Text>
              <View style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>Live</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() => navigation.navigate("Wallet")}
            activeOpacity={0.8}
          >
            <View style={styles.scanIconWrap}>
              <MaterialIcons name="qr-code-scanner" size={32} color={COLORS.white} />
            </View>
            <Text style={styles.scanLabel}>Scan to Pay</Text>
          </TouchableOpacity>
          <View style={styles.smallActions}>
            <TouchableOpacity style={styles.smallBtn} activeOpacity={0.8}>
              <View style={styles.smallIconWrap}>
                <MaterialIcons name="add" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.smallLabel}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn} activeOpacity={0.8}>
              <View style={styles.smallIconWrap}>
                <MaterialIcons name="send" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.smallLabel}>Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.txCard}>
              <View style={[styles.txIcon, { backgroundColor: tx.iconBg }]}>
                <MaterialIcons name={tx.icon} size={22} color={tx.iconColor} />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txName}>{tx.name}</Text>
                <Text style={styles.txTime}>{tx.time}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, { color: tx.amountColor }]}>{tx.amount}</Text>
                <Text style={styles.txCategory}>{tx.category}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoIcon}>
            <MaterialIcons name="bolt" size={28} color={COLORS.onSecondaryContainer} />
          </View>
          <View style={styles.promoText}>
            <Text style={styles.promoTitle}>Smart Currency Tips</Text>
            <Text style={styles.promoBody}>
              Rates are currently favorable for USD to KES exchange.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "rgba(248,249,255,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant + "30",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 2, borderColor: "#ffdbcc", overflow: "hidden",
  },
  avatarImage: { width: "100%", height: "100%" },
  logo: { fontSize: 22, fontWeight: "700", color: COLORS.primary, letterSpacing: -0.5 },
  notifBtn: { padding: 8 },
  scroll: { paddingBottom: 24 },
  greeting: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4 },
  greetingTitle: { fontSize: 28, fontWeight: "700", color: COLORS.onSurface, letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 14, color: COLORS.onSurfaceVariant, marginTop: 2 },
  balanceCard: {
    marginHorizontal: 20, marginTop: 16, borderRadius: 24,
    backgroundColor: COLORS.tertiary, padding: 24,
    shadowColor: "#1a73e8", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, shadowRadius: 16, elevation: 8,
  },
  balanceTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  balanceLabel: { fontSize: 11, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 1.5 },
  balanceAmount: { fontSize: 32, fontWeight: "700", color: COLORS.white, marginTop: 4, letterSpacing: -1 },
  balanceBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 24 },
  balancePill: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 999,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.3)",
  },
  balancePillText: { color: COLORS.white, fontSize: 13, fontWeight: "600" },
  liveBadge: { backgroundColor: "#6bfe9c", borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1, marginLeft: 4 },
  liveBadgeText: { fontSize: 9, fontWeight: "700", color: "#00210c" },
  quickActions: { flexDirection: "row", paddingHorizontal: 20, marginTop: 16, gap: 12 },
  scanBtn: {
    flex: 2, backgroundColor: COLORS.primaryContainer, borderRadius: 24,
    paddingVertical: 20, alignItems: "center", justifyContent: "center",
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  scanIconWrap: {
    backgroundColor: "rgba(255,255,255,0.2)", padding: 12,
    borderRadius: 16, marginBottom: 8,
  },
  scanLabel: { color: COLORS.white, fontWeight: "700", fontSize: 13 },
  smallActions: { flex: 1, gap: 12 },
  smallBtn: {
    flex: 1, backgroundColor: COLORS.surface, borderRadius: 20,
    alignItems: "center", justifyContent: "center", paddingVertical: 12,
    borderWidth: 1, borderColor: COLORS.outlineVariant,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  smallIconWrap: { backgroundColor: COLORS.primary + "10", padding: 8, borderRadius: 12, marginBottom: 4 },
  smallLabel: { color: COLORS.primary, fontSize: 11, fontWeight: "600" },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: COLORS.onSurface },
  seeAll: { fontSize: 13, fontWeight: "600", color: COLORS.secondary },
  txCard: {
    flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16, padding: 14, marginBottom: 8,
    shadowColor: "#1a73e8", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    borderWidth: 1, borderColor: COLORS.outlineVariant + "30",
  },
  txIcon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  txInfo: { flex: 1, marginLeft: 12 },
  txName: { fontSize: 13, fontWeight: "600", color: COLORS.onSurface },
  txTime: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  txRight: { alignItems: "flex-end" },
  txAmount: { fontSize: 14, fontWeight: "700" },
  txCategory: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  promoCard: {
    marginHorizontal: 20, marginTop: 16, flexDirection: "row",
    backgroundColor: COLORS.surfaceContainerLow, borderRadius: 20,
    padding: 16, alignItems: "center", gap: 12,
    borderWidth: 1, borderColor: COLORS.surfaceContainer,
  },
  promoIcon: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: COLORS.secondaryContainer, alignItems: "center", justifyContent: "center",
  },
  promoText: { flex: 1 },
  promoTitle: { fontSize: 14, fontWeight: "700", color: COLORS.onSurface },
  promoBody: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2, lineHeight: 16 },
});

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
import { useState } from "react";

const COLORS = {
  primary: "#a04100",
  primaryContainer: "#ff6b00",
  onPrimaryContainer: "#572000",
  secondary: "#006d37",
  secondaryContainer: "#6bfe9c",
  tertiary: "#005bc0",
  tertiaryContainer: "#5c97ff",
  onTertiaryContainer: "#002f69",
  surface: "#f8f9ff",
  surfaceContainer: "#e6eeff",
  surfaceContainerLow: "#eff4ff",
  surfaceContainerLowest: "#ffffff",
  onSurface: "#121c2a",
  onSurfaceVariant: "#5a4136",
  error: "#ba1a1a",
  outlineVariant: "#e2bfb0",
  white: "#ffffff",
};

type Filter = "all" | "spent" | "received";

const allTransactions = [
  {
    id: 1,
    type: "spent" as const,
    name: "Safari Curios",
    time: "2:45 PM • Tap to Pay",
    amount: "- $42.50",
    date: "Today, Oct 24",
    icon: "shopping-bag" as const,
    iconBg: COLORS.primaryContainer + "20",
    iconColor: COLORS.primaryContainer,
    amountColor: COLORS.error,
  },
  {
    id: 2,
    type: "spent" as const,
    name: "Nairobi Coffee House",
    time: "11:20 AM • QR Scan",
    amount: "- $8.90",
    date: "Today, Oct 24",
    icon: "local-cafe" as const,
    iconBg: COLORS.primaryContainer + "20",
    iconColor: COLORS.primaryContainer,
    amountColor: COLORS.error,
  },
  {
    id: 3,
    type: "received" as const,
    name: "Top-up from Bank",
    time: "5:15 PM • Linked Account",
    amount: "+ $500.00",
    date: "Yesterday, Oct 23",
    icon: "account-balance-wallet" as const,
    iconBg: COLORS.secondaryContainer + "40",
    iconColor: COLORS.secondary,
    amountColor: COLORS.secondary,
  },
  {
    id: 4,
    type: "spent" as const,
    name: "Maasai Market stall #12",
    time: "2:30 PM • Peer-to-Peer",
    amount: "- $120.00",
    date: "Yesterday, Oct 23",
    icon: "storefront" as const,
    iconBg: COLORS.primaryContainer + "20",
    iconColor: COLORS.primaryContainer,
    amountColor: COLORS.error,
  },
  {
    id: 5,
    type: "received" as const,
    name: "Received from Jane Doe",
    time: "9:00 AM • Split Bill",
    amount: "+ $15.50",
    date: "Yesterday, Oct 23",
    icon: "person-add" as const,
    iconBg: COLORS.tertiaryContainer + "30",
    iconColor: COLORS.tertiary,
    amountColor: COLORS.secondary,
  },
];

export default function HistoryScreen() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = allTransactions.filter((tx) =>
    filter === "all" ? true : tx.type === filter
  );

  // Group by date
  const grouped = filtered.reduce<Record<string, typeof allTransactions>>(
    (acc, tx) => {
      if (!acc[tx.date]) acc[tx.date] = [];
      acc[tx.date].push(tx);
      return acc;
    },
    {}
  );

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
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Transaction History</Text>
          <Text style={styles.subtitle}>Track your global spending and local payments.</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          {(["all", "spent", "received"] as Filter[]).map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterTab, filter === f && styles.filterTabActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterLabel,
                  filter === f ? styles.filterLabelActive : styles.filterLabelInactive,
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions grouped by date */}
        {Object.entries(grouped).map(([date, txs]) => (
          <View key={date} style={styles.group}>
            <Text style={styles.dateHeader}>{date.toUpperCase()}</Text>
            {txs.map((tx) => (
              <TouchableOpacity key={tx.id} style={styles.txCard} activeOpacity={0.85}>
                <View style={[styles.txIcon, { backgroundColor: tx.iconBg }]}>
                  <MaterialIcons name={tx.icon} size={22} color={tx.iconColor} />
                </View>
                <View style={styles.txInfo}>
                  <Text style={styles.txName}>{tx.name}</Text>
                  <Text style={styles.txTime}>{tx.time}</Text>
                </View>
                <View style={styles.txRight}>
                  <Text style={[styles.txAmount, { color: tx.amountColor }]}>{tx.amount}</Text>
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>COMPLETED</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Security promo */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Safe Travels, Secure Payments</Text>
            <Text style={styles.promoBody}>
              Every transaction is protected by SafTap's military-grade encryption.
            </Text>
          </View>
          <MaterialIcons
            name="security"
            size={80}
            color="rgba(255,255,255,0.15)"
            style={styles.promoIcon}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: "rgba(248,249,255,0.9)",
    borderBottomWidth: 1, borderBottomColor: COLORS.outlineVariant + "30",
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#ffdbcc", overflow: "hidden" },
  avatarImage: { width: "100%", height: "100%" },
  logo: { fontSize: 22, fontWeight: "700", color: COLORS.primary, letterSpacing: -0.5 },
  notifBtn: { padding: 8 },
  scroll: { paddingBottom: 24 },
  titleSection: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: "700", color: COLORS.onSurface, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: COLORS.onSurfaceVariant, marginTop: 2 },
  filterRow: {
    flexDirection: "row", marginHorizontal: 20, marginBottom: 16,
    backgroundColor: COLORS.surfaceContainerLow, borderRadius: 12,
    padding: 4, borderWidth: 1, borderColor: COLORS.outlineVariant + "30",
  },
  filterTab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  filterTabActive: { backgroundColor: COLORS.surfaceContainerLowest, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  filterLabel: { fontSize: 13, fontWeight: "600" },
  filterLabelActive: { color: COLORS.primary },
  filterLabelInactive: { color: COLORS.onSurfaceVariant },
  group: { paddingHorizontal: 20, marginBottom: 8 },
  dateHeader: { fontSize: 11, fontWeight: "700", color: COLORS.onSurfaceVariant, letterSpacing: 1.5, marginBottom: 10, marginTop: 8 },
  txCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16, padding: 14, marginBottom: 8,
    shadowColor: "#1a73e8", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    borderWidth: 1, borderColor: COLORS.outlineVariant + "20",
  },
  txIcon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  txInfo: { flex: 1, marginLeft: 12 },
  txName: { fontSize: 13, fontWeight: "600", color: COLORS.onSurface },
  txTime: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  txRight: { alignItems: "flex-end" },
  txAmount: { fontSize: 15, fontWeight: "700" },
  completedBadge: { marginTop: 4, backgroundColor: COLORS.secondary + "15", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999, borderWidth: 1, borderColor: COLORS.secondary + "30" },
  completedText: { fontSize: 9, fontWeight: "700", color: COLORS.secondary },
  promoBanner: {
    marginHorizontal: 20, marginTop: 8, borderRadius: 20,
    backgroundColor: COLORS.tertiary, padding: 24, overflow: "hidden",
    minHeight: 130,
  },
  promoContent: { width: "65%" },
  promoTitle: { fontSize: 18, fontWeight: "700", color: COLORS.white, lineHeight: 24 },
  promoBody: { fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 6, lineHeight: 18 },
  promoIcon: { position: "absolute", right: -8, bottom: -8 },
});

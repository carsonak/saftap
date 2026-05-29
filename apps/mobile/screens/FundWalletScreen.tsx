import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
  onSecondaryContainer: "#00743a",
  tertiary: "#005bc0",
  surface: "#f8f9ff",
  surfaceContainer: "#e6eeff",
  surfaceContainerLow: "#eff4ff",
  surfaceContainerLowest: "#ffffff",
  onSurface: "#121c2a",
  onSurfaceVariant: "#5a4136",
  outlineVariant: "#e2bfb0",
  white: "#ffffff",
};

const QUICK_AMOUNTS = [20, 50, 100];

export default function FundWalletScreen() {
  const [amount, setAmount] = useState("50");
  const [selected, setSelected] = useState(50);

  const handleQuickAmount = (val: number) => {
    setAmount(String(val));
    setSelected(val);
  };

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
          <Text style={styles.title}>Fund Your Wallet</Text>
          <Text style={styles.subtitle}>Add funds instantly via your linked Visa card.</Text>
        </View>

        {/* Visa Card */}
        <View style={styles.visaCard}>
          <View style={styles.visaTop}>
            <MaterialIcons name="contactless" size={36} color={COLORS.white} />
            <Text style={styles.visaWordmark}>VISA</Text>
          </View>
          <View style={styles.visaMiddle}>
            <View style={styles.chip} />
            <Text style={styles.cardNumber}>•••• •••• •••• 4291</Text>
          </View>
          <View style={styles.visaBottom}>
            <View>
              <Text style={styles.cardFieldLabel}>CARD HOLDER</Text>
              <Text style={styles.cardFieldValue}>ALEX RIVERA</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.cardFieldLabel}>EXPIRY</Text>
              <Text style={styles.cardFieldValue}>09/27</Text>
            </View>
          </View>
        </View>

        {/* Change Card */}
        <TouchableOpacity style={styles.changeCard} activeOpacity={0.7}>
          <MaterialIcons name="add-card" size={18} color={COLORS.secondary} />
          <Text style={styles.changeCardText}>Use a different card</Text>
        </TouchableOpacity>

        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Enter Deposit Amount</Text>
          <View style={styles.amountBox}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={(v) => {
                setAmount(v);
                setSelected(0);
              }}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={COLORS.outlineVariant}
            />
          </View>
          {/* Quick chips */}
          <View style={styles.chips}>
            {QUICK_AMOUNTS.map((val) => (
              <TouchableOpacity
                key={val}
                style={[styles.chip2, selected === val && styles.chipActive]}
                onPress={() => handleQuickAmount(val)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, selected === val && styles.chipTextActive]}>
                  ${val}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.85}>
          <Text style={styles.confirmText}>Confirm Deposit</Text>
          <MaterialIcons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>

        {/* Security Badges */}
        <View style={styles.securityRow}>
          <View style={styles.securityItem}>
            <MaterialIcons name="verified-user" size={16} color={COLORS.secondary} />
            <Text style={styles.securityText}>Verified by Visa</Text>
          </View>
          <View style={styles.securityItem}>
            <MaterialIcons name="lock" size={16} color={COLORS.secondary} />
            <Text style={styles.securityText}>Secure Encryption</Text>
          </View>
        </View>

        {/* Instant info card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <MaterialIcons name="bolt" size={26} color={COLORS.onSecondaryContainer} />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Instant Availability</Text>
            <Text style={styles.infoBody}>
              Funds added via Visa are credited to your SafTap wallet immediately for local transactions.
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
  scroll: { paddingBottom: 32 },
  titleSection: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4 },
  title: { fontSize: 28, fontWeight: "700", color: COLORS.onSurface, letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: COLORS.onSurfaceVariant, marginTop: 2 },
  visaCard: {
    marginHorizontal: 20, marginTop: 20, borderRadius: 20, padding: 24,
    backgroundColor: COLORS.tertiary,
    shadowColor: "#1a73e8", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2, shadowRadius: 20, elevation: 10,
    aspectRatio: 1.586,
    justifyContent: "space-between",
  },
  visaTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  visaWordmark: { fontSize: 22, fontWeight: "700", fontStyle: "italic", color: COLORS.white, letterSpacing: 1 },
  visaMiddle: { flexDirection: "row", alignItems: "center", gap: 16 },
  chip: { width: 44, height: 32, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 6, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  cardNumber: { fontSize: 18, color: COLORS.white, fontWeight: "600", letterSpacing: 3 },
  visaBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  cardFieldLabel: { fontSize: 9, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1.5 },
  cardFieldValue: { fontSize: 13, color: COLORS.white, fontWeight: "700", marginTop: 2, letterSpacing: 1 },
  changeCard: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    marginHorizontal: 20, marginTop: 12, gap: 6,
    paddingVertical: 12, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.secondary + "30",
    backgroundColor: COLORS.secondaryContainer + "15",
  },
  changeCardText: { fontSize: 13, fontWeight: "600", color: COLORS.secondary },
  amountSection: { paddingHorizontal: 20, marginTop: 24 },
  amountLabel: { fontSize: 11, fontWeight: "600", color: COLORS.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 },
  amountBox: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 20,
    borderWidth: 1.5, borderColor: COLORS.outlineVariant,
    paddingHorizontal: 24, paddingVertical: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  currencySymbol: { fontSize: 36, fontWeight: "700", color: COLORS.primaryContainer, marginRight: 6 },
  amountInput: { flex: 1, fontSize: 36, fontWeight: "700", color: COLORS.onSurface, padding: 0 },
  chips: { flexDirection: "row", gap: 10, marginTop: 12 },
  chip2: {
    flex: 1, paddingVertical: 14, alignItems: "center", borderRadius: 14,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1, borderColor: COLORS.outlineVariant + "60",
  },
  chipActive: {
    backgroundColor: COLORS.primaryContainer + "15",
    borderWidth: 2, borderColor: COLORS.primaryContainer,
  },
  chipText: { fontSize: 14, fontWeight: "600", color: COLORS.onSurface },
  chipTextActive: { color: COLORS.onPrimaryContainer },
  confirmBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    marginHorizontal: 20, marginTop: 24, backgroundColor: COLORS.primaryContainer,
    paddingVertical: 18, borderRadius: 20, gap: 8,
    shadowColor: COLORS.primaryContainer, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  confirmText: { fontSize: 16, fontWeight: "700", color: COLORS.white },
  securityRow: { flexDirection: "row", justifyContent: "center", gap: 24, marginTop: 16, opacity: 0.6 },
  securityItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  securityText: { fontSize: 10, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5, color: COLORS.onSurfaceVariant },
  infoCard: {
    marginHorizontal: 20, marginTop: 20, flexDirection: "row",
    backgroundColor: COLORS.surfaceContainerLow, borderRadius: 20,
    padding: 16, gap: 12, alignItems: "flex-start",
    borderWidth: 1, borderColor: COLORS.surfaceContainer, borderStyle: "dashed",
  },
  infoIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: COLORS.secondaryContainer, alignItems: "center", justifyContent: "center" },
  infoText: { flex: 1 },
  infoTitle: { fontSize: 13, fontWeight: "700", color: COLORS.onSurface },
  infoBody: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 4, lineHeight: 18 },
  onPrimaryContainer: COLORS.onPrimaryContainer,
});

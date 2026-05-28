import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Switch,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Syne_700Bold, Syne_600SemiBold } from "@expo-google-fonts/syne";
import { DM_Sans_400Regular, DM_Sans_700Bold } from "@expo-google-fonts/dm-sans";
import { JetBrainsMono_500Medium } from "@expo-google-fonts/jetbrains-mono";
import { 
  Home, 
  CreditCard, 
  Send as SendIcon, 
  User, 
  History, 
  MoreVertical, 
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  HandCoins,
  Globe,
  Snowflake,
  Eye,
  Smartphone,
  FileText,
  Banknote,
  ArrowLeftRight,
  Wallet,
  ShieldCheck,
  Settings,
  Bell,
  Headset,
  LogOut,
  Copy,
  ChevronRight,
  CheckCircle2
} from "lucide-react-native";
import { theme } from "./theme";

const { width } = Dimensions.get("window");

type Tab = "home" | "visa" | "payment" | "profile" | "mpesa_send" | "paybill" | "buy_goods" | "success";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Syne_700Bold,
    Syne_600SemiBold,
    DM_Sans_400Regular,
    DM_Sans_700Bold,
    JetBrainsMono_500Medium,
  });

  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [prevTab, setPrevTab] = useState<Tab>("home");
  const [isReady, setIsReady] = useState(false);
  const [intlPayments, setIntlPayments] = useState(true);
  const [onlinePurchases, setOnlinePurchases] = useState(true);

  // Form States
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [bizNumber, setBizNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [tillNumber, setTillNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Non-blocking font load
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    if (fontsLoaded || fontError) {
      setIsReady(true);
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [fontsLoaded, fontError]);

  if (!isReady) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  const navigateTo = (tab: Tab) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigateTo("success");
    }, 2000);
  };

  const getFont = (base: string) => fontsLoaded ? base : Platform.OS === 'ios' ? 'System' : 'sans-serif';

  // --- SCREEN RENDERS ---

  const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
      <View style={styles.header}>
        <Text style={[styles.brandText, { fontFamily: getFont("Syne_700Bold") }]}>SafTap</Text>
        <TouchableOpacity onPress={() => navigateTo("profile")} style={styles.avatarJO}>
          <Text style={[styles.avatarJOText, { fontFamily: getFont("Syne_700Bold") }]}>JO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeaderRow}>
          <Text style={[styles.labelCaps, { fontFamily: getFont("DM_Sans_700Bold") }]}>TOTAL BALANCE</Text>
          <View style={styles.mainWalletBadge}>
            <View style={styles.greenDot} />
            <Text style={[styles.badgeTextSmall, { fontFamily: getFont("DM_Sans_700Bold") }]}>Main Wallet</Text>
          </View>
        </View>
        
        <View style={styles.balanceContent}>
          <Text style={[styles.balanceValue, { fontFamily: getFont("Syne_700Bold") }]}>$2,480.50 <Text style={styles.currencySub}>USDC</Text></Text>
          <Text style={[styles.kesValue, { fontFamily: getFont("JetBrainsMono_500Medium") }]}>≈ KES 319,584</Text>
        </View>

        <TouchableOpacity style={styles.fundButton}>
          <Text style={[styles.fundButtonText, { fontFamily: getFont("DM_Sans_700Bold") }]}>FUND WALLET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionGrid}>
        <QuickAction label="Payment" icon={<Smartphone color={theme.colors.primary} size={24} />} onPress={() => navigateTo("payment")} />
        <QuickAction label="Visa" icon={<CreditCard color={theme.colors.primary} size={24} />} onPress={() => navigateTo("visa")} />
        <QuickAction label="Send" icon={<SendIcon color={theme.colors.primary} size={24} />} onPress={() => navigateTo("payment")} />
        <QuickAction label="Swap" icon={<ArrowLeftRight color={theme.colors.primary} size={24} />} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { fontFamily: getFont("Syne_600SemiBold") }]}>RECENT ACTIVITY</Text>
        <TouchableOpacity><Text style={[styles.viewAll, { fontFamily: getFont("DM_Sans_700Bold") }]}>View All</Text></TouchableOpacity>
      </View>

      <ActivityItem title="Sent to Aisha M." sub="Via M-Pesa · 2h ago" amount="-$50.00" kes="KES 6,450" type="out" />
      <ActivityItem title="Wallet Top-up" sub="Direct Deposit · 5h ago" amount="+$200.00" kes="KES 25,800" type="in" />

      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <Text style={[styles.sectionTitle, { fontFamily: getFont("Syne_600SemiBold") }]}>EXCLUSIVE OFFERS</Text>
      </View>
      <View style={styles.offerCard}>
        <View style={styles.offerContent}>
          <Text style={[styles.offerTitle, { fontFamily: getFont("Syne_700Bold") }]}>Travel Insurance</Text>
          <Text style={[styles.offerSub, { fontFamily: getFont("DM_Sans_400Regular") }]}>Secure your trip to Nairobi with instant coverage in USDC.</Text>
        </View>
        <View style={styles.offerImagePlaceholder}>
           <Smartphone color="rgba(255,255,255,0.2)" size={40} />
        </View>
      </View>
    </ScrollView>
  );

  const renderVisa = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo("home")} style={styles.backButton}>
          <ChevronLeft color={theme.colors.primary} size={28} />
        </TouchableOpacity>
        <Text style={[styles.brandText, { fontFamily: getFont("Syne_700Bold") }]}>SafTap</Text>
        <TouchableOpacity><MoreVertical color={theme.colors.textSecondary} size={24} /></TouchableOpacity>
      </View>

      <LinearGradient colors={['#1F2937', '#111827']} style={styles.virtualCard}>
        <View style={styles.cardLogoRow}>
          <Text style={[styles.cardBrand, { fontFamily: getFont("Syne_700Bold") }]}>SafTap</Text>
          <Text style={[styles.cardType, { fontFamily: getFont("DM_Sans_700Bold") }]}>VIRTUAL DEBIT</Text>
          <View style={styles.visaIconPlaceholder}><Text style={styles.visaText}>VISA</Text></View>
        </View>
        <Text style={[styles.cardNumber, { fontFamily: getFont("JetBrainsMono_500Medium") }]}>••••  ••••  ••••  8824</Text>
        <View style={styles.cardDetailsRow}>
          <View><Text style={styles.cardLabel}>VALID THRU</Text><Text style={styles.cardValue}>09/28</Text></View>
          <View style={{ marginLeft: 40 }}><Text style={styles.cardLabel}>CVV</Text><Text style={styles.cardValue}>•••</Text></View>
        </View>
        <View style={styles.cardBottomRow}>
          <Text style={[styles.cardHolder, { fontFamily: getFont("Syne_600SemiBold") }]}>ALEX RIVERA</Text>
          <TouchableOpacity style={styles.nfcIcon}><Smartphone color={theme.colors.primary} size={18} /></TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.cardActionRow}>
        <TouchableOpacity style={styles.cardActionButton}><Snowflake color={theme.colors.primary} size={20} /><Text style={[styles.cardActionText, { fontFamily: getFont("DM_Sans_700Bold") }]}>Freeze Card</Text></TouchableOpacity>
        <TouchableOpacity style={styles.cardActionButton}><Eye color={theme.colors.primary} size={20} /><Text style={[styles.cardActionText, { fontFamily: getFont("DM_Sans_700Bold") }]}>View PIN</Text></TouchableOpacity>
      </View>

      <View style={styles.limitContainer}>
        <View style={styles.limitHeader}>
          <Text style={[styles.limitTitle, { fontFamily: getFont("Syne_600SemiBold") }]}>MONTHLY SPENDING LIMIT</Text>
          <Text style={[styles.limitValues, { fontFamily: getFont("JetBrainsMono_500Medium") }]}><Text style={{ color: theme.colors.primary }}>$4,250</Text> / $5,000</Text>
        </View>
        <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: '85%' }]} /></View>
        <Text style={styles.resetText}>Resetting in 12 days</Text>
      </View>

      <View style={styles.settingsGroup}>
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}><Globe color={theme.colors.primary} size={20} /></View>
          <View style={{ flex: 1 }}><Text style={[styles.settingTitle, { fontFamily: getFont("DM_Sans_700Bold") }]}>International Payments</Text><Text style={styles.settingSub}>Enable for foreign transactions</Text></View>
          <Switch value={intlPayments} onValueChange={setIntlPayments} trackColor={{ false: '#374151', true: theme.colors.primary }} thumbColor="#FFF" />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}><ShoppingBag color={theme.colors.primary} size={20} /></View>
          <View style={{ flex: 1 }}><Text style={[styles.settingTitle, { fontFamily: getFont("DM_Sans_700Bold") }]}>Online Purchases</Text><Text style={styles.settingSub}>Allow web and in-app payments</Text></View>
          <Switch value={onlinePurchases} onValueChange={setOnlinePurchases} trackColor={{ false: '#374151', true: theme.colors.primary }} thumbColor="#FFF" />
        </View>
      </View>
    </ScrollView>
  );

  const renderPayment = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo("home")} style={styles.backButton}>
          <ChevronLeft color={theme.colors.primary} size={28} />
        </TouchableOpacity>
        <Text style={[styles.brandText, { fontFamily: getFont("Syne_700Bold") }]}>SafTap</Text>
        <TouchableOpacity onPress={() => navigateTo("profile")} style={styles.avatarJO}>
          <Text style={[styles.avatarJOText, { fontFamily: getFont("Syne_700Bold") }]}>JO</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sendBalanceSection}>
        <Text style={[styles.labelCaps, { textAlign: 'center', marginBottom: 8, letterSpacing: 1.5 }]}>AVAILABLE BALANCE</Text>
        <View style={styles.kesBalanceRow}>
          <Text style={[styles.kesPrefix, { fontFamily: getFont("Syne_700Bold") }]}>KES </Text>
          <Text style={[styles.kesAmount, { fontFamily: getFont("Syne_700Bold") }]}>42,850.00</Text>
        </View>
        <View style={styles.percentBadge}><Text style={[styles.percentText, { fontFamily: getFont("JetBrainsMono_500Medium") }]}>↗ +2.4%</Text></View>
      </View>

      <View style={styles.serviceGrid}>
        <ServiceCard label="Send to M-Pesa" sub="Instant transfer" icon={<SendIcon color={theme.colors.onPrimary} size={22} />} active onPress={() => navigateTo("mpesa_send")} />
        <ServiceCard label="Pay Bill" sub="Utilities & services" icon={<FileText color={theme.colors.primary} size={22} />} onPress={() => navigateTo("paybill")} />
        <ServiceCard label="Buy Goods" sub="Till payments" icon={<ShoppingBag color={theme.colors.primary} size={22} />} onPress={() => navigateTo("buy_goods")} />
        <ServiceCard label="Request" sub="Get paid fast" icon={<Banknote color={theme.colors.primary} size={22} />} />
      </View>

      <View style={[styles.sectionHeader, { marginTop: 32 }]}>
        <Text style={[styles.sectionTitle, { fontFamily: getFont("Syne_600SemiBold"), color: '#FFF' }]}>Recent Payees</Text>
        <TouchableOpacity><Text style={[styles.viewAll, { fontFamily: getFont("DM_Sans_700Bold") }]}>VIEW ALL</Text></TouchableOpacity>
      </View>

      <View style={styles.payeeRow}>
         {[1,2,3,4].map(i => (
           <View key={i} style={styles.payeeAvatarContainer}><View style={styles.payeeAvatar}><User color={theme.colors.primary} size={28} /></View></View>
         ))}
      </View>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo("home")} style={styles.backButton}>
          <ChevronLeft color={theme.colors.primary} size={28} />
        </TouchableOpacity>
        <Text style={[styles.brandText, { fontFamily: getFont("Syne_700Bold") }]}>Profile</Text>
        <TouchableOpacity><Settings color={theme.colors.textSecondary} size={24} /></TouchableOpacity>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.profileAvatarLarge}>
          <Text style={[styles.profileAvatarTextLarge, { fontFamily: getFont("Syne_700Bold") }]}>JO</Text>
        </View>
        <Text style={[styles.profileName, { fontFamily: getFont("Syne_700Bold") }]}>James Oduya</Text>
        <Text style={[styles.profileEmail, { fontFamily: getFont("DM_Sans_400Regular") }]}>james.oduya@gmail.com</Text>
        <View style={styles.tierBadge}>
          <ShieldCheck size={14} color={theme.colors.primary} />
          <Text style={[styles.tierText, { fontFamily: getFont("DM_Sans_700Bold") }]}>Verified Member</Text>
        </View>
      </View>

      <View style={styles.walletAddressContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.labelCaps, { marginBottom: 4 }]}>WALLET ADDRESS</Text>
          <Text style={[styles.addressText, { fontFamily: getFont("JetBrainsMono_500Medium") }]}>0x7a2...4b9e</Text>
        </View>
        <TouchableOpacity style={styles.copyButton}>
          <Copy size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.menuGroup}>
        <MenuItem icon={<User size={22} color={theme.colors.primary} />} label="Personal Information" />
        <MenuItem icon={<ShieldCheck size={22} color={theme.colors.primary} />} label="Security & Privacy" />
        <MenuItem icon={<Bell size={22} color={theme.colors.primary} />} label="Notifications" />
        <MenuItem icon={<Headset size={22} color={theme.colors.primary} />} label="Help & Support" />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={22} color={theme.colors.accentRed} />
        <Text style={[styles.logoutText, { fontFamily: getFont("DM_Sans_700Bold") }]}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>SafTap Beta v0.1.0</Text>
    </ScrollView>
  );

  // --- NEW PAYMENT FORMS ---

  const renderMpesaSend = () => (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo("payment")} style={styles.backButton}>
            <ChevronLeft color={theme.colors.primary} size={28} />
          </TouchableOpacity>
          <Text style={[styles.brandText, { fontFamily: getFont("Syne_700Bold") }]}>Send to M-Pesa</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.label, { fontFamily: getFont("DM_Sans_400Regular") }]}>Recipient Phone Number</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={[styles.formInput, { fontFamily: getFont("JetBrainsMono_500Medium") }]} 
              placeholder="e.g. 0712345678" 
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Text style={[styles.label, { fontFamily: getFont("DM_Sans_400Regular"), marginTop: 24 }]}>Amount (KES)</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={[styles.formInput, { fontFamily: getFont("JetBrainsMono_500Medium") }]} 
              placeholder="0.00" 
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, (!phoneNumber || !amount) && styles.buttonDisabled]} 
            disabled={!phoneNumber || !amount || isProcessing}
            onPress={handlePayment}
          >
            {isProcessing ? <ActivityIndicator color={theme.colors.onPrimary} /> : <Text style={[styles.primaryButtonText, { fontFamily: getFont("DM_Sans_700Bold") }]}>Make Payment</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderPayBill = () => (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo("payment")} style={styles.backButton}>
            <ChevronLeft color={theme.colors.primary} size={28} />
          </TouchableOpacity>
          <Text style={[styles.brandText, { fontFamily: getFont("Syne_700Bold") }]}>Pay Bill</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.label, { fontFamily: getFont("DM_Sans_400Regular") }]}>Business Number</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={[styles.formInput, { fontFamily: getFont("JetBrainsMono_500Medium") }]} 
              placeholder="e.g. 888888" 
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={bizNumber}
              onChangeText={setBizNumber}
            />
          </View>

          <Text style={[styles.label, { fontFamily: getFont("DM_Sans_400Regular"), marginTop: 24 }]}>Account Number</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={[styles.formInput, { fontFamily: getFont("JetBrainsMono_500Medium") }]} 
              placeholder="e.g. ACC-123" 
              placeholderTextColor={theme.colors.textSecondary}
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>

          <Text style={[styles.label, { fontFamily: getFont("DM_Sans_400Regular"), marginTop: 24 }]}>Amount (KES)</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={[styles.formInput, { fontFamily: getFont("JetBrainsMono_500Medium") }]} 
              placeholder="0.00" 
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, (!bizNumber || !accountNumber || !amount) && styles.buttonDisabled]} 
            disabled={!bizNumber || !accountNumber || !amount || isProcessing}
            onPress={handlePayment}
          >
            {isProcessing ? <ActivityIndicator color={theme.colors.onPrimary} /> : <Text style={[styles.primaryButtonText, { fontFamily: getFont("DM_Sans_700Bold") }]}>Make Payment</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderBuyGoods = () => (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
      <ScrollView contentContainerStyle={styles.scrollPadding}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo("payment")} style={styles.backButton}>
            <ChevronLeft color={theme.colors.primary} size={28} />
          </TouchableOpacity>
          <Text style={[styles.brandText, { fontFamily: getFont("Syne_700Bold") }]}>Buy Goods</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.label, { fontFamily: getFont("DM_Sans_400Regular") }]}>Till Number</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={[styles.formInput, { fontFamily: getFont("JetBrainsMono_500Medium") }]} 
              placeholder="e.g. 123456" 
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={tillNumber}
              onChangeText={setTillNumber}
            />
          </View>

          <Text style={[styles.label, { fontFamily: getFont("DM_Sans_400Regular"), marginTop: 24 }]}>Amount (KES)</Text>
          <View style={styles.inputBox}>
            <TextInput 
              style={[styles.formInput, { fontFamily: getFont("JetBrainsMono_500Medium") }]} 
              placeholder="0.00" 
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, (!tillNumber || !amount) && styles.buttonDisabled]} 
            disabled={!tillNumber || !amount || isProcessing}
            onPress={handlePayment}
          >
            {isProcessing ? <ActivityIndicator color={theme.colors.onPrimary} /> : <Text style={[styles.primaryButtonText, { fontFamily: getFont("DM_Sans_700Bold") }]}>Make Payment</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderSuccess = () => (
    <View style={[styles.flex, styles.centered, { padding: 40 }]}>
      <CheckCircle2 size={80} color={theme.colors.primary} style={{ marginBottom: 24 }} />
      <Text style={[styles.successTitle, { fontFamily: getFont("Syne_700Bold") }]}>Payment Successful</Text>
      <Text style={[styles.successSub, { fontFamily: getFont("DM_Sans_400Regular") }]}>Your SafTap payment has been processed and settled instantly.</Text>
      <TouchableOpacity 
        style={[styles.primaryButton, { width: '100%', marginTop: 40 }]} 
        onPress={() => {
          setAmount(""); setPhoneNumber(""); setBizNumber(""); setAccountNumber(""); setTillNumber("");
          navigateTo("payment");
        }}
      >
        <Text style={[styles.primaryButtonText, { fontFamily: getFont("DM_Sans_700Bold") }]}>Back to Payments</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        {activeTab === "home" && renderHome()}
        {activeTab === "visa" && renderVisa()}
        {activeTab === "payment" && renderPayment()}
        {activeTab === "profile" && renderProfile()}
        {activeTab === "mpesa_send" && renderMpesaSend()}
        {activeTab === "paybill" && renderPayBill()}
        {activeTab === "buy_goods" && renderBuyGoods()}
        {activeTab === "success" && renderSuccess()}
      </View>

      {/* Bottom Nav */}
      {!["mpesa_send", "paybill", "buy_goods", "success"].includes(activeTab) && (
        <View style={styles.bottomNav}>
          <TabButton icon={<Home size={24} />} label="Home" active={activeTab === "home"} onPress={() => navigateTo("home")} />
          
          {activeTab === "payment" ? (
             <TouchableOpacity style={styles.sendButtonActive} onPress={() => navigateTo("payment")}>
               <SendIcon size={24} color={theme.colors.onPrimary} />
               <Text style={[styles.tabLabelActive, { fontFamily: getFont("DM_Sans_700Bold") }]}>Send</Text>
             </TouchableOpacity>
          ) : (
            <TabButton icon={<Wallet size={24} />} label="Payment" active={activeTab === "payment"} onPress={() => navigateTo("payment")} />
          )}

          <TabButton icon={<CreditCard size={24} />} label="Visa" active={activeTab === "visa"} onPress={() => navigateTo("visa")} />
          <TabButton icon={<User size={24} />} label="Profile" active={activeTab === "profile"} onPress={() => navigateTo("profile")} />
        </View>
      )}
    </SafeAreaView>
  );
}

// --- SUB-COMPONENTS ---

const MenuItem = ({ icon, label }: any) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuIconBox}>{icon}</View>
    <Text style={styles.menuLabel}>{label}</Text>
    <ChevronRight size={20} color={theme.colors.textSecondary} />
  </TouchableOpacity>
);

const QuickAction = ({ label, icon, onPress }: any) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={styles.actionIconBox}>{icon}</View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const ActivityItem = ({ title, sub, amount, kes, type }: any) => (
  <View style={styles.listItem}>
    <View style={[styles.listIconBox, { backgroundColor: type === 'in' ? 'rgba(58, 223, 171, 0.1)' : 'rgba(248, 113, 113, 0.1)' }]}>
      {type === 'in' ? <ArrowDownLeft color={theme.colors.primary} size={20} /> : <ArrowUpRight color={theme.colors.accentRed} size={20} />}
    </View>
    <View style={{ flex: 1 }}><Text style={styles.listTitle}>{title}</Text><Text style={styles.listSub}>{sub}</Text></View>
    <View style={{ alignItems: 'flex-end' }}><Text style={[styles.listAmount, { color: type === 'in' ? theme.colors.primary : '#F87171' }]}>{amount}</Text><Text style={styles.listKes}>{kes}</Text></View>
  </View>
);

const ServiceCard = ({ label, sub, icon, active, onPress }: any) => (
  <TouchableOpacity style={[styles.serviceCard, active && { backgroundColor: theme.colors.surfaceLight }]} onPress={onPress}>
    <View style={[styles.serviceIconBox, active && { backgroundColor: theme.colors.primary }]}>{icon}</View>
    <Text style={styles.serviceLabel}>{label}</Text><Text style={styles.serviceSub}>{sub}</Text>
  </TouchableOpacity>
);

const TabButton = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity style={styles.tabButton} onPress={onPress}>
    <View style={[styles.tabIndicator, active && styles.tabIndicatorActive]}>{React.cloneElement(icon, { color: active ? theme.colors.onPrimary : theme.colors.textSecondary })}</View>
    <Text style={[styles.tabLabel, active && { color: theme.colors.primary }]}>{label}</Text>
  </TouchableOpacity>
);

// --- STYLES ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  flex: { flex: 1 },
  centered: { justifyContent: "center", alignItems: "center" },
  scrollPadding: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24, marginTop: 10 },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  brandText: { fontSize: 20, color: '#FFF' },
  avatarJO: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.primary, alignItems: "center", justifyContent: "center" },
  avatarJOText: { color: theme.colors.onPrimary, fontSize: 14 },
  
  // Balance Card
  balanceCard: { backgroundColor: '#111827', borderRadius: 24, padding: 24, position: 'relative', overflow: 'hidden' },
  balanceHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  labelCaps: { fontSize: 10, color: theme.colors.textSecondary, letterSpacing: 1 },
  mainWalletBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#064E3B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.primary, marginRight: 6 },
  badgeTextSmall: { fontSize: 10, color: '#FFF' },
  balanceContent: { marginBottom: 20 },
  balanceValue: { fontSize: 34, color: '#FFF' },
  currencySub: { fontSize: 16, color: theme.colors.textSecondary },
  kesValue: { fontSize: 18, color: theme.colors.primary },
  fundButton: { backgroundColor: theme.colors.primary, alignSelf: 'flex-end', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  fundButtonText: { fontSize: 12, color: theme.colors.onPrimary },
  
  // Payment Screen Styles
  sendBalanceSection: { alignItems: 'center', marginVertical: 32 },
  kesBalanceRow: { flexDirection: 'row', alignItems: 'baseline' },
  kesPrefix: { fontSize: 24, color: theme.colors.primary },
  kesAmount: { fontSize: 36, color: '#FFF' },
  percentBadge: { backgroundColor: 'rgba(58, 223, 171, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 12 },
  percentText: { color: theme.colors.primary, fontSize: 12 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between' },
  serviceCard: { width: (width - 56) / 2, backgroundColor: '#111827', padding: 20, borderRadius: 24 },
  serviceIconBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  serviceLabel: { color: '#FFF', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  serviceSub: { color: theme.colors.textSecondary, fontSize: 11 },
  payeeRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  payeeAvatarContainer: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: theme.colors.primary, padding: 2 },
  payeeAvatar: { flex: 1, backgroundColor: '#1F2937', borderRadius: 30, alignItems: 'center', justifyContent: 'center' },

  // Quick Actions
  actionGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 },
  actionItem: { alignItems: 'center', flex: 1 },
  actionIconBox: { width: 60, height: 60, borderRadius: 18, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  actionLabel: { fontSize: 12, color: '#FFF' },

  // List
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, marginBottom: 16 },
  sectionTitle: { fontSize: 14, color: theme.colors.textSecondary },
  viewAll: { fontSize: 12, color: theme.colors.primary, textTransform: 'uppercase' },
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', padding: 16, borderRadius: 20, marginBottom: 12 },
  listIconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  listTitle: { fontSize: 16, color: '#FFF', marginBottom: 4 },
  listSub: { fontSize: 12, color: theme.colors.textSecondary },
  listAmount: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  listKes: { fontSize: 12, color: theme.colors.textSecondary },

  // Offers
  offerCard: { backgroundColor: '#111827', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center' },
  offerContent: { flex: 1, marginRight: 16 },
  offerTitle: { fontSize: 18, color: '#FFF', marginBottom: 8 },
  offerSub: { fontSize: 13, color: theme.colors.textSecondary, lineHeight: 18 },
  offerImagePlaceholder: { width: 80, height: 80, borderRadius: 16, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center' },

  // Visa Screen
  virtualCard: { padding: 24, borderRadius: 28, height: 220, justifyContent: 'space-between' },
  cardLogoRow: { flexDirection: 'row', alignItems: 'center' },
  cardBrand: { fontSize: 24, color: theme.colors.primary, marginRight: 10 },
  cardType: { fontSize: 10, color: '#FFF', flex: 1, opacity: 0.8 },
  visaIconPlaceholder: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 4 },
  visaText: { color: '#FFF', fontSize: 12, fontWeight: '900', fontStyle: 'italic' },
  cardNumber: { fontSize: 20, color: '#FFF', letterSpacing: 2 },
  cardDetailsRow: { flexDirection: 'row' },
  cardLabel: { fontSize: 8, color: theme.colors.textSecondary, marginBottom: 4 },
  cardValue: { fontSize: 12, color: '#FFF' },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardHolder: { fontSize: 16, color: '#FFF' },
  nfcIcon: { padding: 8, backgroundColor: 'rgba(58, 223, 171, 0.1)', borderRadius: 20 },
  cardActionRow: { flexDirection: 'row', gap: 16, marginTop: 24 },
  cardActionButton: { flex: 1, height: 56, backgroundColor: '#111827', borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  cardActionText: { color: '#FFF', fontSize: 14 },
  limitContainer: { backgroundColor: '#111827', padding: 20, borderRadius: 24, marginTop: 24 },
  limitHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  limitTitle: { fontSize: 10, color: theme.colors.textSecondary },
  limitValues: { fontSize: 14, color: '#FFF' },
  progressBarBg: { height: 6, backgroundColor: '#1F2937', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: theme.colors.primary },
  resetText: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 12 },
  settingsGroup: { marginTop: 24, gap: 12 },
  settingItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', padding: 16, borderRadius: 20, gap: 16 },
  settingIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center' },
  settingTitle: { fontSize: 14, color: '#FFF', marginBottom: 4 },
  settingSub: { fontSize: 11, color: theme.colors.textSecondary },
  
  // Profile Styles
  profileHeader: { alignItems: 'center', marginVertical: 32 },
  profileAvatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 4, borderColor: 'rgba(58, 223, 171, 0.1)' },
  profileAvatarTextLarge: { fontSize: 36, color: theme.colors.onPrimary },
  profileName: { fontSize: 24, color: '#FFF', marginBottom: 4 },
  profileEmail: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 16 },
  tierBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(58, 223, 171, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
  tierText: { color: theme.colors.primary, fontSize: 12 },
  walletAddressContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', padding: 20, borderRadius: 24, marginBottom: 24 },
  addressText: { color: '#FFF', fontSize: 16 },
  copyButton: { padding: 8, backgroundColor: '#1F2937', borderRadius: 12 },
  menuGroup: { gap: 12, marginBottom: 32 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', padding: 18, borderRadius: 20, gap: 16 },
  menuIconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#1F2937', alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, color: '#FFF', fontSize: 15 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 18, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(248, 113, 113, 0.2)' },
  logoutText: { color: theme.colors.accentRed, fontSize: 16 },
  versionText: { textAlign: 'center', color: theme.colors.textSecondary, fontSize: 12, marginTop: 24 },

  // New Form Styles
  formContainer: { marginTop: 20 },
  label: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 12 },
  inputBox: { backgroundColor: '#111827', borderRadius: 16, paddingHorizontal: 16, height: 60, justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  formInput: { fontSize: 18, color: '#FFF' },
  primaryButton: { backgroundColor: theme.colors.primary, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  primaryButtonText: { color: theme.colors.onPrimary, fontSize: 16, fontWeight: '700' },
  buttonDisabled: { opacity: 0.5 },
  successTitle: { fontSize: 24, color: '#FFF', marginBottom: 8 },
  successSub: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', lineHeight: 20 },

  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, backgroundColor: '#08111D', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabIndicator: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  tabIndicatorActive: { backgroundColor: theme.colors.primary },
  tabLabel: { fontSize: 10, color: theme.colors.textSecondary },
  sendButtonActive: { width: 70, height: 70, borderRadius: 35, backgroundColor: theme.colors.primary, marginTop: -40, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#050D17', shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  tabLabelActive: { fontSize: 12, color: theme.colors.onPrimary, marginTop: 4 },
});

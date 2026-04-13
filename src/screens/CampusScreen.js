import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../theme';

export default function CampusScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>My<Text style={styles.logoAccent}>Mustang</Text></Text>
        <Text style={styles.headerSub}>Campus Map</Text>
      </View>
      <WebView
        source={{ uri: 'https://experience.arcgis.com/experience/5d3c7ce97866487eac63664dff9fb946' }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading campus map...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  logo: { fontSize: 20, fontWeight: '700', color: '#2C5F2E' },
  logoAccent: { color: '#C8A84B' },
  headerSub: { fontSize: 13, color: colors.textSecondary },
  webview: { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontSize: 14, color: colors.textSecondary },
});
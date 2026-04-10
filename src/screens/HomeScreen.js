import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { spots, CATEGORIES } from '../data/spots';
import { colors } from '../theme';

function starsString(n) {
  const full = Math.round(n);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function FeaturedCard({ spot, onPress }) {
  const cardColors = ['#FFF3E0', '#E8F5E9', '#E3F2FD', '#FCE4EC'];
  const idx = spots.indexOf(spot) % cardColors.length;
  return (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.featuredCardImg, { backgroundColor: cardColors[idx] }]}>
        <Text style={styles.featuredEmoji}>{spot.emoji}</Text>
      </View>
      <View style={styles.featuredCardBody}>
        <Text style={styles.featuredCardName} numberOfLines={1}>{spot.name}</Text>
        <Text style={styles.featuredCardMeta} numberOfLines={1}>{spot.tag.split(' · ')[1]}</Text>
        <View style={styles.row}>
          <Text style={styles.stars}>{starsString(spot.rating)}</Text>
          <Text style={styles.ratingNum}>{spot.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({spot.reviews.length})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function SpotListItem({ spot, onPress }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.listEmoji}>
        <Text style={styles.listEmojiText}>{spot.emoji}</Text>
      </View>
      <View style={styles.listInfo}>
        <Text style={styles.listName}>{spot.name}</Text>
        <Text style={styles.listSub} numberOfLines={1}>{spot.tag}</Text>
      </View>
      <View style={styles.listRight}>
        <Text style={styles.starBadge}>★ {spot.rating.toFixed(1)}</Text>
        <View style={[styles.badge, spot.open ? styles.badgeOpen : styles.badgeClosed]}>
          <Text style={[styles.badgeText, { color: spot.open ? colors.openGreen : colors.closedRed }]}>
            {spot.open ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const featured = useMemo(() =>
    [...spots].sort((a, b) => b.rating - a.rating).slice(0, 4), []);

  const filtered = useMemo(() =>
    spots.filter(s => {
      const matchTab = activeTab === 'All' || s.category === activeTab;
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tag.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    }), [activeTab, search]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>Mustang<Text style={styles.logoAccent}>Meals</Text></Text>
          <View style={styles.avatar}><Text style={styles.avatarText}>MG</Text></View>
        </View>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search campus spots..."
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer} contentContainerStyle={styles.tabsContent}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat} style={[styles.tab, activeTab === cat && styles.tabActive]} onPress={() => setActiveTab(cat)} activeOpacity={0.8}>
            <Text style={[styles.tabText, activeTab === cat && styles.tabTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'All' && search === '' && (
          <>
            <Text style={styles.sectionLabel}>TOP RATED</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
              {featured.map(spot => (
                <FeaturedCard key={spot.id} spot={spot} onPress={() => navigation.navigate('Detail', { spotId: spot.id })} />
              ))}
            </ScrollView>
          </>
        )}
        <Text style={styles.sectionLabel}>ALL SPOTS</Text>
        <View style={styles.list}>
          {filtered.map(spot => (
            <SpotListItem key={spot.id} spot={spot} onPress={() => navigation.navigate('Detail', { spotId: spot.id })} />
          ))}
          {filtered.length === 0 && <Text style={styles.emptyText}>No spots found</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  logo: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, letterSpacing: -0.5 },
  logoAccent: { color: colors.primary },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 13, fontWeight: '600' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 0.5, borderColor: colors.border },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary },
  tabsContainer: { maxHeight: 44 },
  tabsContent: { paddingHorizontal: 20, paddingVertical: 6 },
  tab: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 0.5, borderColor: colors.border, marginRight: 8 },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { fontSize: 13, color: colors.textSecondary },
  tabTextActive: { color: colors.white, fontWeight: '600' },
  sectionLabel: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10, fontSize: 11, fontWeight: '600', color: colors.textTertiary, letterSpacing: 0.8 },
  featuredScroll: { paddingHorizontal: 20 },
  featuredCard: { width: 180, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden', marginRight: 12 },
  featuredCardImg: { height: 90, alignItems: 'center', justifyContent: 'center' },
  featuredEmoji: { fontSize: 36 },
  featuredCardBody: { padding: 12 },
  featuredCardName: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  featuredCardMeta: { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stars: { color: colors.star, fontSize: 12 },
  ratingNum: { fontSize: 12, fontWeight: '600', color: colors.textPrimary },
  ratingCount: { fontSize: 11, color: colors.textTertiary },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: colors.border, gap: 12 },
  listEmoji: { width: 46, height: 46, borderRadius: 12, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  listEmojiText: { fontSize: 22 },
  listInfo: { flex: 1 },
  listName: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  listSub: { fontSize: 12, color: colors.textSecondary },
  listRight: { alignItems: 'flex-end', gap: 4 },
  starBadge: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  badgeOpen: { backgroundColor: colors.openGreenBg },
  badgeClosed: { backgroundColor: colors.closedRedBg },
  badgeText: { fontSize: 11, fontWeight: '500' },
  emptyText: { textAlign: 'center', color: colors.textTertiary, paddingVertical: 40, fontSize: 15 },
});
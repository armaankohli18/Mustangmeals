import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors } from '../theme';

const MY_POSTS = [
  { id: 1, text: 'Finals week survival tip: the 24hr study room in Kennedy Library is actually goated 🙏', likes: 24 },
  { id: 2, text: 'Anyone else think the new Panda Express in VG slaps harder than the one in UU?', likes: 38 },
];

const MY_REVIEWS = [
  { id: 1, emoji: '🍳', name: 'Brunch — Vista Grande', stars: 4 },
  { id: 2, emoji: '☕', name: 'Poly Espresso', stars: 5 },
  { id: 3, emoji: '🥡', name: 'Panda Express', stars: 4 },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>My<Text style={styles.logoAccent}>Mustang</Text></Text>
        <Text style={styles.settingsBtn}>⚙️</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
          <Text style={styles.name}>Armaan Kohli</Text>
          <Text style={styles.major}>Computer Science · Class of 2027</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>24</Text>
              <Text style={styles.statLbl}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>312</Text>
              <Text style={styles.statLbl}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>189</Text>
              <Text style={styles.statLbl}>Followers</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENT POSTS</Text>
          {MY_POSTS.map(post => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postText}>{post.text}</Text>
              <Text style={styles.postLikes}>❤️ {post.likes}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MY REVIEWS</Text>
          {MY_REVIEWS.map(review => (
            <View key={review.id} style={styles.reviewRow}>
              <Text style={styles.reviewEmoji}>{review.emoji}</Text>
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text style={styles.reviewStars}>{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  logo: { fontSize: 20, fontWeight: '700', color: '#2C5F2E' },
  logoAccent: { color: '#C8A84B' },
  settingsBtn: { fontSize: 20 },
  profileHero: { alignItems: 'center', padding: 24, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#2C5F2E', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { color: 'white', fontSize: 26, fontWeight: '600' },
  name: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  major: { fontSize: 13, color: colors.textSecondary, marginBottom: 14 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  statLbl: { fontSize: 11, color: colors.textTertiary },
  statDivider: { width: 0.5, height: 30, backgroundColor: colors.border },
  editBtn: { borderWidth: 0.5, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 24, paddingVertical: 7 },
  editBtnText: { fontSize: 13, fontWeight: '500', color: colors.textPrimary },
  section: { padding: 20, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  sectionTitle: { fontSize: 11, fontWeight: '600', color: colors.textTertiary, letterSpacing: 0.8, marginBottom: 12 },
  postCard: { backgroundColor: colors.surface, borderRadius: 10, padding: 12, marginBottom: 8, borderWidth: 0.5, borderColor: colors.border },
  postText: { fontSize: 13, color: colors.textPrimary, lineHeight: 18, marginBottom: 6 },
  postLikes: { fontSize: 12, color: colors.textSecondary },
  reviewRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  reviewEmoji: { fontSize: 22 },
  reviewInfo: { flex: 1 },
  reviewName: { fontSize: 13, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  reviewStars: { fontSize: 12, color: '#F0A500' },
});
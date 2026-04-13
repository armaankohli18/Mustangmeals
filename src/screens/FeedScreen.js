import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { colors } from '../theme';

const POSTS = [
  { id: 1, user: 'Armaan K.', tag: '#CENG', avatar: '🧑', time: '2 min ago', text: 'Finals week survival tip: the 24hr study room in Kennedy Library is actually goated. Way less crowded than the main floor 🙏', likes: 24, comments: 8, anon: false },
  { id: 2, user: 'Anonymous', tag: '', avatar: '👤', time: '15 min ago', text: "Confession: I've been eating at Vista Grande every single day for 3 years and honestly it's not even that bad anymore 😭", likes: 142, comments: 31, anon: true },
  { id: 3, user: 'Sarah M.', tag: '#CAFES', avatar: '👩', time: '1 hr ago', text: 'The view from the ag fields this morning was unreal 🌅', likes: 89, comments: 12, anon: false },
  { id: 4, user: 'Marcus T.', tag: '#CSC', avatar: '👨', time: '2 hr ago', text: 'Just got my internship offer from Google 🎉 Grind pays off Mustangs!!', likes: 312, comments: 45, anon: false },
  { id: 5, user: 'Anonymous', tag: '', avatar: '👤', time: '3 hr ago', text: 'Hot take: the Engineering West building bathrooms are actually better than the ones in the Business building', likes: 67, comments: 19, anon: true },
];

const EVENTS = [
  { id: 1, title: 'Cal Poly Open House', date: 'Apr 19', location: 'Main Campus' },
  { id: 2, title: 'Farmers Market', date: 'Apr 17', location: 'Dexter Lawn' },
  { id: 3, title: 'Engineering Expo', date: 'Apr 24', location: 'Rec Center' },
];

const STORIES = ['🏈', '🎓', '🌿', '🎨', '💻', '🏐'];
const STORY_NAMES = ['Athletics', 'CENG', 'CAFES', 'CAED', 'CSC', 'Sports'];

export default function FeedScreen() {
  const [likes, setLikes] = useState({});
  const [postText, setPostText] = useState('');
  const [isAnon, setIsAnon] = useState(false);

  function toggleLike(id) {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>My<Text style={styles.logoAccent}>Mustang</Text></Text>
        <View style={styles.headerActions}>
          <Text style={styles.headerBtn}>🔔</Text>
          <Text style={styles.headerBtn}>✉️</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesContent} style={styles.stories}>
          <View style={styles.story}>
            <View style={[styles.storyRing, { backgroundColor: colors.surface }]}>
              <Text style={styles.storyEmoji}>➕</Text>
            </View>
            <Text style={styles.storyName}>Your story</Text>
          </View>
          {STORIES.map((emoji, i) => (
            <View key={i} style={styles.story}>
              <View style={styles.storyRing}>
                <Text style={styles.storyEmoji}>{emoji}</Text>
              </View>
              <Text style={styles.storyName}>{STORY_NAMES[i]}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Compose */}
        <View style={styles.composeBar}>
          <View style={styles.composeAvatar}><Text style={styles.composeAvatarText}>AK</Text></View>
          <TextInput
            style={styles.composeInput}
            placeholder="What's happening on campus?"
            placeholderTextColor={colors.textTertiary}
            value={postText}
            onChangeText={setPostText}
          />
          <TouchableOpacity
            style={[styles.anonBtn, isAnon && styles.anonBtnActive]}
            onPress={() => setIsAnon(!isAnon)}
          >
            <Text style={[styles.anonBtnText, isAnon && styles.anonBtnTextActive]}>Anon</Text>
          </TouchableOpacity>
        </View>

        {/* Events */}
        <Text style={styles.sectionLabel}>UPCOMING EVENTS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventsContent}>
          {EVENTS.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
              </View>
              <Text style={styles.eventLocation}>📍 {event.location}</Text>
              <TouchableOpacity style={styles.eventBtn}>
                <Text style={styles.eventBtnText}>Going</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Posts */}
        <Text style={styles.sectionLabel}>RECENT POSTS</Text>
        {POSTS.map(post => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              <Text style={styles.postAvatar}>{post.avatar}</Text>
              <View style={styles.postMeta}>
                <View style={styles.postUserRow}>
                  <Text style={styles.postUser}>{post.user}</Text>
                  {post.anon && <View style={styles.anonBadge}><Text style={styles.anonBadgeText}>anon</Text></View>}
                  {post.tag ? <Text style={styles.postTag}>{post.tag}</Text> : null}
                </View>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction} onPress={() => toggleLike(post.id)}>
                <Text style={[styles.postActionText, likes[post.id] && styles.likedText]}>
                  {likes[post.id] ? '❤️' : '🤍'} {post.likes + (likes[post.id] ? 1 : 0)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Text style={styles.postActionText}>💬 {post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Text style={styles.postActionText}>↗️ Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  logo: { fontSize: 20, fontWeight: '700', color: '#2C5F2E' },
  logoAccent: { color: '#C8A84B' },
  headerActions: { flexDirection: 'row', gap: 14 },
  headerBtn: { fontSize: 18 },
  stories: { borderBottomWidth: 0.5, borderBottomColor: colors.border },
  storiesContent: { paddingHorizontal: 20, paddingVertical: 12, gap: 14 },
  story: { alignItems: 'center', gap: 4 },
  storyRing: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#2C5F2E', padding: 2, alignItems: 'center', justifyContent: 'center' },
  storyEmoji: { fontSize: 26 },
  storyName: { fontSize: 10, color: colors.textSecondary },
  composeBar: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, paddingHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  composeAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2C5F2E', alignItems: 'center', justifyContent: 'center' },
  composeAvatarText: { color: 'white', fontSize: 12, fontWeight: '600' },
  composeInput: { flex: 1, backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, fontSize: 13, color: colors.textPrimary, borderWidth: 0.5, borderColor: colors.border },
  anonBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, borderWidth: 0.5, borderColor: colors.border },
  anonBtnActive: { backgroundColor: '#2C5F2E', borderColor: '#2C5F2E' },
  anonBtnText: { fontSize: 11, color: colors.textSecondary },
  anonBtnTextActive: { color: 'white' },
  sectionLabel: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8, fontSize: 11, fontWeight: '600', color: colors.textTertiary, letterSpacing: 0.8 },
  eventsContent: { paddingHorizontal: 20, gap: 12, paddingBottom: 4 },
  eventCard: { width: 200, backgroundColor: colors.surface, borderRadius: 14, padding: 14, borderWidth: 0.5, borderColor: colors.border },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  eventTitle: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, flex: 1, marginRight: 8 },
  eventDate: { fontSize: 11, color: '#2C5F2E', fontWeight: '600' },
  eventLocation: { fontSize: 12, color: colors.textSecondary, marginBottom: 8 },
  eventBtn: { backgroundColor: '#2C5F2E', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 14, alignSelf: 'flex-start' },
  eventBtnText: { color: 'white', fontSize: 12, fontWeight: '500' },
  post: { padding: 16, paddingHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  postAvatar: { fontSize: 28 },
  postMeta: { flex: 1 },
  postUserRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  postUser: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  postTag: { fontSize: 12, color: '#2C5F2E', fontWeight: '500' },
  postTime: { fontSize: 11, color: colors.textTertiary, marginTop: 1 },
  anonBadge: { backgroundColor: colors.surface, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8 },
  anonBadgeText: { fontSize: 10, color: colors.textSecondary },
  postText: { fontSize: 14, color: colors.textPrimary, lineHeight: 20, marginBottom: 10 },
  postActions: { flexDirection: 'row', gap: 16 },
  postAction: { padding: 2 },
  postActionText: { fontSize: 13, color: colors.textSecondary },
  likedText: { color: '#e74c3c' },
});
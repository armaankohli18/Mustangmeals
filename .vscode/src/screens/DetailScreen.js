import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { spots } from '../data/spots';
import { colors } from '../theme';

function ReviewCard({ review }) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewTop}>
        <Text style={styles.reviewer}>{review.user}</Text>
        <Text style={styles.reviewStars}>
          {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
        </Text>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      <Text style={styles.reviewDate}>{review.date}</Text>
    </View>
  );
}

export default function DetailScreen({ route, navigation }) {
  const { spotId } = route.params;
  const spot = spots.find(s => s.id === spotId);

  if (!spot) {
    return <SafeAreaView style={styles.container}><Text>Spot not found</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{spot.name}</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{spot.emoji}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.spotName}>{spot.name}</Text>
          <Text style={styles.spotTag}>{spot.tag}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{spot.rating.toFixed(1)} ★</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>{spot.reviews.length}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={[styles.statVal, { color: spot.open ? colors.openGreen : colors.closedRed }]}>
                {spot.open ? 'Open' : 'Closed'}
              </Text>
              <Text style={styles.statLabel}>{spot.hours}</Text>
            </View>
          </View>
        </View>
        <View style={styles.writeReviewSection}>
          <TouchableOpacity style={styles.writeReviewBtn} onPress={() => navigation.navigate('WriteReview', { spotId: spot.id })} activeOpacity={0.8}>
            <Text style={styles.writeReviewBtnText}>★  Write a Review</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
          {spot.reviews.length === 0
            ? <Text style={styles.noReviews}>No reviews yet. Be the first!</Text>
            : spot.reviews.map((review, index) => <ReviewCard key={index} review={review} />)
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  backBtn: { width: 60 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, flex: 1, textAlign: 'center' },
  hero: { height: 150, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  heroEmoji: { fontSize: 64 },
  infoSection: { padding: 20, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  spotName: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  spotTag: { fontSize: 14, color: colors.textSecondary, marginBottom: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  statLabel: { fontSize: 11, color: colors.textTertiary },
  statDivider: { width: 0.5, height: 36, backgroundColor: colors.border },
  writeReviewSection: { padding: 20, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  writeReviewBtn: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  writeReviewBtnText: { color: colors.white, fontSize: 15, fontWeight: '600' },
  reviewsSection: { padding: 20, paddingBottom: 40 },
  reviewsTitle: { fontSize: 17, fontWeight: '700', color: colors.textPrimary, marginBottom: 14 },
  reviewCard: { backgroundColor: colors.surface, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: colors.border },
  reviewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  reviewer: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  reviewStars: { fontSize: 13, color: colors.star },
  reviewText: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  reviewDate: { fontSize: 11, color: colors.textTertiary, marginTop: 6 },
  noReviews: { textAlign: 'center', color: colors.textTertiary, paddingVertical: 30, fontSize: 14 },
});
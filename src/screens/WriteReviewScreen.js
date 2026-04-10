import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { spots } from '../data/spots';
import { colors } from '../theme';

function StepPickHall({ onSelect }) {
  const diningHalls = spots.filter(s => s.category === 'Dining Hall');
  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.stepHeading}>Where did you eat?</Text>
      <Text style={styles.stepSub}>Choose a dining hall</Text>
      {diningHalls.map(hall => (
        <TouchableOpacity key={hall.id} style={styles.hallCard} onPress={() => onSelect(hall)} activeOpacity={0.8}>
          <Text style={styles.hallEmoji}>{hall.emoji}</Text>
          <View style={styles.hallInfo}>
            <Text style={styles.hallName}>{hall.name}</Text>
            <Text style={styles.hallTag}>{hall.tag}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function StepPickStation({ hall, onSelect }) {
  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.stepHeading}>Which station?</Text>
      <Text style={styles.stepSub}>{hall.name}</Text>
      {hall.stations.map(station => (
        <TouchableOpacity key={station.id} style={styles.stationCard} onPress={() => onSelect(station)} activeOpacity={0.8}>
          <Text style={styles.stationEmoji}>{station.emoji}</Text>
          <Text style={styles.stationName}>{station.name}</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function StepWriteReview({ hall, station, onSubmit }) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Amazing!'];

  function handleSubmit() {
    if (selectedStars === 0) {
      Alert.alert('Missing rating', 'Please select a star rating.');
      return;
    }
    if (reviewText.trim().length < 5) {
      Alert.alert('Too short', 'Please write at least a few words.');
      return;
    }
    onSubmit({ stars: selectedStars, text: reviewText.trim() });
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.stepContainer}>
        <View style={styles.selectedSummary}>
          <Text style={styles.selectedEmoji}>{station.emoji}</Text>
          <View>
            <Text style={styles.selectedStation}>{station.name}</Text>
            <Text style={styles.selectedHall}>{hall.name}</Text>
          </View>
        </View>
        <Text style={styles.sectionLabel}>YOUR RATING</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map(n => (
            <TouchableOpacity key={n} onPress={() => setSelectedStars(n)} activeOpacity={0.7}>
              <Text style={[styles.star, n <= selectedStars && styles.starLit]}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedStars > 0 && <Text style={styles.ratingLabel}>{ratingLabels[selectedStars]}</Text>}
        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>YOUR REVIEW</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What did you think? Help fellow Mustangs eat well 🐴"
          placeholderTextColor={colors.textTertiary}
          multiline
          value={reviewText}
          onChangeText={setReviewText}
          maxLength={500}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{reviewText.length}/500</Text>
        <TouchableOpacity
          style={[styles.postBtn, (!selectedStars || reviewText.length < 5) && styles.postBtnDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.postBtnText}>Post Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default function WriteReviewScreen({ route, navigation }) {
  const { spotId, stationId } = route.params;
  const spot = spots.find(s => s.id === spotId);
  const preselectedStation = stationId ? spot?.stations?.find(s => s.id === stationId) : null;

  const [step, setStep] = useState(preselectedStation ? 3 : spot?.category === 'Dining Hall' ? 2 : 1);
  const [selectedHall, setSelectedHall] = useState(
    preselectedStation || spot?.category === 'Dining Hall' ? spot : null
  );
  const [selectedStation, setSelectedStation] = useState(preselectedStation || null);

  function handleSelectHall(hall) {
    setSelectedHall(hall);
    setStep(2);
  }

  function handleSelectStation(station) {
    setSelectedStation(station);
    setStep(3);
  }

  function handleBack() {
    if (step === 1) { navigation.goBack(); return; }
    if (preselectedStation) { navigation.goBack(); return; }
    setStep(step - 1);
    if (step === 3) setSelectedStation(null);
  }

  function handleSubmit({ stars, text }) {
    const spotToUpdate = spots.find(s => s.id === selectedHall.id);
    spotToUpdate.reviews.unshift({ id: Date.now(), user: 'You', station: selectedStation.name, stars, text, date: 'Just now' });
    const total = spotToUpdate.reviews.reduce((sum, r) => sum + r.stars, 0);
    spotToUpdate.rating = Math.round((total / spotToUpdate.reviews.length) * 10) / 10;
    Alert.alert('Review posted!', `Thanks for reviewing ${selectedStation.name} at ${selectedHall.name} 🐴`, [
      { text: 'Done', onPress: () => navigation.navigate('Detail', { spotId: selectedHall.id }) },
    ]);
  }

  const stepTitles = ['', 'Dining Hall', 'Station', 'Write Review'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backText}>{step === 1 ? 'Cancel' : '← Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{stepTitles[step]}</Text>
        <View style={{ width: 60 }} />
      </View>
      <View style={styles.progressRow}>
        {[1, 2, 3].map(n => (
          <View key={n} style={[styles.dot, step >= n && styles.dotActive]} />
        ))}
      </View>
      <View style={styles.flex}>
        {step === 1 && <StepPickHall onSelect={handleSelectHall} />}
        {step === 2 && selectedHall && <StepPickStation hall={selectedHall} onSelect={handleSelectStation} />}
        {step === 3 && selectedHall && selectedStation && (
          <StepWriteReview hall={selectedHall} station={selectedStation} onSubmit={handleSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  backBtn: { width: 60 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.primary, width: 18 },
  stepContainer: { padding: 20, paddingBottom: 40 },
  stepHeading: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  stepSub: { fontSize: 14, color: colors.textSecondary, marginBottom: 20 },
  hallCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 14, borderWidth: 0.5, borderColor: colors.border, padding: 16, marginBottom: 12, gap: 14 },
  hallEmoji: { fontSize: 32 },
  hallInfo: { flex: 1 },
  hallName: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  hallTag: { fontSize: 13, color: colors.textSecondary },
  chevron: { fontSize: 22, color: colors.textTertiary },
  stationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 12, borderWidth: 0.5, borderColor: colors.border, padding: 14, marginBottom: 10, gap: 12 },
  stationEmoji: { fontSize: 24 },
  stationName: { flex: 1, fontSize: 15, fontWeight: '500', color: colors.textPrimary },
  selectedSummary: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.primaryLight, borderRadius: 12, padding: 14, marginBottom: 24 },
  selectedEmoji: { fontSize: 28 },
  selectedStation: { fontSize: 15, fontWeight: '600', color: colors.primary },
  selectedHall: { fontSize: 13, color: colors.primary, opacity: 0.7 },
  sectionLabel: { fontSize: 11, fontWeight: '600', color: colors.textTertiary, letterSpacing: 0.8, marginBottom: 12 },
  starsRow: { flexDirection: 'row', gap: 8 },
  star: { fontSize: 44, color: colors.border },
  starLit: { color: colors.star },
  ratingLabel: { marginTop: 8, fontSize: 14, color: colors.primary, fontWeight: '600' },
  textInput: { backgroundColor: colors.surface, borderRadius: 12, padding: 14, fontSize: 14, color: colors.textPrimary, borderWidth: 0.5, borderColor: colors.border, height: 130, lineHeight: 20 },
  charCount: { textAlign: 'right', fontSize: 11, color: colors.textTertiary, marginTop: 6 },
  postBtn: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
  postBtnDisabled: { opacity: 0.4 },
  postBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
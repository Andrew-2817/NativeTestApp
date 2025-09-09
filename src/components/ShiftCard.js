import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';

const ShiftCard = observer(({ shift, onPress }) => {
  const progress = Math.min((shift.currentWorkers / shift.planWorkers) * 100, 100);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(shift)}>
      <View style={styles.header}>
        <Image source={{ uri: shift.logo }} style={styles.logo} />
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{shift.companyName}</Text>
          <Text style={styles.workType}>{shift.workTypes}</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>⭐ {shift.customerRating}</Text>
          <Text style={styles.reviews}>({shift.customerFeedbacksCount})</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={styles.address}>{shift.address}</Text>
        <Text style={styles.date}>
          {shift.dateStartByCity} • {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {shift.currentWorkers}/{shift.planWorkers}
          </Text>
        </View>
        <Text style={styles.price}>{shift.priceWorker} ₽</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  workType: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  details: {
    marginBottom: 12,
  },
  address: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    minWidth: 40,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default ShiftCard;
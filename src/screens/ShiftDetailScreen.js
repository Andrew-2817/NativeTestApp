import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import ShiftStore from '../stores/ShiftStore';

const ShiftDetailScreen = observer(() => {
  const shift = ShiftStore.selectedShift;

  if (!shift) {
    return (
      <View style={styles.center}>
        <Text>No shift selected</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: shift.logo }} style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>{shift.companyName}</Text>
          <Text style={styles.workType}>{shift.workTypes}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {shift.customerRating}</Text>
            <Text style={styles.reviews}>({shift.customerFeedbacksCount} reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.address}>{shift.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        <Text style={styles.schedule}>
          {shift.dateStartByCity} • {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workers</Text>
        <View style={styles.workersInfo}>
          <Text style={styles.workersText}>
            {shift.currentWorkers} of {shift.planWorkers} spots filled
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(shift.currentWorkers / shift.planWorkers) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <Text style={styles.price}>{shift.priceWorker} ₽</Text>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  address: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  schedule: {
    fontSize: 16,
    color: '#666',
  },
  workersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workersText: {
    fontSize: 16,
    color: '#666',
  },
  progressBar: {
    width: 100,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default ShiftDetailScreen;
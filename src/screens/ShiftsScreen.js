import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import ShiftStore from '../stores/ShiftStore';
import LocationStore from '../stores/LocationStore';
import ShiftCard from '../components/ShiftCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ShiftsScreen = observer(({ navigation }) => {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const location = await LocationStore.requestLocation();
      await ShiftStore.loadShifts(location.latitude, location.longitude);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location or load shifts');
    }
  };

  const handleShiftPress = (shift) => {
    ShiftStore.selectShift(shift);
    navigation.navigate('ShiftDetail');
  };

  if (LocationStore.loading || ShiftStore.loading) {
    return <LoadingSpinner />;
  }

  if (LocationStore.error || ShiftStore.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {LocationStore.error || ShiftStore.error}</Text>
      </View>
    );
  }

  if (!LocationStore.permissionGranted) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Location permission is required to show nearby shifts</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ShiftStore.shifts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ShiftCard shift={item} onPress={handleShiftPress} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ShiftsScreen;
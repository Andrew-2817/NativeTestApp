import React from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import ShiftCard from './ShiftCard';
import LoadingSpinner from './LoadingSpinner';

const ShiftList = observer(({ 
  shifts, 
  loading, 
  error, 
  onShiftPress, 
  onRefresh,
  refreshing = false 
}) => {
  if (loading && shifts.length === 0) {
    return <LoadingSpinner message="Loading available shifts..." />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
        <Text style={styles.retry}>Pull down to refresh</Text>
      </View>
    );
  }

  if (shifts.length === 0 && !loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No shifts available in your area</Text>
        <Text style={styles.retry}>Pull down to refresh</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shifts}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      renderItem={({ item }) => (
        <ShiftCard shift={item} onPress={onShiftPress} />
      )}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#2196F3']}
          tintColor="#2196F3"
        />
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={<View style={styles.header} />}
      ListFooterComponent={<View style={styles.footer} />}
    />
  );
});

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  separator: {
    height: 8,
  },
  header: {
    height: 8,
  },
  footer: {
    height: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  error: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  empty: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  retry: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ShiftList;
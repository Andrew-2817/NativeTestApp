import { makeAutoObservable } from 'mobx';
import { requestLocationPermission, getCurrentLocation } from '../utils/location';

class LocationStore {
  location = null;
  loading = false;
  error = null;
  permissionGranted = false;

  constructor() {
    makeAutoObservable(this);
  }

  async requestLocation() {
    this.loading = true;
    this.error = null;

    try {
      const granted = await requestLocationPermission();
      this.permissionGranted = granted;

      if (granted) {
        const location = await getCurrentLocation();
        this.location = location;
        return location;
      } else {
        throw new Error('Location permission denied');
      }
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.loading = false;
    }
  }
}

export default new LocationStore();
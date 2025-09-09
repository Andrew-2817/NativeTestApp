import { makeAutoObservable } from 'mobx';
import { fetchShifts } from '../services/api';

class ShiftStore {
  shifts = [];
  loading = false;
  error = null;
  selectedShift = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadShifts(lat, lon) {
    this.loading = true;
    this.error = null;
    
    try {
      const data = await fetchShifts(lat, lon);
      this.shifts = data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  selectShift(shift) {
    this.selectedShift = shift;
  }

  clearSelection() {
    this.selectedShift = null;
  }
}

export default new ShiftStore();
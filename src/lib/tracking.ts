import { TraceabilityRecord, dummyTraceability } from "./data";

const STORAGE_KEY = "farmelo_tracking_records";

export const getTrackingRecord = (id: string): TraceabilityRecord | null => {
  const normalizedId = id.trim().toUpperCase();
  
  // 1. Check dummy data
  if (dummyTraceability[normalizedId]) {
    return dummyTraceability[normalizedId];
  }
  
  // 2. Check localStorage
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const records = JSON.parse(saved);
        if (records[normalizedId]) {
          return records[normalizedId];
        }
      }
    } catch (e) {
      console.error("Error reading tracking records from localStorage", e);
    }
  }
  
  return null;
};

export const saveTrackingRecord = (record: TraceabilityRecord) => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const records = saved ? JSON.parse(saved) : {};
      records[record.id.toUpperCase()] = record;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error("Error saving tracking record to localStorage", e);
    }
  }
};

import type { FarmProfile } from '../types/farm';

const FARMS_STORAGE_KEY = 'navasaagu_farms';

export const saveFarm = (farm: FarmProfile): void => {
  const farms = getFarms();
  const existingIndex = farms.findIndex(f => f.id === farm.id);
  
  if (existingIndex >= 0) {
    farms[existingIndex] = farm;
  } else {
    farms.push(farm);
  }
  
  localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(farms));
};

export const getFarms = (): FarmProfile[] => {
  const data = localStorage.getItem(FARMS_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error parsing farms from local storage", e);
    return [];
  }
};

export const getFarm = (id: string): FarmProfile | undefined => {
  const farms = getFarms();
  return farms.find(f => f.id === id);
};

export const deleteFarm = (id: string): void => {
  const farms = getFarms().filter(f => f.id !== id);
  localStorage.setItem(FARMS_STORAGE_KEY, JSON.stringify(farms));
};

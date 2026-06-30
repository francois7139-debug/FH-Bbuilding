import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Measurement {
  date: string;
  chest: number;
  waist: number;
  arms: number;
  legs: number;
  bodyFat: number;
}

interface Workout {
  id: string;
  date: string;
  type: string;
  exercises: any[];
  duration: number;
}

interface FoodLog {
  id: string;
  date: string;
  meal: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Supplement {
  name: string;
  completed: boolean;
}

interface UserSettings {
  weight: number;
  height: number;
  goalWeight: number;
  caloriesTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  waterTarget: number;
}

interface AppState {
  userSettings: UserSettings;
  currentWeight: number;
  measurements: Measurement[];
  workouts: Workout[];
  foodLogs: FoodLog[];
  supplements: Supplement[];
  photos: string[]; // base64 or urls
  updateSettings: (settings: Partial<UserSettings>) => void;
  addWorkout: (workout: Workout) => void;
  addFoodLog: (log: FoodLog) => void;
  // add more
  toggleSupplement: (name: string) => void;
  // etc
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      userSettings: {
        weight: 122,
        height: 189,
        goalWeight: 105,
        caloriesTarget: 2800,
        proteinTarget: 250,
        carbsTarget: 200,
        fatTarget: 80,
        waterTarget: 4,
      },
      currentWeight: 122,
      measurements: [],
      workouts: [],
      foodLogs: [],
      supplements: [
        { name: 'Creatine', completed: false },
        { name: 'Fish Oil', completed: false },
        { name: 'Vitamin D', completed: false },
        { name: 'Magnesium', completed: false },
        { name: 'Zinc', completed: false },
        { name: 'Protein', completed: false },
      ],
      photos: [],
      updateSettings: (settings) => set((state) => ({
        userSettings: { ...state.userSettings, ...settings }
      })),
      addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout] })),
      addFoodLog: (log) => set((state) => ({ foodLogs: [...state.foodLogs, log] })),
      toggleSupplement: (name) => set((state) => ({
        supplements: state.supplements.map(s => 
          s.name === name ? { ...s, completed: !s.completed } : s
        )
      })),
    }),
    { name: 'fh-heunis-bodybuilding' }
  )
);

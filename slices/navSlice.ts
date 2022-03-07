import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NavState {
  origin: string | null;
  destination: string | null;
  travelTimeInformation: string | null;
}

const initialState: NavState = {
  origin: null,
  destination: null,
  travelTimeInformation: null
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state: NavState, action: PayloadAction<string | null>) => {
      state.origin = action.payload;
    },
    setDestination: (state: NavState, action: PayloadAction<string | null>) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state: NavState, action: PayloadAction<string | null>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

// Selectors
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelInformation = (state: RootState) => state.nav.travelTimeInformation;

export default navSlice.reducer;
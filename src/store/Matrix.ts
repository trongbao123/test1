import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { matrix } from '../service/MatrixService';
import { RootState } from './store';

interface ApiState {
  data: [] | null;
}

export const fetchMatrix = createAsyncThunk<string, void>('matrix/fetchMatrix', async () => {
  const response = await matrix.getMatrix();
  console.log(response, 'abc');
  return response?.data;
});

const matrixSlice = createSlice({
  name: 'matrix',
  initialState: {
    data: [],
  } as ApiState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMatrix.fulfilled, (state: any, action: PayloadAction<string>) => {
      console.log(state, "state redux");
      console.log(action, "actions");
      state.data = action.payload;
    });
  },
});

export const selectCartItems = createSelector(
  (state: RootState) => state.Matrix.data,
  (items) => items
);
export default matrixSlice.reducer;
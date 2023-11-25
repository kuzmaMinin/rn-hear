import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { EPreconditions, IRecord, PartialRecord } from '../../types/types';
import { BASE_URL } from "../../utils/constants";

export interface RecordsState {
  useCase?: boolean;
  mood: number;
  preconditions?: EPreconditions;
  records: IRecord[];
  isWaitingForResponse: boolean;
  currentRecord?: IRecord;
  isLoadingRecords: boolean;
  recordsFetchError?: string;
  createRecordError?: string;
}

const initialState: RecordsState = {
  useCase: true,
  preconditions: undefined,
  records: [],
  isWaitingForResponse: false,
  currentRecord: undefined,
  isLoadingRecords: false,
  mood: 3,
};

export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async () => {
    const response = await axios
      .get<{ data: IRecord[] }>(
        `https://${BASE_URL}/records/GetListById?id=1&take=100&skip=0`,
      )
      .then(result => result.data.data)
      .catch(error => {
        throw new Error(error);
      });
    return response as IRecord[];
  },
);

export const sendChunks = createAsyncThunk(
  'records/sendChunks',
  async (data: { chunksArray: string[]; newRecord: PartialRecord }) => {
    const response = await axios
      .post(`https://${BASE_URL}/records/`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(result => result.data)
      .catch(error => {
        throw new Error(error);
      });
    return response as IRecord;
  },
);

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecord: (state, newRecord: PayloadAction<IRecord>) => {
      state.records.push(newRecord.payload);
    },
    setMode: (state, useCase: PayloadAction<RecordsState['useCase']>) => {
      state.useCase = useCase.payload;
    },
    setPrecondition: (
      state,
      precondition: PayloadAction<RecordsState['preconditions']>,
    ) => {
      state.preconditions = precondition.payload;
    },
    setIsWaitingForResponse: (
      state,
      isWaitingForResponse: PayloadAction<RecordsState['isWaitingForResponse']>,
    ) => {
      state.isWaitingForResponse = isWaitingForResponse.payload;
    },
    setCurrentRecord: (state, record: PayloadAction<IRecord | undefined>) => {
      state.currentRecord = record.payload;
    },
    setRecordsFetchError: (state, error: PayloadAction<Error | undefined>) => {
      state.recordsFetchError = error.payload?.message;
    },
    setCreateRecordError: (state, error: PayloadAction<Error | undefined>) => {
      state.createRecordError = error.payload?.message;
    },
    setMood: (state, mood: PayloadAction<number>) => {
      state.mood = mood.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRecords.pending, state => {
      state.isLoadingRecords = true;
    });
    builder.addCase(fetchRecords.rejected, (state, error) => {
      state.isLoadingRecords = false;
      state.recordsFetchError = error.error.message;
    });
    builder.addCase(
      fetchRecords.fulfilled,
      (state, records: PayloadAction<IRecord[]>) => {
        state.isLoadingRecords = false;
        state.records = records.payload;
      },
    );
    builder.addCase(sendChunks.pending, state => {
      state.isWaitingForResponse = true;
    });
    builder.addCase(sendChunks.rejected, (state, error) => {
      state.isWaitingForResponse = false;
      state.createRecordError = error.error.message;
    });
    builder.addCase(
      sendChunks.fulfilled,
      (state, action: PayloadAction<IRecord>) => {
        state.records.push(action.payload);
        state.currentRecord = action.payload;
        state.isWaitingForResponse = false;
      },
    );
  },
});

export const {
  setMode,
  setMood,
  setPrecondition,
  setCurrentRecord,
  setCreateRecordError,
  setRecordsFetchError,
} = recordsSlice.actions;
export default recordsSlice.reducer;

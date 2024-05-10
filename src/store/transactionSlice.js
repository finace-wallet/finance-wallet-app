import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactionList } from "api/TransactionApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
    transactions: [],
    isLoading: false,
    error: null,
    pagination: {
        page: 0,
        size: 8,
        total: 0,
    },
};

export const fetchTransaction = createAsyncThunk(
    "/transaction/history",
    async ({ walletId, page}, { rejectWithValue }) => {
      try {
        const response = await getTransactionList(walletId,page);
        if(response.status === 200){
          
            return response.data; 
        }
      } catch (error) {
        if (error.response) { 
          toast.error('Lỗi API: ' + error.response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(error.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return rejectWithValue(error.message || 'Lỗi không xác định');
      }
    }
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.selectTransactions = []
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchTransaction.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchTransaction.fulfilled, (state, action) => {
          state.isLoading = false;
          state.transactions = action.payload.data.content;
          state.pagination = {
            page: action.payload.data.pageable.pageNumber,
            size: action.payload.data.pageable.pageSize,
            total: action.payload.data.totalPages,
          };
        })
        .addCase(fetchTransaction.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
  }
});

export const { clearTransactions } = transactionSlice.actions;

export const selectTransactions = state => state.transaction.transactions;
export const selectIsLoading = state => state.transaction.isLoading;
export const selectError = state => state.transaction.error;
export const selectPagination = state => state.transaction.pagination;

export default transactionSlice.reducer;
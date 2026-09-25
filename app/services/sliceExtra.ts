import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

/**
 * Helper tự động đăng ký pending, fulfilled, rejected cho một AsyncThunk
 */
export const addAsyncCases = <StateRecord extends Record<string, any>>(
  builder: ActionReducerMapBuilder<StateRecord>,
  thunk: {
    pending: any;
    fulfilled: any;
    rejected: any;
  },
  key: keyof StateRecord
) => {
  builder
    .addCase(thunk.pending, (state: any) => {
      state[key].loading = true;
      state[key].error = null;
    })
    .addCase(thunk.fulfilled, (state: any, action: any) => {
      state[key].loading = false;
      state[key].data = action.payload;
    })
    .addCase(thunk.rejected, (state: any, action: any) => {
      state[key].loading = false;
      state[key].error = (action.payload as string) || "Có lỗi xảy ra";
    });
};
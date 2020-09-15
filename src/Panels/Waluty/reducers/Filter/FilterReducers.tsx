import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  DateFrom : '2020-01-09',
  DateTo:    '2020-09-09',
  Currency:  'PLN',
  CurrenciesREf : []
}

const FilterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    walutyRefChanged(state, action) {     
      state.CurrenciesREf = action.payload
    },
    WalutaChanged(state, action) {
      state.Currency = action.payload;
    },
  },
})
export const SelectetAvaibleCurrencies = state => state.Filter.CurrenciesAvaible;
export const SelectetRefCurrencies = state => state.Filter.CurrenciesREf;
export const SelectetCurrency = state => state.Filter.Currency;
export const SelectedDateFrom =  state => state.Filter.DateFrom;
export const SelectedDateTo =  state => state.Filter.DateTo;


export const { walutyRefChanged,WalutaChanged } = FilterSlice.actions

export default FilterSlice.reducer

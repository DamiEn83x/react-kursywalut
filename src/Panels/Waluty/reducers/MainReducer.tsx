import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import httpserviceWaluty from '../services/walutyexternal'
import LoadCurrenciesAvaible from './Filter/FilterReducers'



export const fetchWaluty = createAsyncThunk('Main/fetchWaluyty',  () => {
  
   const service= new httpserviceWaluty();
   let response;
   response =  service.GettabelaWalutA()
   return response;

})

const initialState ={
  stateWalutyAll:{ 
      waluty: [],
      status: 'idle',
      error: '',
  }
} 

const MainSlice = createSlice({
  name: 'Main',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchWaluty.pending]: (state, action) => {
      state.stateWalutyAll.status = 'loading'
    },
    [fetchWaluty.fulfilled]: (state, action) => {
      state.stateWalutyAll.status = 'succeeded'
      state.stateWalutyAll.waluty = action.payload.data;

    },
    [fetchWaluty.rejected]: (state, action) => {
      state.stateWalutyAll.status = 'failed'
      state.stateWalutyAll.error = 'Pobieranie słownika walut: '+ action.error.message

    }
  }
})
export const SelectErrors= (state) => {
  let Errors='';
  Errors=state.Main.stateWalutyAll.error
  return Errors 
} 
export const SelectAvaibleCurrencies= (state) => {
  return state.Main.stateWalutyAll.waluty 
} 


export const {  } = MainSlice.actions

export default MainSlice.reducer

import React, { Component ,useEffect} from 'react';
import WalutyReferencyjne from './WalutyReferencyjne/WalutyReferencyjne';
import LookupSelector from '../../Components/LookupSelector/LookupSelector';
import DateFilter from './DateFilter/DateFilter'

import FilterDebuger from './reducers/Filter/FilterDebuger';
import {WalutaChanged,SelectetAvaibleCurrencies} from './reducers/Filter/FilterReducers'
import { useDispatch,useSelector } from 'react-redux'
import {fetchWaluty,SelectAvaibleCurrencies} from './reducers/MainReducer'
import  ErrorViewer from './ErrorViewer';

const WalutyLookup=({items})=>
{
  const dispatch = useDispatch();
  const OnChangeWaluta=(waluta)=>{
    dispatch(WalutaChanged(waluta));
  }
  return (
    <LookupSelector Items={items} pOnChangeSelect ={OnChangeWaluta}/>
  )
} 


const WalutyPanel=()=>
{

  const dispatch = useDispatch()


  const FechtWalutyStatus = useSelector((state) => state.Main.stateWalutyAll.status)

  useEffect(() => {
    if (FechtWalutyStatus=== 'idle') {
      dispatch(fetchWaluty())
    }
  }, [FechtWalutyStatus, dispatch])
  const CurrencyItemsAll=useSelector(SelectAvaibleCurrencies);

  return (
    <div className='container'>

      <WalutyReferencyjne items={CurrencyItemsAll}/>
      <WalutyLookup items={CurrencyItemsAll}/>
      <DateFilter/>
      <br/>
      <ErrorViewer/>
      <FilterDebuger/>

    </div>
  )
}

export default WalutyPanel;
import React, { Component } from 'react';
import CheckBoxList from '../../../Components/CheckBoxList/CheckBoxList';
import {walutyRefChanged,SelectetAvaibleCurrencies,SelectetCurrency} from '../reducers/Filter/FilterReducers'
import { useDispatch,useSelector } from 'react-redux'



const WalutyReferencyjne=({items})=>{ 
  const dispatch = useDispatch();
  const OnChecksChanged=(ChecksList)=>
  {   const walutyRef=Object.values(ChecksList).filter((item)=>{return (item.checked==1)}).map((item)=>{return item.code});
      dispatch(walutyRefChanged(walutyRef));
  }
  const SelectedCurrency=useSelector(SelectetCurrency); 
   let FilterWauty=items.filter((item)=>{return item.code!=SelectedCurrency});
  return (
    <div className="card">
      <div className="card-header bg-primary text-white">Waluty referencyjne</div>
      <div className="card-body p-4">
        <CheckBoxList  items={FilterWauty}  ChecksChanged={OnChecksChanged}/>
      </div>
    </div>

  );

}
export default WalutyReferencyjne;
import React, { Component  }  from 'react';
import DatePicker  from '../../../Components/DatePicker/DatePicker'
const DateFilter=()=>{
  return (
    <div>
    Data od:<br/>
    <DatePicker/><br/><br/>
    Data do:<br/>
     <DatePicker/>
     </div>
  )
}

export default DateFilter;
import React, { Component ,useEffect} from 'react';
import {SelectErrors} from  './reducers/MainReducer'
import { useSelector } from 'react-redux';

const ErrorViewer=()=>
{
  let  content=null;
  const Errors=useSelector(SelectErrors); 
  if(Errors!='') 
    content = (<div className="alert alert-danger" role="alert">
                {Errors}
                </div>)
  return (
    content
  );
}

export default ErrorViewer;
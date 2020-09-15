import React, { Component,useState,useEffect  }  from 'react';

const CheckBoxList=({items,ChecksChanged})=>{ 
  const [Checks, setChecks] = useState([]);
  const SelectAllChange=(event)=>{
    //Checks.forEach((item)=>{}));
    CheckAll(event.target.checked);
  }

  const  SelectChange=(code)=>{
    let tChecks = JSON.parse(JSON.stringify( Checks));
    tChecks[code].checked = tChecks[code].checked ==1 ? 0:1;
    setChecks(tChecks);
    ChecksChanged(tChecks);
  }
;

  useEffect(()=>{
    const pitems=items.reduce(function(accum, currentVal){
              accum[currentVal.code] = {...currentVal,checked:0}
              return accum;
            } ,{});
    setChecks(pitems);
    
  },[items])


  const CheckAll=(checked)=>{
      let tChecks = JSON.parse(JSON.stringify(Checks));
      items.forEach(function (item, index) {
          tChecks[item.code].checked= checked ? 1:0;
      });
      setChecks(tChecks);
      ChecksChanged(tChecks);
      //console.log(tChecks);
  }

  const content= items.map((item) =>{ 
    return (
      <div className="custom-control custom-checkbox mb-3" id={item.code+'div'}>
      <input className="custom-control-input"  type="checkbox" id={item.code+'input'} name={item.code+'name'}  checked={Checks[item.code]==undefined ? "":(Checks[item.code].checked==1) ? "1":""} onClick={()=>{SelectChange(item.code)}} />
          <label className="custom-control-label" id={item.code+'label'} htmlFor={item.code+'input'} >{item.code} - {item.name}</label>
      </div>)
    });

  const AllChecked=(pChecks)=>{
    if(pChecks==undefined) return false;
    const ChecksTab=Object.values(Checks);
    if(ChecksTab.length==0) return false;
    const ret = (ChecksTab.filter((item)=>{return (item.checked==0)}).length==0);
     
    return ret;
  }

  return (

    <div >
            <div className="custom-control custom-checkbox mb-3">
              <input type="checkbox" className="custom-control-input"   id="customCheckAll"  name="all"  onClick={SelectAllChange} checked={AllChecked(Checks) ?"1":""}/>
              <label className="custom-control-label" htmlFor="customCheckAll">Select all</label>
              {content}
            </div>

    </div>
  ) 

} 

export  default CheckBoxList;
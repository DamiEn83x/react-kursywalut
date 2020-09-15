import { Observable, throwError } from 'rxjs';


const CURR_SERVICE_API:string= 'https://currencyservice.damiand1.repl.co';


class WalutyExternal {



  constructor() { }

  GettabelaWalutA(){
      return  new Promise((resolve, reject) => {
          let url=CURR_SERVICE_API+'/?query=GettabelaWalutA';
          // console.log(url);
          fetch (url, { 
                  method: 'get', 
                  headers: new Headers({
    
                  })
          }).then(response => response.json()).then((res)=>{
              let out= res[0]['rates'].map((rate)=>{
                return { 
                  table:'A',
                  code:rate.code,
                  name:rate.currency
                }
              });
              resolve({data:out} );
         
            })
          .catch( err => {
            if (typeof err.text === 'function') {
              err.text().then(errorMessage => {
            
                reject(errorMessage );
                return errorMessage;
              });
            } else {
              
              reject(err );
              return err;
            }
          }) 
      })
  }
 /* GettabelaWalutAB()
  {
       return  new Observable(
      (observer) =>  
      {
        let url=CURR_SERVICE_API+'/?query=GettabelaWalutAB';
        console.log(url);
         this.http.get<any>(url,httpOptions).subscribe((res:HttpResponse<any>)=>
         { console.log(res);   
     //    console.log('response from server:',res);
  //console.log('response headers',res.headers.keys())
           let outA= res[0]['rates'].map((rate)=>
              {
                return { 
                  table:'A',
                  code:rate.code,
                  name:rate.currency
                }
              });
            let outB= res[1]['rates'].map((rate)=>
            {
                return { 
                  table:'B',
                  code:rate.code,
                  name:rate.currency
                }
            });
             // console.log(out);
            observer.next([].concat(outA, outB));
         
         });//(url, {responseType: 'json'})



      })
  }
  GetCurrencyPowerChanges(cur:string,table:string,DayFrom:Date,DayTo:Date,tabelaWalut:string[])
  {   
    console.log('GetCursevalueRange');
    return  new Observable((observer) =>{    
      
      let url=CURR_SERVICE_API;
      let Done=false;
      let Token = Math.round(Math.random()*10000);
      this.http.post<any>(url,{
                                    "Query":"GetCurrencyPowerChanges",
                                    "DayFrom": DayFrom,
                                    "DayTo": DayTo,
                                    "tabelaWalut":JSON.stringify(tabelaWalut),
                                    "Curr": cur,
                                    "Token":Token,
                                    "Table":table
                                 },httpOptions).subscribe((res)=>{    
           
           let tabelaZbiorcza=new Object();
        //   console.log(res);
           res.forEach(obj => {
                tabelaZbiorcza[obj.date]={
                  date:obj.date,
                  Wskaznik:obj.Wskaznik
                } 
            });
    
          Done=true;
          observer.next( { 
                          datatype:'dataoutput',
                          data:tabelaZbiorcza
                         }
          )
  
         
      });//(url, {responseType: 'json'});
      let http=this.http;

      let CheProgress=function(){
        setTimeout(function(){ 
          http.post<any>(url,{
                                    "Query":"GetDataProgress",
                                    "Token":Token
                                 },httpOptions).subscribe((res)=>{    
           // console.log('observer.next '+JSON.stringify(res));
            if(res.datatype== 'progress') {
              observer.next(res);
            }
       
            if (!Done){
              CheProgress();
           }
         
          }); 
        },300);   
      }
      CheProgress();

    }
    )
  } */

}

export default  WalutyExternal;
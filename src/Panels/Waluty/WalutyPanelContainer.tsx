import React from 'react';
import store from './store'
import { Provider } from 'react-redux'
import WalutyPanel from './CurrencyPowerPanel'

const WalutyPanelContainer= () =>
{

 return ( 
 <Provider store={store}>  
 <WalutyPanel/>
 </Provider>
 )

}

export default  WalutyPanelContainer;
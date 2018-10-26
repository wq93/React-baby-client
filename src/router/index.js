import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Baby from '../pages/baby_goods'
class RouterView extends Component {
  render() {
    return (
      <BrowserRouter>
       <div>
         <Route path='/baby' exact component={Baby}></Route>
         <Route path='/aa' exact component={() => <div>/aa</div>}></Route>
       </div>
      </BrowserRouter>
    )
  }
}

export default RouterView

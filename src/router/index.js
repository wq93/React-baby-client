import React, {Component} from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

class RouterView extends Component {
  render() {
    return (
      <BrowserRouter>
       <div>
         <Route path='/' exact component={() => <div>/</div>}></Route>
         <Route path='/aa' exact component={() => <div>/aa</div>}></Route>
       </div>
      </BrowserRouter>
    )
  }
}

export default RouterView

import React from 'react';
import { Header, Home, Cart } from './components/Exports';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Route exact path="/" render={() => <Home/>}/>
          <Route path="/cart" render={() => <Cart/>}/>
          <Route path="/home" render={() => <Home/>}/>
        </div>
      </div>
    </BrowserRouter>
  )
}


export default App;
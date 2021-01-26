import Home from './home';
import Topic from './topic';
import {useState, useEffect, React, ReactDOM} from 'react';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom';
import PopWindow from 'react-new-window';
import MyWindowPortal from './MyWindowPortal.js'



function App() {
  const [isOpen,setIsOpen] = useState(false);
  
  
  const closeWindowPortal = () => {
    setIsOpen(false);
  }
  return (
    <>
      <input type="button" value={isOpen?('Close'):('open')} onClick={
        (evt)=>{
          setIsOpen(true);
        }
      }></input>


      {isOpen && (
        <MyWindowPortal closeWindowPortal={ closeWindowPortal}>
          <h1> this is Pop!!!</h1>
          <div id="sheetDIV" style={{width:'100%',height:'400px'}}></div>
        </MyWindowPortal>
      )}




      <ul>
        <li><NavLink exact to='/'>HOME</NavLink></li>
	      <li><NavLink to='/topics'>TOPICS</NavLink></li>

      </ul>
       <Switch>
        <Route exact path='/'><Home></Home></Route>
        <Route path='/topics'><Topic></Topic></Route>
      </Switch>
    </>
  );
}
export default App;




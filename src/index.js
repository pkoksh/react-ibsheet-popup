import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Topic from './topic';
import reportWebVitals from './reportWebVitals';
import IBSheetLoader from '@ibsheet/loader';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom';

IBSheetLoader.config({
  registry: [
      {
          name: 'ibsheet',
          baseUrl: './lib/ibsheet', // ibsheet.js 파일 위치
          locales: ["en","ko"], // locale 파일 (설정이 없으면 /locale/ko.js 파일 사용)
          plugins: [  // plugin 파일 
              "dialog",
              "common",
              "excel",
              ]
      }
  ]
})

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter> 
        <App />
     </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

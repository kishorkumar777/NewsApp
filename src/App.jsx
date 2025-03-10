
import './App.css'


import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";


const App = () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const [progress, setProgress] = useState(0);
  
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color="#f11946"
            progress={progress}
            height={3}
          />
            <Routes>
              <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey}  key='general' pageSize={9} category='general' country='us'/>}/>
              <Route path='/general' element={<News setProgress={setProgress} apiKey={apiKey}  key='general' pageSize={9} category='general' country='us'/>}/>
              <Route path='/Business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={9} category='business' country='us'/>}/>
              <Route path='/Entertainment'element={ <News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={9} category='entertainment' country='us'/>}/>
              <Route path='/Health'element={ <News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={9} category='health' country='us'/>}/>
              <Route path='/Science'element={ <News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={9} category='science' country='us'/>}/>
              <Route path='/Sports'element={ <News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={9} category='sports' country='us'/>}/>
              <Route path='/Technology'element={ <News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={9} category='technology' country='us'/>}/>
            </Routes>
        </Router>
      </div>
    )
}

export default App;

 

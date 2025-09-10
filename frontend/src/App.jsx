import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './components/pages/Home';
import MenuBlock from './components/layout/MenuBlock';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bp6-dark">
      <Router>
        <div id="main-page">
          <div id="left-column">
            <MenuBlock/>
          </div>
          <div id="content">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              {/* <Route path="/search" element={<Search/>}/>
              <Route path="/tags" element={<Tags/>}/>
              <Route path="/providers" element={<Providers/>}/>
              <Route path="/agent/maintenance" element={<Maintenance/>}/> */}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App

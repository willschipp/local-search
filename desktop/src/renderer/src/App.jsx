import './assets/main.css'

import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import MenuBlock from './components/layout/MenuBlock';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

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

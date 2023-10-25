import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TabbedFormRenderer from './panel';
import PrelimInfoForm from './preliminfoform';
import BasicConfigForm from './basicconfigform';
import TaskForm from './taskform';
import ConfigurationsForm from './azureconfigform';
import GitConfigForm from './gitconfigform';
function App() {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <Router>
      <TabbedFormRenderer activeTab={activeTab} setActiveTab={setActiveTab}/>
    <Routes>
    <Route path="/" element={<PrelimInfoForm/>} />
    <Route path="/preliminfo" element={<PrelimInfoForm/>}/>
    <Route path="/basicinfo" element={<BasicConfigForm/>} />
    <Route path="/task" element={<TaskForm/>}/>
    <Route path="/azureconfig" element={<ConfigurationsForm/>}/>
    <Route path="/genartifacts" element={<GitConfigForm/>}/>

    </Routes>
    </Router>
  );
}

export default App;

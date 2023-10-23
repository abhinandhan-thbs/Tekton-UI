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
    <Route path="/" element={<PrelimInfoForm/>} tab={0}/>
    <Route path="/preliminfo" element={<PrelimInfoForm/>} tab={0}/>
    <Route path="/basicinfo" element={<BasicConfigForm tab={1}/>} />
    <Route path="/task" element={<TaskForm/>} tab={3}/>
    <Route path="/azureconfig" element={<ConfigurationsForm/>}tab={4}/>
    <Route path="/genartifacts" element={<GitConfigForm/>} tab={5}/>

    </Routes>
    </Router>
  );
}

export default App;

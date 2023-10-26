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
      <TabbedFormRenderer activeTab={activeTab} setActiveTab={setActiveTab} />
      <Routes>
        <Route path="/" element={<PrelimInfoForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/preliminfo" element={<PrelimInfoForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/basicinfo" element={<BasicConfigForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/task" element={<TaskForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/azureconfig" element={<ConfigurationsForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/genartifacts" element={<GitConfigForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
      </Routes>
    </Router>
  );
}

export default App;

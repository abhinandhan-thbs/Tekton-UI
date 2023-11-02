import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrelimInfoForm from './preliminfoform';
import BasicConfigForm from './basicconfigform';
import TaskForm from './taskform';
import ConfigurationsForm from './azureconfigform';
import GitConfigForm from './gitconfigform';
import Header from './header';
import Footer from './footer';
import Login from './login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);


  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} onLoginToggle={() => setIsLoggedIn(!isLoggedIn)} />
      <Routes>
        <Route path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />} />
        <Route path="/preliminfo" element={<PrelimInfoForm activeTab={activeTab} setActiveTab={setActiveTab}/>} />
        <Route path="/basicinfo" element={<BasicConfigForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/task" element={<TaskForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/azureconfig" element={<ConfigurationsForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
        <Route path="/genartifacts" element={<GitConfigForm activeTab={activeTab} setActiveTab={setActiveTab} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PrelimInfoForm from './preliminfoform';
import BasicConfigForm from './basicconfigform';
import GitConfigForm from './gitconfigform';
import TaskForm from './taskform';
import RateLimitForm from './azureconfigform';
import './App.scss'; 

function TabbedFormRenderer() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: 'Tab 1',
      heading: 'Step 1',
      subheading: 'Preliminary Info',
      content: <PrelimInfoForm />
    },
    {
      name: 'Tab 2',
      heading: 'Step 2',
      subheading: 'Basic Configuration',
      content: <BasicConfigForm />,
    },
    {
      name: 'Tab 3',
      heading: 'Step 3',
      subheading: 'Flows',
      content: 'Form 3 content goes here',
    },
    {
      name: 'Tab 4',
      heading: 'Step 4',
      subheading: 'Tasks to be executed',
      content: <TaskForm />,
    },
    {
      name: 'Tab 5',
      heading: 'Step 5',
      subheading: 'AZURE Config',
      content: <RateLimitForm />,
    },
    {
      name: 'Tab 6',
      heading: 'Step 6',
      subheading: 'MS Config',
      content: 'Form 3 content goes here',
    },
    {
      name: 'Tab 7',
      heading: 'Step 7',
      subheading: 'Generate Artifacts',
      content: <GitConfigForm />,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
    <div className="justify-space-between align-center">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ border: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <div className="text-center">
                <div>{tab.heading}</div>
                <div>{tab.subheading}</div>
              </div>
            }
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: '5px',
              backgroundColor: activeTab === index ? 'orange' : '',
              color: activeTab === index ? 'white' : 'black',
            }}
          />
        ))}
      </Tabs>
      <Box p={3}>
        {tabs[activeTab].content}
        {/* (6) Proceed Button */}
        <Button variant="contained" color="primary">
          Proceed
        </Button>
      </Box>
    </div>
    </div>
  );
}

export default TabbedFormRenderer;

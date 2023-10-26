import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';

interface TabInfo {
  name: string;
  heading: string;
  subheading: string;
}

interface TabbedFormRendererProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

function TabbedFormRenderer({ activeTab, setActiveTab }: TabbedFormRendererProps) {
  const tabs: TabInfo[] = [
    {
      name: 'Tab 1',
      heading: 'Step 1',
      subheading: 'Preliminary Info',
    },
    {
      name: 'Tab 2',
      heading: 'Step 2',
      subheading: 'Basic Configuration',
    },
    {
      name: 'Tab 3',
      heading: 'Step 3',
      subheading: 'Flows',
    },
    {
      name: 'Tab 4',
      heading: 'Step 4',
      subheading: 'Tasks to be executed',
    },
    {
      name: 'Tab 5',
      heading: 'Step 5',
      subheading: 'AZURE Config',
    },
    {
      name: 'Tab 6',
      heading: 'Step 6',
      subheading: 'MS Config',
    },
    {
      name: 'Tab 7',
      heading: 'Step 7',
      subheading: 'Generate Artifacts',
    },
  ];

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setActiveTab(newValue);
  // };

  
  return (
    <Container>
      <Tabs
        value={activeTab}
        // onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ border: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <>
                {tab.heading}
                <br></br>
                {tab.subheading}
              </>
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
    </Container>
  );
}

export default TabbedFormRenderer;

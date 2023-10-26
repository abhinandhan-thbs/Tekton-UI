import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface tabProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

function GitConfigForm({ activeTab, setActiveTab }: tabProps) {
  useEffect(() => {
    setActiveTab(6); 
  }, [setActiveTab]);

  const [serviceName, setServiceName] = useState<string>('');
  const [gitBranch, setGitBranch] = useState<string>('');
  const [showAdditionalButtons, setShowAdditionalButtons] = useState<boolean>(false);

  const handleServiceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceName(event.target.value);
  };

  const handleGitBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGitBranch(event.target.value);
  };

  const handleGenerateArtifacts = () => {
    if (serviceName && gitBranch) {
      setShowAdditionalButtons(true);
    }
  };

  const handleDownloadFiles = () => {
    // Implement your download logic here
  };

  const handleGitUpload = () => {
    // Implement your Git upload logic here
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 3, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <Typography variant="h4">Git Config</Typography>
        <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <form>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78',  padding: 1 }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Service Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                label="Service Name"
                sx={{ flex: '1' }}
                value={serviceName}
                onChange={handleServiceNameChange}
                
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78',  padding: 1 }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Git Branch <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                label="Git Branch"
                sx={{ flex: '1' }}
                value={gitBranch}
                onChange={handleGitBranchChange}
              />
            </Box>
          </form>
      </Box>
      {showAdditionalButtons ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateArtifacts}
              >
                Generate Artifacts
              </Button>
              <Button
                variant="outlined"
                onClick={handleDownloadFiles}
              >
                Download files
              </Button>
              <Button
                variant="outlined"
                onClick={handleGitUpload}
              >
                Git upload
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateArtifacts}
            >
              Generate Artifacts
            </Button>
            </Box>
          )}
      </Box>
    </Container>
  );
}

export default GitConfigForm;

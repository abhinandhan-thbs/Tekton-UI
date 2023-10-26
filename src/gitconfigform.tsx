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
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <Typography variant="h3">Git Config</Typography>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <Typography variant="body1" sx={{ minWidth: 120, flexShrink: 0 }}>
                Service name:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={serviceName}
                onChange={handleServiceNameChange}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <Typography variant="body1" sx={{ minWidth: 120, flexShrink: 0 }}>
                Git branch:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={gitBranch}
                onChange={handleGitBranchChange}
              />
            </Box>
          </Box>
          {showAdditionalButtons ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateArtifacts}
            >
              Generate Artifacts
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
}

export default GitConfigForm;

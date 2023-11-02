import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import TabbedFormRenderer from './panel';

interface tabProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

function BasicConfigForm({ activeTab, setActiveTab }: tabProps) {
  useEffect(() => {
    setActiveTab(1); 
  }, [setActiveTab]);

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [apiName, setApiName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [basePath, setBasePath] = useState<string>('');

  const handleFileChange = () => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleUploadFile = () => {
    setUploadProgress(0);

    const uploadInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(uploadInterval);
          setUploadProgress(100);
        }
        return newProgress;
      });
    }, 500);
  }

  const isFormValid = () => {
    return selectedFile && uploadProgress === 100 && apiName && description && basePath;
  };

  const handleProceed = () => {
    if (isFormValid()) {
      navigate('/task');
    }
    else{
      alert("Please fill all mandatory fields")
    }
  };

  return (
    <Container maxWidth="lg">
      <Container>
      <TabbedFormRenderer activeTab={activeTab} setActiveTab={setActiveTab} />
      </Container>
      <Box sx={{ padding: 3, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 1  }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Swagger Spec <span style={{ color: 'red' }}>*</span>
              </Typography>
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                placeholder={selectedFile ? selectedFile.name : 'Select file'}
                disabled
                sx={{ flex: '1' }}
              />
              {selectedFile ? (
                <>
                  {uploadProgress === 100 ? (
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={handleRemoveFile}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      onClick={handleUploadFile}
                    >
                      Upload
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleFileChange}
                >
                  Browse
                </Button>
              )}
            </Box>
            {selectedFile && uploadProgress > 0 && (
              <Box>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}
            {selectedFile && uploadProgress === 100 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
                <Typography variant="h6">{selectedFile.name} uploaded successfully</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '0.5px solid #cccccc78', borderBottom: '0.5px solid #cccccc78', padding: 1 }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                API name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                label="API name"
                sx={{ flex: '1' }}
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78',  padding: 1 }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Description <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                label="Description"
                sx={{ flex: '1' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78',  padding: 1 }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Base Path <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                label="Base Path"
                sx={{ flex: '1' }}
                value={basePath}
                onChange={(e) => setBasePath(e.target.value)}
              />
            </Box>
          </Box>
        </form>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleProceed}>
            Proceed
          </Button>
      </Box>
    </Box>
    </Container>
  );
}

export default BasicConfigForm;

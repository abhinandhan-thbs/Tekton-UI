import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

function BasicConfigForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [apiName, setApiName] = useState('');
  const [description, setDescription] = useState('');
  const [basePath, setBasePath] = useState('');

  const handleFileChange = () => {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
  };
  const isFormValid = () => {
    return selectedFile && uploadProgress === 100 && apiName && description && basePath;
  };

  const handleProceed = () => {
    if (isFormValid()) {
      // Proceed to the next form or perform the desired action
      // You can add your logic here
      navigate("/basicinfo");
    } else {
      // Display an error message or take appropriate action for invalid form
    }
  };


  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Swagger Spec
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
              <Box className="upload-progress">
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}
            {selectedFile && uploadProgress === 100 && (
              <Box className="upload-success">
                <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
                <Typography variant="h6">File uploaded successfully</Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                API name
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
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Description
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
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Base Path
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleProceed()}
              disabled={!isFormValid()}
            >
              Proceed
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default BasicConfigForm;

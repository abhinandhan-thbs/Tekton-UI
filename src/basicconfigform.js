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

function BasicConfigForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
              <TextField variant="outlined" type="text" fullWidth label="API name" sx={{ flex: '1' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Description
              </Typography>
              <TextField variant="outlined" type="text" fullWidth label="Description" sx={{ flex: '1' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
              <Typography variant="h6" sx={{ width: '150px' }}>
                Base Path
              </Typography>
              <TextField variant="outlined" type="text" fullWidth label="Base Path" sx={{ flex: '1' }} />
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default BasicConfigForm;

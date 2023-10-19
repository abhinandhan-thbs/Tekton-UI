import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

function PrelimInfoForm() {
  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Template</Typography>
          <FormControl variant="outlined" sx={{ flex: 1, marginLeft: 2 }}>
            <InputLabel htmlFor="template">Type</InputLabel>
            <Select
              label="Template"
              inputProps={{
                name: 'template',
                id: 'template',
              }}
            >
              <MenuItem value={1}>Schneider Electric APIM</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
          <Typography variant="h6">Service Type</Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="Microservice"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Gateway"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">API Tool</Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="apiTool">Type</InputLabel>
              <Select
                label="API Tool"
                inputProps={{
                  name: 'apiTool',
                  id: 'apiTool',
                }}
              >
                <MenuItem value={1}>AZURE</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Artifact</Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="artifact">Type</InputLabel>
              <Select
                label="Artifact"
                inputProps={{
                  name: 'artifact',
                  id: 'artifact',
                }}
              >
                <MenuItem value={1}>YAML</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78' }}>
          <Typography variant="h6">Template</Typography>
          <FormControlLabel
            control={<RadioGroup aria-label="templateRadio" name="templateRadio" sx={{ display: 'flex', flexDirection: 'row' }}>
              <FormControlLabel
                value="General"
                control={<Radio />}
                label="General"
                sx={{ marginLeft: 2, marginRight: 2 }}
              />
              <FormControlLabel
                value="Convergent"
                control={<Radio />}
                label="Convergent"
                sx={{ marginLeft: 2, marginRight: 2 }}
              />
            </RadioGroup>}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default PrelimInfoForm;

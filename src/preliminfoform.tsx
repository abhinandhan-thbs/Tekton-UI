import React, { useState, useEffect } from 'react';
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
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  template: string;
  gateway: boolean;
  apiTool: string;
  artifact: string;
  templateType: string;
}
interface tabProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

function PrelimInfoForm({ activeTab, setActiveTab }: tabProps) {

  useEffect(() => {
    setActiveTab(0);
  }, [setActiveTab]);

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    template: '',
    gateway: false,
    apiTool: '',
    artifact: '',
    templateType: '',
  });

  const isFormValid = () => {
    const {
      template,
      gateway,
      apiTool,
      artifact,
      templateType,
    } = formValues;

    return (
      template !== '' &&
      gateway &&
      apiTool !== '' &&
      artifact !== '' &&
      templateType !== ''
    );
  };

  const handleProceed = () => {
    if (isFormValid()) {
      navigate('/basicinfo');
    }
    else{
      alert("Please fill all mandatory fields")
    }
  };

  const handleChange = (field: keyof FormValues, value: string | boolean) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid #cccccc78', padding: 1 }}>
          <Typography variant="h6">Template<span style={{ color: 'red' }}>*</span></Typography>
          <FormControl variant="outlined" sx={{ flex: 1, marginLeft: 2 }}>
            <InputLabel htmlFor="template">Select Template</InputLabel>
            <Select
              label="Template"
              inputProps={{
                name: 'template',
                id: 'template',
              }}
              value={formValues.template}
              onChange={(e) => handleChange('template', e.target.value)}
            >
              <MenuItem value={1}>Schneider Electric APIM</MenuItem>
              <MenuItem value={2}>None</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78', padding: 1 }}>
          <Typography variant="h6">Service Type<span style={{ color: 'red' }}>*</span></Typography>
          <FormControlLabel sx={{ marginLeft: 0.5 }}
            control={
              <Checkbox
                checked={formValues.gateway}
                onChange={() => handleChange('gateway', !formValues.gateway)}
              />
            }
            label="Gateway"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2,borderBottom: '0.5px solid #cccccc78', padding: 1 }}>
          <Box sx={{ flex: 1, marginRight: 2 }}>
            <Typography variant="h6">API Tool<span style={{ color: 'red' }}>*</span></Typography>
            <FormControl variant="outlined" sx={{ width: '100%' }}>
              <InputLabel htmlFor="apiTool">Select API Tool</InputLabel>
              <Select
                label="API Tool"
                inputProps={{
                  name: 'apiTool',
                  id: 'apiTool',
                }}
                value={formValues.apiTool}
                onChange={(e) => handleChange('apiTool', e.target.value)}
              >
                <MenuItem value={1}>AZURE</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1, marginLeft: 2 }}>
            <Typography variant="h6">Artifact <span style={{ color: 'red' }}>*</span></Typography>
            <FormControl variant="outlined" sx={{ width: '100%' }}>
              <InputLabel htmlFor="artifact">Select Artifact</InputLabel>
              <Select
                label="Artifact"
                inputProps={{
                  name: 'artifact',
                  id: 'artifact',
                }}
                value={formValues.artifact}
                onChange={(e) => handleChange('artifact', e.target.value)}
              >
                <MenuItem value={1}>YAML</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid #cccccc78', padding: 1 }}>
          <Typography variant="h6">Template<span style={{ color: 'red' }}>*</span></Typography>
          <FormControlLabel
            control={<RadioGroup
              aria-label="templateRadio"
              name="templateRadio"
              sx={{ display: 'flex', flexDirection: 'row' }}
              value={formValues.templateType}
              onChange={(e) => handleChange('templateType', e.target.value)}
            >
              <FormControlLabel
                value="General"
                control={<Radio />}
                label="General"
                sx={{ marginLeft: 2, marginRight: 2 }} />
              <FormControlLabel
                value="Convergent"
                control={<Radio />}
                label="Convergent"
                sx={{ marginLeft: 2, marginRight: 2 }} />
            </RadioGroup>} label={undefined}          />
        </Box>
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

export default PrelimInfoForm;



import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ConfigurationsForm from './azureconfigform';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function CustomToggleSwitch({ label, value, checked, onChange, disabled }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          color="primary"
          disabled={disabled}
        />
      }
      label={
        <div>
          <div>{label}</div>
          <div>{value}</div>
        </div>
      }
    />
  );
}

function TaskForm() {
  const navigate = useNavigate();
  const [switches, setSwitches] = useState({
    allowedOrigins: false,
    azureComponents: false,
    orgConfig: false,
    gitUpload: false,
  });

  const [azureToggles, setAzureToggles] = useState([
    { label: 'Filter IP Addresses', value: 'Off', checked: false },
    { label: 'Backend OAuth', value: 'Off', checked: false },
    { label: 'Rate Limit (Inbound)', value: 'Off', checked: false },
    { label: 'Cache Responses', value: 'Off', checked: false },
    { label: 'Validate JWT', value: 'Off', checked: false },
    { label: 'Correlation', value: 'Off', checked: false },
  ]);

  const [orgConfigToggles, setOrgConfigToggles] = useState([
    { label: 'Create Org Config', value: 'Off', checked: false },
    { label: 'Create Policies', value: 'Off', checked: false },
  ]);

  const handleSwitchChange = (name) => {
    setSwitches({ ...switches, [name]: !switches[name] });
  };

  const handleToggleChange = (groupName, index) => {
    const group = [...groupName];
    if (groupName === azureToggles && switches.azureComponents) {
      group[index].checked = !group[index].checked;
      group[index].value = group[index].checked ? 'On' : 'Off';
    } else if (groupName === orgConfigToggles && switches.orgConfig) {
      group[index].checked = !group[index].checked;
      group[index].value = group[index].checked ? 'On' : 'Off';
    }
    if (groupName === azureToggles) {
      setAzureToggles(group);
    } else if (groupName === orgConfigToggles) {
      setOrgConfigToggles(group);
    }
  };

  const handleProceed = () => {
    // Navigate to the next form or perform the desired action
    // You can add your logic here
    navigate("/azureconfig");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
        <Typography variant="h6">Task Form</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <CustomToggleSwitch
                    label="Allowed Origins"
                    value={switches.allowedOrigins ? 'On' : 'Off'}
                    checked={switches.allowedOrigins}
                    onChange={() => handleSwitchChange('allowedOrigins')}
                  />
                </TableCell>
                <TableCell>
                  <CustomToggleSwitch
                    label="Azure Components"
                    value={switches.azureComponents ? 'On' : 'Off'}
                    checked={switches.azureComponents}
                    onChange={() => handleSwitchChange('azureComponents')}
                  />
                </TableCell>
                <TableCell>
                  <CustomToggleSwitch
                    label="Org Config & Policies"
                    value={switches.orgConfig ? 'On' : 'Off'}
                    checked={switches.orgConfig}
                    onChange={() => handleSwitchChange('orgConfig')}
                  />
                </TableCell>
                <TableCell>
                  <CustomToggleSwitch
                    label="Git Upload"
                    value={switches.gitUpload ? 'On' : 'Off'}
                    checked={switches.gitUpload}
                    onChange={() => handleSwitchChange('gitUpload')}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {azureToggles.map((toggle, index) => (
                <TableRow key={index}>
                  <TableCell></TableCell>
                  <TableCell>
                    <CustomToggleSwitch
                      label={toggle.label}
                      value={toggle.value}
                      checked={toggle.checked}
                      onChange={() => handleToggleChange(azureToggles, index)}
                    />
                  </TableCell>
                  <TableCell>
                    {index < orgConfigToggles.length ? (
                      <CustomToggleSwitch
                        label={orgConfigToggles[index].label}
                        value={orgConfigToggles[index].value}
                        checked={orgConfigToggles[index].checked}
                        onChange={() => handleToggleChange(orgConfigToggles, index)}
                      />
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={handleProceed}>
          Proceed
        </Button>
      </Box>
      <Box sx={{display: 'none'}}>
        <ConfigurationsForm
          azureComponentsEnabled={switches.azureComponents}
          filterIpAddressesEnabled={azureToggles[0].checked}
          backendOAuthEnabled={azureToggles[1].checked}
          rateLimitEnabled={azureToggles[2].checked}
          cacheResponsesEnabled={azureToggles[3].checked}
          validateJwtEnabled={azureToggles[4].checked}
          correlationEnabled={azureToggles[5].checked}
          createOrgConfigEnabled={orgConfigToggles[0].checked}
          createPoliciesEnabled={orgConfigToggles[1].checked}
          allowedOriginsEnabled={switches.allowedOrigins}
          gitUploadEnabled={switches.gitUpload}
        />
      </Box>
    </Container>
  );
}

export default TaskForm;

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation  } from "react-router-dom";

function ConfigurationsForm() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const [rateLimitConfig, setRateLimitConfig] = useState({
    numberOfCalls: '',
    renewalPeriod: '',
    counterKey: '',
  });

  const [cacheResponseConfig, setCacheResponseConfig] = useState({
    duration: '',
  });

  const [validateJwtConfig, setValidateJwtConfig] = useState({
    headerName: '',
    failedValidationHttpCode: '',
    failedValidationErrorMsg: '',
    openIdUrl: '',
    requiredClaims: [],
  });

  const [correlationConfig, setCorrelationConfig] = useState({
    correlationId: false,
    trace: false,
  });

  const [filterIpAddresses, setFilterIpAddresses] = useState([
    { from: '', to: '' },
  ]);

  const [ipAllowance, setIpAllowance] = useState('allow');

  const [backendOAuthConfig, setBackendOAuthConfig] = useState({
    providedURL: '',
    clientID: '',
    clientSecret: '',
  });

  const handleRateLimitChange = (field, value) => {
    setRateLimitConfig({ ...rateLimitConfig, [field]: value });
  };

  const handleCacheResponseChange = (field, value) => {
    setCacheResponseConfig({ ...cacheResponseConfig, [field]: value });
  };

  const handleValidateJwtChange = (field, value) => {
    setValidateJwtConfig({ ...validateJwtConfig, [field]: value });
  };

  const handleCorrelationChange = (field) => {
    setCorrelationConfig({ ...correlationConfig, [field]: !correlationConfig[field] });
  };

  const handleAddRow = () => {
    // Create a new copy of the requiredClaims array with an additional empty string
    setValidateJwtConfig({
      ...validateJwtConfig,
      requiredClaims: [...validateJwtConfig.requiredClaims, ''],
    });
  };

  const handleClaimChange = (index, value) => {
    // Update the claim value at the specified index
    const updatedClaims = [...validateJwtConfig.requiredClaims];
    updatedClaims[index] = value;
    setValidateJwtConfig({
      ...validateJwtConfig,
      requiredClaims: updatedClaims,
    });
  };

  const handleIpAddressesChange = (index, field, value) => {
    const updatedIpAddresses = [...filterIpAddresses];
    updatedIpAddresses[index][field] = value;
    setFilterIpAddresses(updatedIpAddresses);
  };

  const handleAddIpRow = () => {
    setFilterIpAddresses([...filterIpAddresses, { from: '', to: '' }]);
  };

  const handleRemoveIpRow = (index) => {
    const updatedIpAddresses = [...filterIpAddresses];
    updatedIpAddresses.splice(index, 1);
    setFilterIpAddresses(updatedIpAddresses);
  };

  const handleBackendOAuthChange = (field, value) => {
    setBackendOAuthConfig({ ...backendOAuthConfig, [field]: value });
  };

  const checkFormValidity = (
    state,
    rateLimitConfig,
    cacheResponseConfig,
    validateJwtConfig,
    correlationConfig,
    filterIpAddresses,
    ipAllowance,
    backendOAuthConfig
  ) => {
    const rateLimitValid =
      state.rateLimitEnabled &&
      rateLimitConfig.numberOfCalls !== '' &&
      rateLimitConfig.renewalPeriod !== '' &&
      (rateLimitConfig.counterKey === 'ip_address' || rateLimitConfig.counterKey === 'user_identity');
  
    const cacheResponseValid =
      state.cacheResponsesEnabled && cacheResponseConfig.duration !== '';
  
    const validateJwtValid =
      state.validateJwtEnabled &&
      validateJwtConfig.headerName !== '' &&
      validateJwtConfig.failedValidationHttpCode !== '' &&
      validateJwtConfig.failedValidationErrorMsg !== '' &&
      validateJwtConfig.openIdUrl !== '' &&
      validateJwtConfig.requiredClaims.every((claim) => claim !== '');
  
    const correlationValid = state.correlationEnabled || true; 
  
    const filterIpAddressesValid =
      state.filterIpAddressesEnabled &&
      (ipAllowance === 'deny' || filterIpAddresses.every((ip) => ip.from !== '' && ip.to !== ''));
  
    const backendOAuthValid =
      state.backendOAuthEnabled &&
      backendOAuthConfig.providedURL !== '' &&
      backendOAuthConfig.clientID !== '' &&
      backendOAuthConfig.clientSecret !== '';
  
    const overallValid =
      (!state.rateLimitEnabled || rateLimitValid) &&
      (!state.cacheResponsesEnabled || cacheResponseValid) &&
      (!state.validateJwtEnabled || validateJwtValid) &&
      (!state.correlationEnabled || correlationValid) &&
      (!state.filterIpAddressesEnabled || filterIpAddressesValid) &&
      (!state.backendOAuthEnabled || backendOAuthValid);
  
    return overallValid;
  };
  
  
  const handleProceed = () => {
    const isValid = checkFormValidity(
      state,
      rateLimitConfig,
      cacheResponseConfig,
      validateJwtConfig,
      correlationConfig,
      filterIpAddresses,
      ipAllowance,
      backendOAuthConfig
    );
  
  
    if (isValid) {
      navigate("/genartifacts");
    } 
  };
  

  return (
    <Container maxWidth="md">
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
      { state.rateLimitEnabled && (
        <>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          Rate Limit Configuration
        </Typography>
        <form>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" style={{ flex: 1 }}>No. of calls:</Typography>
                <TextField
                  fullWidth
                  value={rateLimitConfig.numberOfCalls}
                  onChange={(e) => handleRateLimitChange('numberOfCalls', e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" style={{ flex: 1 }}>Renewal Period (seconds):</Typography>
                <TextField
                  fullWidth
                  value={rateLimitConfig.renewalPeriod}
                  onChange={(e) => handleRateLimitChange('renewalPeriod', e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" style={{ flex: 1 }}>Counter Key:</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rateLimitConfig.counterKey === 'ip_address'}
                      onChange={() => handleRateLimitChange('counterKey', 'ip_address')}
                    />
                  }
                  label="IP Address"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rateLimitConfig.counterKey === 'user_identity'}
                      onChange={() => handleRateLimitChange('counterKey', 'user_identity')}
                    />
                  }
                  label="User Identity"
                />
              </div>
              </form>
              </>
          )}
          {state.cacheResponsesEnabled && (
        <>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            Cache Responses Configuration
          </Typography>
          <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>Duration (seconds):</Typography>
            <TextField
              fullWidth
              value={cacheResponseConfig.duration}
              onChange={(e) => handleCacheResponseChange('duration', e.target.value)}
            />
          </div>
          </form>
          </>
          )}
          {state.validateJwtEnabled && (
        <>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            Validate JWT Configuration
          </Typography>
          <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>Header name:</Typography>
            <TextField
              fullWidth
              value={validateJwtConfig.headerName}
              onChange={(e) => handleValidateJwtChange('headerName', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>Failed Validation HTTP Code:</Typography>
            <TextField
              fullWidth
              value={validateJwtConfig.failedValidationHttpCode}
              onChange={(e) => handleValidateJwtChange('failedValidationHttpCode', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>Failed Validation Error Message:</Typography>
            <TextField
              fullWidth
              value={validateJwtConfig.failedValidationErrorMsg}
              onChange={(e) => handleValidateJwtChange('failedValidationErrorMsg', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>OpenID URL:</Typography>
            <TextField
              fullWidth
              value={validateJwtConfig.openIdUrl}
              onChange={(e) => handleValidateJwtChange('openIdUrl', e.target.value)}
            />
          </div>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            Required Claims
          </Typography>
          {validateJwtConfig.requiredClaims.map((claim, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" style={{ flex: 1 }}>Claim {index + 1}:</Typography>
              <TextField
                fullWidth
                value={claim}
                onChange={(e) => handleClaimChange(index, e.target.value)}
              />
            </div>
          ))}
          <Button variant="outlined" onClick={handleAddRow}>
            Add Row
          </Button>
          </form>
          </>
          )}
          {state.correlationEnabled && (
        <>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            Correlation Configuration
          </Typography>
          <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={correlationConfig.correlationId}
                  onChange={() => handleCorrelationChange('correlationId')}
                />
              }
              label="Correlation ID"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={correlationConfig.trace}
                  onChange={() => handleCorrelationChange('trace')}
                />
              }
              label="Trace"
            />
          </div>
          </form>
          </>
          )}
          {state.filterIpAddressesEnabled && (
        <>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            Filter IP Addresses
          </Typography>
          <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>IP Allowance</Typography>
            <Select
              value={ipAllowance}
              onChange={(e) => setIpAllowance(e.target.value)}
            >
              <MenuItem value="allow">Allow</MenuItem>
              <MenuItem value="deny">Deny</MenuItem>
            </Select>
          </div>
          {filterIpAddresses.map((ip, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subtitle1" style={{ flex: 1 }}>IP Address from</Typography>
              <TextField
                fullWidth
                value={ip.from}
                onChange={(e) => handleIpAddressesChange(index, 'from', e.target.value)}
              />
              <Typography variant="subtitle1" style={{ flex: 1 }}>IP Address to</Typography>
              <TextField
                fullWidth
                value={ip.to}
                onChange={(e) => handleIpAddressesChange(index, 'to', e.target.value)}
              />
              <Button variant="outlined" onClick={() => handleRemoveIpRow(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outlined" onClick={handleAddIpRow}>
            Add Row
          </Button>
          </form>
          </>
          )}
          {state.backendOAuthEnabled && (
        <>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            Backend OAuth
          </Typography>
          <form>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>Provided URL</Typography>
            <TextField
              fullWidth
              value={backendOAuthConfig.providedURL}
              onChange={(e) => handleBackendOAuthChange('providedURL', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>Client ID</Typography>
            <TextField
              fullWidth
              value={backendOAuthConfig.clientID}
              onChange={(e) => handleBackendOAuthChange('clientID', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ flex: 1 }}>Client Secret</Typography>
            <TextField
              fullWidth
              value={backendOAuthConfig.clientSecret}
              onChange={(e) => handleBackendOAuthChange('clientSecret', e.target.value)}
            />
          </div>
        </form>
        </>
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={handleProceed} >
          Proceed
        </Button>
    </Container>
  );
}

export default ConfigurationsForm;

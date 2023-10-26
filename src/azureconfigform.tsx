import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';

interface RateLimitConfig {
  numberOfCalls: string;
  renewalPeriod: string;
  counterKey: string;
}

interface CacheResponseConfig {
  duration: string;
}

interface ValidateJwtConfig {
  headerName: string;
  failedValidationHttpCode: string;
  failedValidationErrorMsg: string;
  openIdUrl: string;
  requiredClaims: string[];
}

interface CorrelationConfig {
  correlationId: boolean;
  trace: boolean;
}

interface IpAddress {
  from: string;
  to: string;
}

interface BackendOAuthConfig {
  providedURL: string;
  clientID: string;
  clientSecret: string;
}

interface tabProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

function ConfigurationsForm({ activeTab, setActiveTab }: tabProps) {
  useEffect(() => {
    setActiveTab(4);
  }, [setActiveTab]);

  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const [rateLimitConfig, setRateLimitConfig] = useState<RateLimitConfig>({
    numberOfCalls: '',
    renewalPeriod: '',
    counterKey: '',
  });

  const [cacheResponseConfig, setCacheResponseConfig] = useState<CacheResponseConfig>({
    duration: '',
  });

  const [validateJwtConfig, setValidateJwtConfig] = useState<ValidateJwtConfig>({
    headerName: '',
    failedValidationHttpCode: '',
    failedValidationErrorMsg: '',
    openIdUrl: '',
    requiredClaims: [],
  });

  const [correlationConfig, setCorrelationConfig] = useState<CorrelationConfig>({
    correlationId: false,
    trace: false,
  });

  const [filterIpAddresses, setFilterIpAddresses] = useState<IpAddress[]>([{ from: '', to: '' }]);

  const [ipAllowance, setIpAllowance] = useState<string>('allow');

  const [backendOAuthConfig, setBackendOAuthConfig] = useState<BackendOAuthConfig>({
    providedURL: '',
    clientID: '',
    clientSecret: '',
  });

  const handleRateLimitChange = (field: keyof RateLimitConfig, value: string) => {
    setRateLimitConfig({ ...rateLimitConfig, [field]: value });
  };

  const handleCacheResponseChange = (field: keyof CacheResponseConfig, value: string) => {
    setCacheResponseConfig({ ...cacheResponseConfig, [field]: value });
  };

  const handleValidateJwtChange = (field: keyof ValidateJwtConfig, value: string) => {
    setValidateJwtConfig({ ...validateJwtConfig, [field]: value });
  };

  const handleCorrelationChange = (field: keyof CorrelationConfig) => {
    setCorrelationConfig({ ...correlationConfig, [field]: !correlationConfig[field] });
  };

  const handleAddRow = () => {
    setValidateJwtConfig({
      ...validateJwtConfig,
      requiredClaims: [...validateJwtConfig.requiredClaims, ''],
    });
  };

  const handleClaimChange = (index: number, value: string) => {
    const updatedClaims = [...validateJwtConfig.requiredClaims];
    updatedClaims[index] = value;
    setValidateJwtConfig({
      ...validateJwtConfig,
      requiredClaims: updatedClaims,
    });
  };

  const handleRemoveClaimRow = (index: number) => {
    const updatedClaims = [...validateJwtConfig.requiredClaims];
    updatedClaims.splice(index, 1);
    setValidateJwtConfig({
      ...validateJwtConfig,
      requiredClaims: updatedClaims,
    });
  };

  const handleIpAddressesChange = (index: number, field: keyof IpAddress, value: string) => {
    const updatedIpAddresses = [...filterIpAddresses];
    updatedIpAddresses[index][field] = value;
    setFilterIpAddresses(updatedIpAddresses);
  };

  const handleAddIpRow = () => {
    setFilterIpAddresses([...filterIpAddresses, { from: '', to: '' }]);
  };

  const handleRemoveIpRow = (index: number) => {
    const updatedIpAddresses = [...filterIpAddresses];
    updatedIpAddresses.splice(index, 1);
    setFilterIpAddresses(updatedIpAddresses);
  };

  const handleBackendOAuthChange = (field: keyof BackendOAuthConfig, value: string) => {
    setBackendOAuthConfig({ ...backendOAuthConfig, [field]: value });
  };

  const checkFormValidity = (
    state: any,
    rateLimitConfig: RateLimitConfig,
    cacheResponseConfig: CacheResponseConfig,
    validateJwtConfig: ValidateJwtConfig,
    correlationConfig: CorrelationConfig,
    filterIpAddresses: IpAddress[],
    ipAllowance: string,
    backendOAuthConfig: BackendOAuthConfig
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
      validateJwtConfig.openIdUrl !== '' ;
      

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
    else{
      alert("Please fill all mandatory fields");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
      <Box sx={{ padding: 2, border: '1px solid #ccc', backgroundColor: '#f9f9f9', marginTop: 2 }}>
      {state.rateLimitEnabled && (
        <Box sx={{ alignItems: 'center', border: '0.5px solid #cccccc78', padding: 1 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', padding: 1}}>
            Rate Limit Configuration
          </Typography>
          <form>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Box sx={{ flex: 1, marginRight: 2 }}>
                <Typography variant="h6">No. of calls <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  sx={{ width: '100%' }}
                  value={rateLimitConfig.numberOfCalls}
                  onChange={(e) => handleRateLimitChange('numberOfCalls', e.target.value)}
                />
              </Box>
              <Box sx={{ flex: 1, marginRight: 2 }}>
                <Typography variant="h6">Renewal Period (seconds)<span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  sx={{ width: '100%' }}
                  value={rateLimitConfig.renewalPeriod}
                  onChange={(e) => handleRateLimitChange('renewalPeriod', e.target.value)}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }}>Counter Key <span style={{ color: 'red' }}>*</span></Typography>
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
            </Box>
          </form>
        </Box>
      )}

      {state.cacheResponsesEnabled && (
        <Box sx={{ alignItems: 'center', border: '0.5px solid #cccccc78',  padding: 1 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            Cache Responses Configuration
          </Typography>
          <form>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }} >Duration (seconds):</Typography>
              <TextField
                fullWidth
                value={cacheResponseConfig.duration}
                onChange={(e) => handleCacheResponseChange('duration', e.target.value)}
              />
            </Box>
          </form>
        </Box>
      )}

      {state.validateJwtEnabled && (
        <Box sx={{ alignItems: 'center', border: '0.5px solid #cccccc78',  padding: 1 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            Validate JWT Configuration
          </Typography>
          <form>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }}>Header name <span style={{ color: 'red' }}>*</span></Typography>
              <TextField
                fullWidth
                value={validateJwtConfig.headerName}
                onChange={(e) => handleValidateJwtChange('headerName', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }}>Failed Validation HTTP Code <span style={{ color: 'red' }}>*</span></Typography>
              <TextField
                fullWidth
                value={validateJwtConfig.failedValidationHttpCode}
                onChange={(e) => handleValidateJwtChange('failedValidationHttpCode', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }}>Failed Validation Error Message <span style={{ color: 'red' }}>*</span></Typography>
              <TextField
                fullWidth
                value={validateJwtConfig.failedValidationErrorMsg}
                onChange={(e) => handleValidateJwtChange('failedValidationErrorMsg', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }}>OpenID URL <span style={{ color: 'red' }}>*</span></Typography>
              <TextField
                fullWidth
                value={validateJwtConfig.openIdUrl}
                onChange={(e) => handleValidateJwtChange('openIdUrl', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }}>
                Required Claims
              </Typography>
              <Button variant="outlined" onClick={handleAddRow} sx={{ marginTop: 1, marginBottom: 1 }}>
                Add Row
              </Button>
            </Box>
            {validateJwtConfig.requiredClaims.map((claim, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Box sx={{ flex: 1, marginRight: 2 }}>
                  <Typography variant="h6" sx={{ width: '450px' }}>
                    Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={claim}
                    onChange={(e) => handleClaimChange(index, e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: 1, marginRight: 2 }}>
                  <Typography variant="h6" sx={{ width: '150px' }}>
                    Match
                  </Typography>
                  <Select
                    fullWidth
                    value={claim}
                    onChange={(e) => handleClaimChange(index, e.target.value)}
                  >
                    <MenuItem value="All claims">All claims</MenuItem>
                    <MenuItem value="Any claims">Any claims</MenuItem>
                  </Select>
                </Box>
                <Button
                  sx={{ marginTop: 4}}
                  variant="outlined"
                  color="primary"
                  onClick={() => handleRemoveClaimRow(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </form>
        </Box>
      )}

      {state.correlationEnabled && (
        <Box sx={{ alignItems: 'center',border: '0.5px solid #cccccc78',  padding: 1 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            Correlation Configuration
          </Typography>
          <form>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '400px' }}></Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={correlationConfig.correlationId}
                    onChange={() => handleCorrelationChange('correlationId')}
                  />
                }
                label="Correlation ID"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={correlationConfig.trace}
                    onChange={() => handleCorrelationChange('trace')}
                  />
                }
                label="Trace"
              />
            </Box>
          </form>
        </Box>
      )}

      {state.filterIpAddressesEnabled && (
        <Box sx={{ alignItems: 'center', border: '0.5px solid #cccccc78',  padding: 1 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            Filter IP Addresses
          </Typography>
          <form>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ width: '450px' }}>IP Allowance <span style={{ color: 'red' }}>*</span></Typography>
              <Select
                sx={{ width: '100%' }}
                value={ipAllowance}
                onChange={(e) => setIpAllowance(e.target.value as string)}
              >
                <MenuItem value="allow">Allow</MenuItem>
                <MenuItem value="deny">Deny</MenuItem>
              </Select>
            </Box>
            {filterIpAddresses.map((ip, index) => (
              <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                <Box key={index} sx={{ flex: 1, marginRight: 2 }}>
                  <Typography variant="h6"  >IP Address from</Typography>
                  <TextField
                    fullWidth
                    value={ip.from}
                    onChange={(e) => handleIpAddressesChange(index, 'from', e.target.value)}
                  />
                </Box>
                <Box key={index} sx={{ flex: 1, marginRight: 2 }}>
                  <Typography variant="h6" >IP Address to</Typography>
                  <TextField
                    fullWidth
                    value={ip.to}
                    onChange={(e) => handleIpAddressesChange(index, 'to', e.target.value)}
                  />
                </Box>
                <Button variant="outlined" onClick={() => handleRemoveIpRow(index)} sx={{ marginTop: 4}}>
                  Remove
                </Button>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button variant="outlined" color="primary" onClick={handleAddIpRow}>
                Add Row
              </Button>
            </Box>
          </form>
        </Box>
      )}

      {state.backendOAuthEnabled && (
        <Box sx={{ alignItems: 'center', border: '0.5px solid #cccccc78',  padding: 1 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            Backend OAuth
          </Typography>
          <form>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: 1, marginRight: 2 }}>
                <Typography variant="h6" >Provided URL <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  fullWidth
                  value={backendOAuthConfig.providedURL}
                  onChange={(e) => handleBackendOAuthChange('providedURL', e.target.value)}
                />
              </Box>
              <Box sx={{ flex: 1, marginRight: 2 }}>
                <Typography variant="h6" >Client ID <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  fullWidth
                  value={backendOAuthConfig.clientID}
                  onChange={(e) => handleBackendOAuthChange('clientID', e.target.value)}
                />
              </Box>
              <Box sx={{ flex: 1, marginRight: 2 }}>
                <Typography variant="h6" >Client Secret <span style={{ color: 'red' }}>*</span></Typography>
                <TextField
                  fullWidth
                  value={backendOAuthConfig.clientSecret}
                  onChange={(e) => handleBackendOAuthChange('clientSecret', e.target.value)}
                />
              </Box>
            </Box>
          </form>
        </Box>
      )}
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

export default ConfigurationsForm;

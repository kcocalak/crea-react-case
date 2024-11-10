import * as React from 'react';
import Box from '@mui/material/Box';
import CustomTypography from '../Typography';

export function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box
          >
            <CustomTypography>{children}</CustomTypography>
          </Box>
        )}
      </div>
    );
  }
import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './CustomTypography.module.scss';

const CustomTypography = (props) => {
  const { children, variant, fontWeight, color="#1A1D1F" } = props;
  return (
    <Typography {...props} className={`${styles.typography} ${styles[variant]} `} style={{ fontWeight }} color={color}>
      {children}
    </Typography>
  );
};

export default CustomTypography;
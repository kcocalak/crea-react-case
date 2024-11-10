import React from "react";
import Button from '@mui/material/Button';
import styles from "./CustomButton.module.scss";
import CircularProgress  from "@mui/material/CircularProgress";

const CustomButton = (props) => {
    const {
        children,
        buttonType = "primary",
        buttonSize = "lg",
        loading = false,
        minWidth = "none",
        className,
        margin,
      } = props;
  return (
    <div>
        <Button
          {...props}
          style={{ minWidth, margin }}
          className={`
        ${styles.button} 
        ${styles[buttonType]} 
        ${styles[buttonSize]} 
        ${loading ? styles.loading : ""} 
        ${className ? className : ""}
      `}
        >
          {loading ? <CircularProgress size={16} /> : children}
        </Button>
    </div>
  )
}

export default CustomButton
import React from "react";
import Grid from "@mui/material/Grid2";
import { useAuth } from "../Auth/AuthProvider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import logo from "../../assets/logo.svg";
import Categories from "./Categories";
import styles from "./Header.module.scss";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logOut } = useAuth();
  const user = localStorage.getItem("username");

  const handleLogout = () => {
    logOut();
    handleClose();
  };
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className={styles.container}>
      <Grid container justifyContent="space-between">
        <Grid size={12}>
          <div className={styles.header}>
            <div className={styles.wrapper}>
              <div className={styles.item}>
                <img src={logo} alt="logo" width={100} height={50} />
                <IconButton
                  onClick={handleAvatarClick}
                  size="small"
                  className={styles.avatarButton}
                >
                  <Avatar className={styles.avatar}>{user?.slice(0, 1)}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
              <Categories />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;

import {
  Drawer,
  Box,
  Typography,
  useMediaQuery,
  Button,
  Backdrop,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { closeMenu } from "../../redux/reducers/menuSlice";
import Link from "next/link";

const NavBar = () => {
  const menu = useSelector((state: RootState) => state.menu.open) as boolean;
  const mobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();

  return (
    <Drawer
      open={menu}
      anchor={mobile ? "bottom" : "left"}
      onClose={() => {
        dispatch(closeMenu());
      }}
      BackdropProps={{ invisible: true }}
    >
      <Box className={styles.navbar__container}>
        <Link href={"/dashboard"}>
          <Typography>Home</Typography>
        </Link>
        {mobile ? (
          <Box>
            <Typography>Stream Controller</Typography>
          </Box>
        ) : null}
      </Box>

      <Button
        onClick={() => {
          dispatch(closeMenu());
        }}
      >
        Close Menu
      </Button>
    </Drawer>
  );
};

export default NavBar;

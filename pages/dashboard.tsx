import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../redux/reducers/menuSlice";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []); //eslint-disable-line

  return <Dashboard />;
};

export default DashboardPage;

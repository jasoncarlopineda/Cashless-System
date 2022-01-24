import "../semantic-ui-css/semantic.min.css";

import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../actions";
import { DashboardLayout } from "./Dashboard/DashboardLayout";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

export const App = () => {

  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(dispatch, location);
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Segment color="blue" style={{ height: "100vh" }} loading></Segment>
      ) : (
        <DashboardLayout></DashboardLayout>
      )}
    </Fragment>
  );
};

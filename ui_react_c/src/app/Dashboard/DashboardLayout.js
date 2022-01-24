import React, { Fragment } from "react";

import { Dropdown, Icon, Menu, Label } from "semantic-ui-react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { history } from "../..";
import { authSignOut } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { DashboardContent } from "./DashboardContent";
import { UserContent } from "../Users/UserContent";
import { StoreHome } from "../Store/StoreHome";

export const DashboardLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Menu style={{}}>
        <Menu.Menu position="right">
          <Dropdown item text={user.name}>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  authSignOut(dispatch);
                }}
              >
                {" "}
                <Icon name="sign-out" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>

      <Menu
        inverted
        vertical
        style={{
          height: "100vh",
          position: "absolute",
          margin: "0",
          top: "0",
          backgroundColor: "#0d47a1",
        }}
      >
        <Menu.Item style={{ marginBottom: "2.5px" }}>
          <span
            style={{ fontWeight: "bold", fontSize: "10px", color: "#42a5f5" }}
          >
            CASHLESS SYSTEM
          </span>
        </Menu.Item>

        <NavLink to="/dashboard" activeClassName="link-active">
          <Menu.Item>
            <Icon name="grid layout" />
            <span style={{ color: "rgba(255,255,255, .65)" }}>Dashboard</span>
          </Menu.Item>
        </NavLink>

        {["admin"].includes(user.role) && (
          <>
            <NavLink to="/users" activeClassName="link-active">
              <Menu.Item>
                <Icon name="users" />
                <span style={{ color: "rgba(255,255,255, .65)" }}>Users</span>
              </Menu.Item>
            </NavLink>

            <NavLink to="/shop" activeClassName="link-active">
              <Menu.Item>
                <Icon name="shopping cart" />
                <span style={{ color: "rgba(255,255,255, .65)" }}>Shop</span>
              </Menu.Item>
            </NavLink>
          </>
        )}
      </Menu>

      <div style={{ marginLeft: "16rem", paddingRight: "1em" }}>
        <Switch>
          <Route path="/dashboard" component={DashboardContent} />
          <Route path="/users" component={UserContent} />
          <Route path="/shop" component={StoreHome} />
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
};

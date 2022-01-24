import React from "react";
import { Route, Switch } from "react-router-dom";
import { Breadcrumb, Button, Grid, Icon, Table } from "semantic-ui-react";
import { history } from "../..";
import { StudentRfid } from "./StudentRfid";
import { UserCreate } from "./UserCreate";
import { UserList } from "./UserList";

export const UserContent = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <Breadcrumb size="large">
            <Breadcrumb.Section
              link
              onClick={() => {
                history.push("/users");
              }}
            >
              <b>Users</b>
            </Breadcrumb.Section>

            <Route
              path="/users/create"
              render={() => {
                return (
                  <>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section>Create</Breadcrumb.Section>
                  </>
                );
              }}
            />

            <Route
              path="/users/students/:id/rfid"
              render={() => {
                return (
                  <>
                    <Breadcrumb.Divider icon="right chevron" />
                    <Breadcrumb.Section>RFID</Breadcrumb.Section>
                  </>
                );
              }}
            />
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width="16">
          <Switch>
            <Route path="/users/students/:id/rfid" component={StudentRfid} />
            <Route path="/users/create" component={UserCreate} />
            <Route path="/users" component={UserList} />
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

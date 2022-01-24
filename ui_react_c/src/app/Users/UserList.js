import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Icon, Label, Popup, Tab, Table } from "semantic-ui-react";
import { history } from "../..";
import agent from "../../agent";

export const UserList = () => {
  const { user } = useSelector((state) => state.auth);

  const [userList, setUserList] = useState([]);

  const [paginationData, setPaginationData] = useState({
    activePage: 1,
    totalPage: 1,
  });

  const loadUserList = async (page) => {
    const response = await agent.User.list(page);

    setUserList(response.data);
    setPaginationData({
      activePage: page,
      totalPage: response.last_page,
    });
  };

  useEffect(() => {
    if (user.name) loadUserList(1);
  }, [user]);

  return (
    <>
      <Button
        size="tiny"
        icon
        labelPosition="left"
        onClick={() => {
          history.push("/users/create");
        }}
      >
        <Icon name="plus" />
        CREATE
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {userList.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan="100%">No records</Table.Cell>
            </Table.Row>
          )}

          {userList.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.phone_number}</Table.Cell>
              <Table.Cell>
                {item.role === "admin" && (
                  <Label color="green">{item.role}</Label>
                )}
                {item.role === "student" && (
                  <Label color="olive">{item.role}</Label>
                )}
              </Table.Cell>

              <Table.Cell>
                {item.role === "student" && (
                  <>
                    <Popup
                      content="RFID"
                      trigger={
                        <Button
                          circular
                          icon="credit card alternative"
                          color="blue"
                          onClick={() => {
                            history.push(`/users/students/${item.id}/rfid`);
                          }}
                        />
                      }
                    />
                  </>
                )}
                {item.role === "admin" && <>-</>}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

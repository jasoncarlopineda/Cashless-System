import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Grid, Icon, Statistic } from "semantic-ui-react";
import agent from "../../agent";
import { toMoney } from "../../helpers";

export const DashboardContent = () => {
  const { user } = useSelector((state) => state.auth);

  const [student, setStudent] = useState(null);


  const loadStudent = async () => {

    const response = await agent.Student.find(user.id);
    setStudent(response);

  };

  useEffect(() => {
    if(user.id)
    loadStudent();
  }, []);

  return (
    <Grid>
      <Grid.Column width={5}>
        {["admin"].includes(user.role) && (
          <Card fluid>
            <Card.Content>
              <Statistic style={{ width: "100%" }}>
                <Statistic.Value>
                  <Icon name="users"></Icon>11
                </Statistic.Value>
                <Statistic.Label>USERS</Statistic.Label>
              </Statistic>
            </Card.Content>
          </Card>
        )}

        {["student"].includes(user.role) && (
          <Card fluid>
            <Card.Content>
              <Statistic style={{ width: "100%" }}>
                <Statistic.Value>
                  <Icon name="money bill alternate"></Icon>
                  {toMoney(student && student.rfid ? parseFloat(student.rfid.balance) : 0)}
                </Statistic.Value>
                <Statistic.Label>BALANCE</Statistic.Label>
              </Statistic>
            </Card.Content>
          </Card>
        )}
      </Grid.Column>
    </Grid>
  );
};

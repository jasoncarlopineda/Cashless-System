import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Dimmer,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  List,
  Loader,
  Table,
} from "semantic-ui-react";
import { toMoney } from "../../helpers";
import { history } from "../..";
import { ErrorMessage } from "../Commons/ErrorMessage";
import agent from "../../agent";

export const StoreHome = () => {
  const products = [
    {
      id: 1,
      name: "Juice",
      price: 15,
    },
    {
      id: 2,
      name: "Coke",
      price: 25,
    },
    {
      id: 3,
      name: "bread",
      price: 20,
    },
    {
      id: 4,
      name: "Biscuit",
      price: 10,
    },
    {
      id: 5,
      name: "Chocolate",
      price: 13.25,
    },
  ];

  const [cartList, setCartList] = useState([]);
  const [formValues, setFormValues] = useState({ rfid: "" });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const countTotal = () => {
    let total = 0;

    cartList.forEach((i) => {
      total += i.price * i.qty;
    });

    return total;
  };

  const addToCart = (item) => {
    if (cartList.filter((a) => a.id === item.id).length === 0) {
      setCartList([...cartList, { ...item, qty: 1 }]);
      return;
    }

    setCartList(
      cartList.map((a) => {
        if (a.id === item.id) {
          a.qty += 1;
        }

        return a;
      })
    );
  };

  const handleInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (cartList.length === 0) {
      alert("Cart is empty!");
      return;
    }

    let success = false;
    setLoading(true);
    setFormErrors(null);
    try {
      await agent.Rfid.reduce({
        total: countTotal(),
        rfid: formValues.rfid,
      });
      success = true;
    } catch (err) {
      setFormErrors(err.data.errors);
    } finally {
      setLoading(false);
      if (success) {
        setCartList([]);
        setFormValues({
          rfid: "",
        });
        alert("Payment successfully processed!");
      }
    }
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Breadcrumb size="large">
            <Breadcrumb.Section
              link
              onClick={() => {
                history.push("/shop");
              }}
            >
              <b>Shop</b>
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>

      {formErrors && (
        <Grid.Row>
          <Grid.Column width={16}>
            <ErrorMessage errors={formErrors} />
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row style={{ paddingTop: "0" }}>
        <Grid.Column width={8}>
          <Dimmer active={loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          <Card fluid>
            <Card.Content>
              <Card.Header>
                <Icon name="cart" /> Cart
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Form onSubmit={onFormSubmit}>
                <Form.Input
                  fluid
                  placeholder="RFID"
                  name="rfid"
                  value={formValues.rfid}
                  onChange={handleInput}
                />
              </Form>
            </Card.Content>
            <Card.Content style={{ minHeight: "400px" }}>
              {cartList.length === 0 && (
                <Label size="small">CART IS EMPTY</Label>
              )}

              <List divided relaxed>
                {cartList.map((item) => (
                  <List.Item key={item.id}>
                    <List.Icon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCartList(cartList.filter((a) => a.id !== item.id));
                      }}
                      name="remove circle"
                      size="small"
                      color="red"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header>
                        {item.name} <Label circular>{item.qty}</Label>
                      </List.Header>
                      <List.Description as="a">
                        {toMoney(item.price * item.qty)}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Card.Content>
            <Card.Content>
              <span style={{ color: "grey" }}>TOTAL</span>
              <span
                style={{ float: "right", fontWeight: "bold", fontSize: "21px" }}
              >
                {toMoney(countTotal())}
              </span>
            </Card.Content>
          </Card>

          <Button
            size="small"
            icon
            labelPosition="left"
            onClick={() => {
              setCartList([]);
            }}
          >
            Clear Cart
            <Icon name="erase" />
          </Button>
        </Grid.Column>

        <Grid.Column width={8}>
          <Dimmer active={loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          <Card fluid>
            <Card.Content>
              <Card.Header>
                <Icon name="tags" /> Items
              </Card.Header>
            </Card.Content>
            <Card.Content style={{ minHeight: "516px" }}>
              <Table singleLine>
                <Table.Body>
                  {products.map((item, i) => (
                    <Table.Row key={i}>
                      <Table.Cell width={13}>
                        {item.name}
                        <div>
                          <b>{toMoney(item.price)}</b>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          icon
                          color="yellow"
                          labelPosition="left"
                          size="mini"
                          onClick={() => addToCart(item)}
                        >
                          To Cart
                          <Icon name="cart plus" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

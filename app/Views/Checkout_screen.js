import React, { Component } from 'react';
import { TouchableOpacity } from "react-native";
import { Container, Content, Label, Card, CardItem, Text, Icon, Left, Body, Right, Footer, Input, Item, Form, Picker, Thumbnail, List, ListItem } from 'native-base';
import axios from 'axios';

export default class Checkout_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1:[],
      selected: 0
    };
    // const { navigation } = this.props;
    // this.totalharga = navigation.getParam("totalharga", "NO-ID");
    console.warn(this.state.selected)
  }

  total_price() {
    var sum = 0;
    for (var i = 0; i < this.state.data1.length; i++) {
      const total = this.state.data1[i].price_products * this.state.data1[i].quantity
      sum += total
    }
    return (parseFloat(sum) + parseFloat(this.state.selected)).toFixed(2);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
      .then(res => {
        const orders = res;
        this.setState({ data1: orders.data });
      })
  }

  static navigationOptions = {
    headerTitle: 'Payment',
  };

  render() {
    return (
      <Container>
        <Content style={{backgroundColor:'#CCC'}}>
          <Card>
            <CardItem header>
              <Text>Your data</Text>
            </CardItem>
            <Form>
              <Item >
                <Input placeholder='Full name' />
              </Item>
              <Item >
                <Input placeholder='Email' />
              </Item>
              <Item>
                <Input placeholder='Address' />
              </Item>
            </Form>
          </Card>


          <Card>
            <CardItem header>
              <Text>Your Cart List</Text>
            </CardItem>
            <List>
              {this.state.data1.map((data, index) => {
                return (
                  <ListItem square thumbnail key={index}>
                    <Left>
                      <Thumbnail square small source={{ uri: data.image_products }} />
                    </Left>
                    <Body>
                      <Text>{data.name_products}</Text>
                      <Text note>Qty : {data.quantity} | Price : $ {data.price_products}</Text>
                    </Body>
                    <Right>
                      <Text note> Amount :</Text>
                      <Text note>$ {data.price_products * data.quantity}</Text>
                    </Right>
                  </ListItem>
                )
              })}
            </List>
          </Card>

          <Card>
            <CardItem header>
              <Text>Select Courier</Text>
            </CardItem>
            
            <Form style={{paddingLeft:10, width:'70%'}}>
              <Picker
                selectedValue={this.state.selected}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                headerBackButtonText="Baaack!"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ selected: itemValue })
                }
              >
                <Picker.Item label="Pilih" value="pilih" />
                <Picker.Item label="JNE - $10" value="10" />
                <Picker.Item label="TIKI - $5" value="5" />
                <Picker.Item label="JD ID - $9" value="9" />
                <Picker.Item label="GO-JEK - $10" value="10" />
                <Picker.Item label="POS INDONESIA - $3" value="3" />
              </Picker>
            </Form>

          </Card>

          <Card>
            <CardItem footer bordered>
              <Text style={{ color: "#ed4343" }}>Total Payment : $ {this.total_price()}</Text>
            </CardItem>
          </Card>
        </Content>
        <TouchableOpacity onPress={() => {
          axios.delete(`http://192.168.43.108:3333/api/v1/orders/`)
          .then(res => {
            axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
              .then(res => {
                const orders = res;
                this.setState({ data4: orders.data });
              })
            })
          }}>
          <Footer style={{ backgroundColor: 'red' }}>
            <Text style={{ marginTop: 15, justifyContent: 'center', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Pay Now</Text>
          </Footer>
        </TouchableOpacity>
      </Container>
    )
  }
}
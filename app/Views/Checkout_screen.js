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
    // console.warn(this.state.selected)
  }

  total_price() {
    var sum = 0;
    for (var i = 0; i < this.state.data1.length; i++) {
      const total = this.state.data1[i].price_products * this.state.data1[i].quantity
      sum += total
    }
    return (parseFloat(sum) + parseFloat(this.state.selected)).toFixed(2);
  }

  sub_total_price() {
    var sum = 0;
    for (var i = 0; i < this.state.data1.length; i++) {
      const total = this.state.data1[i].price_products * this.state.data1[i].quantity
      sum += total
    }
    return (parseFloat(sum)).toFixed(2);
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
        <Content style={{backgroundColor:"#CCC"}}>
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
                <Picker.Item label="Select courier" value="pilih" />
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
              <Text>Order Summary</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Sub total {this.state.data1.reduce(function (prev, cur) {
                  return prev + cur.quantity;
                }, 0)} item</Text>
              </Left>
              <Right>
                <Text note>$ {this.sub_total_price()}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
              {this.state.selected === 0 ? <Text>
                Please Select Courier</Text> : <Text>Shipping</Text> }
              </Left>
              <Right>
                <Text note>$ {this.state.selected}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text style={{ fontWeight: 'bold' }}>Total Payment : </Text>
              </Left>
              <Right>
                <Text style={{ fontWeight: 'bold' }}>$ {this.total_price()}</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
        <TouchableOpacity onPress={() => {
          if (this.state.selected === 0) {
            alert("Select courier first")
          } else {
            this.props.navigation.navigate("Purchase", {
              kurir: this.state.selected
            })
          }
          }}>
          <Footer style={{ backgroundColor: '#FF5A09' }}>
            <Text style={{ marginTop: 15, justifyContent: 'center', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Checkout</Text>
          </Footer>
        </TouchableOpacity>
      </Container>
    )
  }
}
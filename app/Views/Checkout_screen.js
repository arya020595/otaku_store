import React, { Component } from 'react';
import { TouchableOpacity } from "react-native";
import { Container, Content, Card, CardItem, Text, Icon, Left, Body, Right, Footer, Input, Item, Form, Picker, Thumbnail, List, ListItem } from 'native-base';

export default class Checkout_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key3"
    };
    

    // const { navigation } = this.props;
    // this.totalharga = navigation.getParam("totalharga", "NO-ID");
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
  
  onValueChange(key0) {
    this.setState({
      selected: key0
    });
  }

  static navigationOptions = {
    headerTitle: 'Payment',
  };

  render() {

    return (
      <Container>
        <Content>
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
              {products.map((data, index) => {
                return (
                  <ListItem square thumbnail key={index}>
                    <Left>
                      <Thumbnail square small source={{ uri: data.img }} />
                    </Left>
                    <Body>
                      <Text>{data.judul_anime}</Text>
                      {/* <Text note>Doing what you like will always keep you happy . .</Text> */}
                    </Body>
                    <Right>
                      <Text note>$ {data.harga_anime}</Text>
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


            <Form>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                headerBackButtonText="Baaack!"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label="JNE" value="key0" />
                <Picker.Item label="TIKI" value="key1" />
                <Picker.Item label="JD ID" value="key2" />
                <Picker.Item label="GO-JEK" value="key3" />
                <Picker.Item label="POS INDONESIA" value="key4" />
              </Picker>
            </Form>

          </Card>

          <Card>
            <CardItem footer bordered>
              <Text style={{ color: "#ed4343" }}>Total Payment : $ {this.totalharga}</Text>
            </CardItem>
          </Card>
        </Content>
        <TouchableOpacity>
          <Footer style={{ backgroundColor: 'red' }}>
            <Text style={{ marginTop: 15, justifyContent: 'center', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Pay Now</Text>
          </Footer>
        </TouchableOpacity>
      </Container>
    )
  }
}
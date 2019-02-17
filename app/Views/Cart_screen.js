import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Card, CardItem, Text, Button, Footer, Label } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import { dataProducts } from '../Faker/Faker'

export default class Cart_screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data3: [],
      data4: [],
      total: 0
    }
  }

  componentDidMount() {
    axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
      .then(res => {
        const orders = res;
        this.setState({ data4: orders.data });
      })
  }

  delete = id => {
    axios.delete(`http://192.168.43.108:3333/api/v1/orders/${id}`).then(res => {
      axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
        .then(res => {
          const orders = res;
          this.setState({ data4: orders.data });
        })
    }).catch(error => {
      alert(error)
    })
  }

  static navigationOptions = {
    headerTitle: 'Cart List',
  };

  total_price() {
    var sum = 0;
    for (var i = 0; i < this.state.data4.length; i++) {
      const total = this.state.data4[i].price_products * this.state.data4[i].quantity
      sum += total
    }
    return parseFloat(sum).toFixed(2);
  }



  // total_quantity() {
  //   var sum = 0;
  //   for (var i = 0; i < this.state.data.length; i++) {
  //     sum += this.state.data[i].quantity;
  //   }
  //   return sum
  // }

  render() {
    return (
      <Container>
        <Content>
          {this.state.data4.map((data, index) => {
            return (
              <Card key={index}>
                <CardItem>
                  <Grid>
                    <Row>
                      <Col style={{ width: 140 }}>
                        <Image
                          source={{
                            uri: data.image_products
                          }}
                          style={{ flex: 1, height: 100 }}
                        />
                      </Col>

                      <Col style={{ paddingLeft: 10 }}>
                        <Text style={styles.title_products}>
                          {data.name_products}
                        </Text>

                        <Text style={{ fontWeight: "bold", marginTop: 8 }}>Price :</Text>
                        <Text style={styles.price}>$ {data.price_products}</Text>

                        <Label style={{ marginTop: 8, marginBottom: 3 }}>Quantity :</Label>
                        <Row style={{ marginBottom: 10, }}>
                          <Col><Button onPress={() => {
                            const orders = {
                              quantity: data.quantity - 1
                            };
                            if (quantity === 0) {
                              this.delete(data.id)
                            } else {
                              axios.patch(`http://192.168.43.108:3333/api/v1/orders/${data.id}`, orders)
                                .then(res => {
                                  axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
                                    .then(res => {
                                      const orders = res;
                                      this.setState({ data4: orders.data });
                                    })
                                })
                            }
                          }}><Text>-</Text></Button>
                          </Col>
                          <Col>
                            <Button style={{ backgroundColor: "#FFF", borderColor: "#CCC", borderWidth: 1, }}><Text style={{ color: "#333" }}>{data.quantity}</Text></Button>
                          </Col>
                          <Col>
                            <Button onPress={() => {
                              const orders = {
                                quantity: data.quantity + 1
                              };
                              axios.patch(`http://192.168.43.108:3333/api/v1/orders/${data.id}`, orders)
                                .then(res => {
                                  axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
                                    .then(res => {
                                      const orders = res;
                                      this.setState({ data4: orders.data });
                                    })
                                })
                            }}><Text>+</Text>
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Text style={{ fontWeight: "bold"}}>Amount :</Text>
                            <Text style={styles.price}>$ {data.price_products * data.quantity}</Text>
                          </Col>
                          <Col>
                            <Button style={{ backgroundColor: "red" }} onPress={() => this.delete(data.id)}><Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Remove</Text>
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Grid>
                </CardItem>
              </Card>
            )
          })}

        </Content>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate("Checkout");
        }}>
          <Footer style={{ backgroundColor: "#EEE", paddingTop: 5, paddingLeft: 5, paddingRight: 5, }}>
            <Grid style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Col>
                <Button style={{ backgroundColor: "#FFF", width: '100%', marginRight: 5, borderColor: "#FB6542", borderWidth: 1 }}><Text style={{ color: '#FB6542', textAlign: "center" }}>$ Total : {this.total_price()}</Text></Button>
              </Col>
              <Col>
                <Button title="Go to Cart" style={{ backgroundColor: '#fb8b31', width: '95%', marginLeft: 3, }} onPress={() => {
                  this.props.navigation.navigate("Checkout");
                }}>
                  <Text style={{ textAlign: "center" }}> Payment </Text>
                </Button>
              </Col>
            </Grid>
          </Footer>
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  price: {
    fontSize: 14,
    color: "#fb8b31",
    fontWeight: "500"
  },
  title_products: {
    fontSize: 16,
    fontWeight: "500",
  },
  headerStyle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24
  },
  footerStyle: {
    backgroundColor: '#CCC'
  }

});
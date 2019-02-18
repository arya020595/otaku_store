import React, { Component } from 'react';
import { TouchableOpacity } from "react-native";
import { Container, Content, Label, Card, CardItem, Text, Icon, Left, Body, Right, Footer, Input, Item, Form, Picker, Thumbnail, List, ListItem } from 'native-base';
import axios from 'axios';

export default class Checkout_screen extends Component {
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.kurir = navigation.getParam("kurir", "0");

        this.state = {
            data1: [],
            selected: 0,
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
        return (parseFloat(sum) + parseFloat(this.kurir)).toFixed(2);
    }

    sub_total_price() {
        var sum = 0;
        for (var i = 0; i < this.state.data1.length; i++) {
            const total = this.state.data1[i].price_products * this.state.data1[i].quantity
            sum += total
        }
        return (parseFloat(sum)).toFixed(2);
    }

    componentWillMount() {
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
        headerTitle: 'Purchase',
    };

    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: "#CCC" }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{fontWeight:"600"}}>$ {this.total_price()}</Text>
                            </Left>
                            <Right>
                                <Text style={{ color:"#00afec" }}>Payment details</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{fontWeight:"bold"}}>Choose select payment method</Text>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Your number invoice is #16</Text>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Form style={{ paddingLeft: 3, width: '100%' }}>
                                <Picker
                                    selectedValue={this.state.selected}
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    headerBackButtonText="Baaack!"
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ selected: itemValue })
                                    }
                                >
                                    <Picker.Item label="Select Payment" value="pilih" />
                                    <Picker.Item label="Mandiri" value="10" />
                                    <Picker.Item label="BCA" value="5" />
                                    <Picker.Item label="BNI" value="9" />
                                </Picker>
                            </Form>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>
                                    Please make payment immediately through the available account number.
                                </Text>                               
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    No. account :
                                </Text>
                                <Text style={{ fontWeight: "bold" }}>1420-0135-00318 (Arya Rifqi Pratama)</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("Home")
                }}>
                    <Footer style={{ backgroundColor: '#5cb85c' }}>
                        <Text style={{ marginTop: 15, justifyContent: 'center', textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Check Payment Status</Text>
                    </Footer>
                </TouchableOpacity>
            </Container>
        )
    }
}
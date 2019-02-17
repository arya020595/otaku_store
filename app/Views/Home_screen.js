import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Container, Content, Text, Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import dataProducts from '../Faker/Faker.js';

// Ini untuk meresponsivekan data
const deviceWidth = Dimensions.get('window').width;

// Screen Home atau Halaman Home
export default class Home_screen extends Component {

    static navigationOptions = {
        headerTitle: 'Otaku Store',
    };

    constructor(props) {
        super(props);
        this.state = {
            dataProducts: [],
            order: [],
            qty:[]
        }
    }

    componentDidMount() {
        axios.get(`http://192.168.43.108:3333/api/v1/products/`)
            .then(res => {
                const products = res;
                this.setState({ dataProducts: products.data });
            })
        axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
            .then(res => {
                const orders = res;
                this.setState({ order: orders.data });
            })
    }

    render() {
        return (
            <Container>
                {/* {console.warn(this.state.order)} */}
                <Content style={{ backgroundColor: '#f4f7f6' }}>
                    <Grid style={{ flexWrap: 'wrap', }}>
                        <Col style={{ width: deviceWidth / 2 - 10, margin: 5 }}><Text style={{ fontWeight: '500', marginBottom: 8, marginTop: 8, fontSize: 18, color: '#767676' }}>FEATURED</Text></Col>
                        <Col style={{ width: deviceWidth / 2 - 10, alignContent: 'flex-end', margin: 5 }}><Text style={{ fontWeight: '500', marginBottom: 8, marginTop: 8, fontSize: 18, textAlign: 'right', color: "#fb8b31" }} onPress={()=>(this.props.navigation.navigate("Cart"))}>GO TO CART</Text></Col>
                    </Grid>

                    <Grid style={{ flexWrap: 'wrap' }}>
                        {this.state.dataProducts.map((data, index) => (
                            <Col key={index} style={{ borderWidth: 1, borderColor: '#CCC', width: deviceWidth / 3 - 10, margin: 5 }}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("Details", {
                                        index: index,
                                        id: data.id,
                                    });
                                }}>
                                    <Image
                                        source={{
                                            uri: data.image_products
                                        }}
                                        style={{
                                            flex: 1, height: 150, width: '100%'
                                        }}
                                    />
                                </TouchableOpacity>
                                <Row style={{ padding: 5, backgroundColor: 'white' }}>
                                    <Col>
                                        <Text numberOfLines={2} style={styles.title_products}>
                                            {data.name_products}
                                        </Text>
                                        <Row style={{ marginTop: 15, }}>
                                            <Text style={{ fontSize: 12 }}>$ {data.price_products}</Text>
                                        </Row>
                                        <Row style={{ marginTop: 15, }}>
                                            <Button style={{ height: 30, backgroundColor: '#fb8b31', width:"100%" }} title="Add to cart"
                                                onPress={() => {
                                                    if (this.state.order.find(cari => cari.id_products === data.id)) {
                                                        axios.patch(`http://192.168.43.108:3333/api/v1/orders/${data.id_orders}`, { quantity: data.quantity + 1 })
                                                            .then(res => {
                                                                axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
                                                                    .then(res => {
                                                                        const orders = res;
                                                                        this.setState({ order: orders.data });
                                                                    })
                                                                axios.get(`http://192.168.43.108:3333/api/v1/products/`)
                                                                    .then(res => {
                                                                        const products = res;
                                                                        this.setState({ dataProducts: products.data });
                                                                    })
                                                                alert('Your quantity increases')
                                                            }).catch((error) => {
                                                                alert(error)
                                                            })
                                                    }
                                                    else {
                                                        const qty = {
                                                            id_products: data.id,
                                                            quantity: 1
                                                        };
                                                        axios.post('http://192.168.43.108:3333/api/v1/orders/', qty)
                                                            .then(res => {
                                                                axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
                                                                    .then(res => {
                                                                        const orders = res;
                                                                        this.setState({ order: orders.data });
                                                                    })
                                                                axios.get(`http://192.168.43.108:3333/api/v1/products/`)
                                                                    .then(res => {
                                                                        const products = res;
                                                                        this.setState({ dataProducts: products.data });
                                                                    })
                                                                alert('Product Has Beed Added')
                                                            }).catch((error) => {
                                                                alert(error)
                                                            })
                                                    }
                                                }}>
                                                <Text style={{ fontWeight: "bold", fontSize: 8, }}>Add cart</Text>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Grid>
                </Content>
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
        fontSize: 14,
        fontWeight: "400",
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
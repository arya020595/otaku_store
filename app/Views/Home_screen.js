import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from "react-native";
import { Container, Content, Text, Button } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import { dataProducts } from '../Faker/Faker'

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
            data3 : [],
            data4 : []
        }
    }

    componentDidMount() {
        this.fetchDataProducts();
        this.fetchDataOrders();
    }

    async fetchDataProducts() {
        await axios.get(`http://192.168.43.108:3333/api/v1/products/`)
            .then(res => {
                const products = res;
                // this.setState({ data3: products.data });
                dataProducts.data3.push(products.data)
                       
            })
    }

    async fetchDataOrders() {
        await axios.get(`http://192.168.43.108:3333/api/v1/orders/`)
            .then(res => {
                const orders = res;
                // this.setState({ data4: orders.data });
                // dataProducts.data3 = products
            })
    }

    render() {
        return (
            <Container>
                {alert(JSON.stringify(dataProducts.data3))}
                <Content style={{ backgroundColor: '#f4f7f6' }}>
                    <Grid style={{ flexWrap: 'wrap', }}>
                        <Col style={{ width: deviceWidth / 2 - 10, margin: 5 }}><Text style={{ fontWeight: '500', marginBottom: 8, marginTop: 8, fontSize: 18, color: '#767676' }}>FEATURED</Text></Col>
                        <Col style={{ width: deviceWidth / 2 - 10, alignContent: 'flex-end', margin: 5 }}><Text style={{ fontWeight: '500', marginBottom: 8, marginTop: 8, fontSize: 18, textAlign: 'right', color: "#fb8b31" }} onPress={()=>(this.props.navigation.navigate("Cart"))}>GO TO CART</Text></Col>
                    </Grid>

                    <Grid style={{ flexWrap: 'wrap' }}>
                        {dataProducts.data3.map((data, index) => (
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
                                                    if (dataProducts.data4.find(cari => cari.id_products === data.id)) {
                                                       alert('data sudah ada')
                                                    }
                                                    else {
                                                        alert('data belum ada')
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
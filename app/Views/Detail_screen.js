import React, { Component } from 'react';
import { Image, StyleSheet } from "react-native";
import { Container, Content, Card, CardItem, Text, Button, Body } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import axios from 'axios';

export default class Detail_screen extends Component {
    // Aku gak tahu kenapa ada props disini
    constructor(props) {
        // Super props ini apa
        super(props);
        const { navigation } = this.props;
        this.index = navigation.getParam("index", "NO-ID");
        this.id = navigation.getParam("id", "NO-ID");

        this.state = {
            product: [],
            order: []
        }
    }

    componentDidMount() {
        axios.get(`http://192.168.43.108:3333/api/v1/products/${this.id}`)
            .then(res => {
                const products = res;
                // alert(JSON.stringify(products))
                this.setState({ product: products.data[0] });
            })
    }

    static navigationOptions = {
        headerTitle: 'Otaku Store',
    };

    render() {
        return (
            <Container key={this.index} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {/* {alert(JSON.stringify(this.state.order))} */}
                <Content>
                    <Card >
                        <CardItem cardBody>
                            <Image source={{ uri: this.state.product.image_products }} style={{ height: 350, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.title_products}>{this.state.product.name_products}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ fontWeight: "bold", marginTop: 8 }}>Price : </Text>
                                <Text style={styles.price}>$ {this.state.product.price_products} </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{ fontWeight: "bold", marginTop: 8 }}>Description : </Text>
                                <Text>{this.state.product.description_products}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Grid>
                                <Col>
                                    <Button title="Go to Cart" style={{ backgroundColor: '#FF5A09', width: '100%', marginRight: 5, }} onPress={() => {
                                        if (this.state.product.quantity === null) {
                                            const products = {
                                                id_products: this.state.product.id,
                                                quantity: 1
                                            };
                                            axios.post('http://192.168.43.108:3333/api/v1/orders/', products)
                                                .then(res => {
                                                    axios.get(`http://192.168.43.108:3333/api/v1/products/${this.id}`)
                                                        .then(res => {
                                                            alert('Product has been added to your cart')
                                                            const products = res;
                                                            // alert(JSON.stringify(products))
                                                            this.setState({ product: products.data[0] });
                                                        })
                                                }).catch((error) => {
                                                    alert(error)
                                                })
                                        } else {
                                            axios.patch(`http://192.168.43.108:3333/api/v1/orders/${this.state.product.id_orders}`, { quantity: this.state.product.quantity + 1 })
                                                .then(res => {
                                                    axios.get(`http://192.168.43.108:3333/api/v1/products/${this.id}`)
                                                        .then(res => {
                                                            alert('Quantity has increased')
                                                            const products = res;
                                                            // alert(JSON.stringify(products))
                                                            this.setState({ product: products.data[0] });
                                                        })
                                                }).catch((error) => {
                                                    alert(error)
                                                })
                                        }
                                    }}>
                                        <Text> Add & View Cart </Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button title="Go to Cart" style={{ backgroundColor: "#FFF", width: '100%', marginLeft: 5, borderColor: "#00afec", borderWidth: 1 }} onPress={() => {
                                        this.props.navigation.navigate("Home")
                                    }}>
                                        <Text style={{ color: "#00afec" }}> Continue Shopping </Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </CardItem>
                    </Card>
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
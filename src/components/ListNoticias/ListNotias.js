import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';


export default class ListNotias extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <TouchableOpacity onPress={() => this.goToDetailScreen()}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={{ uri: this.props.url }} />
                                </Left>
                                <Body>
                                    <Text>{this.props.titulo}</Text>
                                    <Text note numberOfLines={1}>{this.props.detalle} . .</Text>
                                </Body>
                                <Right>

                                    <Text>Ver</Text>

                                    <Button transparent>
                                        <Text>Ver</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                        </TouchableOpacity>
                    </List>
                </Content>
            </Container>
        );
    }
}
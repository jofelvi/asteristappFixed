import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
export default class TabsScrollableExample extends Component {
    render() {
        return (
            <Container>
                <Header hasTabs />
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading={"Tab1"}>
                        <Tab1 />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
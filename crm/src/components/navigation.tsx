import React from "react"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function Navigation() {

    return (
        <nav><h1>Навигация</h1>
            <Tabs><Tab title="Главная" eventKey="home">Home</Tab>
                <Tab title="Заказы" eventKey="orders">orders</Tab>
                <Tab title="Мастера" eventKey="masters">masters</Tab></Tabs>
        </nav>
    );
}

export default Navigation;
import React from 'react';
import Card from '../components/Card';
import axios from 'axios';

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("https://63d02d0fe52f587829ad88d4.mockapi.io/orders");
                setOrders(data.reduce((prev, Object) => [...prev, ...Object.items], []));
                setIsLoading(false);
            } catch (error) {
                alert("Ошибка при запросе заказов");
                console.error(error); 
            }

        })();

    }, [])

    return (
        <div className="contant p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Orders;
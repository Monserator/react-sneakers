import React from 'react'
import Card from './components/Card';
import Header from './components/Header'
import Drawer from './components/Drawer'


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        fetch('https://63767ed4b5f0e1eb850d515b.mockapi.io/items').then((res) => {
            return res.json();
        }).then(json => {
            setItems(json);
        });
    }, []);

   const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj])
   }


    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
            <Header onClickCart={() => setCartOpened(true)} />
            <div className="contant p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search" />
                        <input type="text" placeholder="Поиск..." />
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.map((item) => (
                        <Card
                            title={item.name}
                            price={item.price}
                            image={item.image}
                            onPlus={(obj) => onAddToCart(obj)}
                            onFavorite={() => console.log("Добавили в закладки")}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default App;

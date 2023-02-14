import React from 'react'
import {
    Routes,
    Route
} from "react-router-dom";
import Header from './components/Header'
import Drawer from './components/Drawer'
import axios from 'axios';
import Home from './pages/Home'
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders'; 


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://63767ed4b5f0e1eb850d515b.mockapi.io/cart'),
                    axios.get('https://63767ed4b5f0e1eb850d515b.mockapi.io/favorites'),
                    axios.get('https://63767ed4b5f0e1eb850d515b.mockapi.io/items'),
                ]);
                setIsLoading(false);
    
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) { 
                console.log('Ошибка при загрузке данных');
                console.error(error);
            }
        }
        fetchData();
    }, []);


    const onAddToCart = async (obj) => {
        try {
            // const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id)) Рабочий
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.parentId));
            // console.log(findItem)
            if (findItem) {
                // setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id))); Рабочий
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
                // await axios.delete(`https://63767ed4b5f0e1eb850d515b.mockapi.io/cart/${obj.id}`); рабочий
                await axios.delete(`https://63767ed4b5f0e1eb850d515b.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems(prev => [...prev, obj]);
                const {data} = await axios.post('https://63767ed4b5f0e1eb850d515b.mockapi.io/cart', obj);
                setCartItems((prev) => prev.map(item => {
                    if (item.parentId == data.parentId) {
                        return{
                        ... item,
                        id: data.id
                        }
                    };
                    return item;
                }));
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
        
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://63767ed4b5f0e1eb850d515b.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post('https://63767ed4b5f0e1eb850d515b.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить в фавориты");
        }
    }

    const onRemoveItem = (id) => {
       try {
        axios.delete(`https://63767ed4b5f0e1eb850d515b.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
       } catch (error) {
        alert('Ну удалось удалить из корзины');
       }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    }
    


    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToCart, onAddToFavorite, setCartOpened, setCartItems}}>
            <div className="wrapper clear">
                <Drawer onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)} opened={cartOpened} />
                <Header onClickCart={() => setCartOpened(true)} />

                <Routes>
                    <Route path='/' exact element={
                        <Home
                            cartItems={cartItems}
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            isLoading={isLoading}
                        />
                    }>
                    </Route>
                    <Route path='/favorites' exact element={
                        <Favorites />
                    } />
                    <Route path='/orders' exact element={
                        <Orders />
                    } />
                </Routes>

            </div>
        </AppContext.Provider>
    );
}

export default App;

import React from 'react';
import Card from '../components/Card';


function Home({items,
    searchValue,
    isLoading,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart}) {



    const renderItems = () => {
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        return( (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
                loading={isLoading}
                {...item}
            />
        ))
            
        )
    }

    return (
        <div className="contant p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кросовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Close" />}
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;
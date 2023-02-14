import React from 'react';
import axios from "axios";

import Info from "./Info";
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [] }) {

    const {cartItems, setCartItems, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [ orderId, setOrderId ] = React.useState(null);
    const [ isLoading, setIsLoading ] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("https://63d02d0fe52f587829ad88d4.mockapi.io/orders", {items: cartItems});
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete("https://63767ed4b5f0e1eb850d515b.mockapi.io/cart/" + item.id);
                await delay(1000)
            }
            
        } catch (error) {
            alert(error);
        }
        setIsLoading(false);
    }


    return (
        <div className="overlay">
            <div className="drawer d-flex ">
                <h2 className="mb-30 d-flex justify-between">Корзина<img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" /></h2>


                {items.length > 0 ?
                    <div className="d-flex flex-column flex">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${obj.image})` }} className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.name}</p>
                                        <b>{obj.price} грн.</b>
                                    </div>

                                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} грн. </b>
                                </li>
                                <li>
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{totalPrice / 100 * 5} грн. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /> </button>
                        </div>
                    </div>
                    :
                    <Info
                        title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"}
                        image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                    />}
            </div>
        </div>
    );
}

export default Drawer;
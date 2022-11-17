function Drawer({onClose, items = []}) {
    return (
        <div className="overlay">
            <div className="drawer d-flex ">
                <h2 className="mb-30 d-flex justify-between">Корзина<img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" /></h2>
                <div className="items">
                    {items.map((obj) => (
                        <div className="cartItem d-flex align-center mb-20">
                            <div style={{ backgroundImage: `url(${obj.image})` }} className="cartItemImg"></div>
                            <div className="mr-20 flex">
                                <p className="mb-5">{obj.title}</p>
                                <b>{obj.price} грн.</b>
                            </div>

                            <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                        </div>
                    ))}
                </div>
                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 грн. </b>
                        </li>
                        <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>1074 грн. </b>
                        </li>
                    </ul>
                    <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /> </button>
                </div>
            </div>
        </div>
    );
}

export default Drawer;
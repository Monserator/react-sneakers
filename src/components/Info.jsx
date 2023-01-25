

import React from 'react'
import AppContext from '../context';

const Info = ({title, description, image}) => {
    const {setCartOpened} = React.useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column">
            <img className="mb-20" width="120px" src={image} alt="Empty cart image" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={()=> setCartOpened(false)} className="greenButton">
                <img src="/img/arrow.svg" alt="arrow" />Вернуться назад
            </button>
        </div>
    )
}

export default Info;
import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from '../../context';


function Card({ id, onFavorite, name, image, price, onPlus, favorited = false, added = false, loading = false }) {

    const {isItemAdded} = React.useContext(AppContext);

    const [isFavorite, setIsFavorite] = React.useState(favorited)

    const onClickPlus = () => {
        onPlus({ id, name, image, price }); 

    }

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        onFavorite({ id, name, image, price });
    }

    return (



        <div className={styles.card}>
            {loading ? <ContentLoader
                speed={2}
                width={265}
                height={245}
                viewBox="0 0 260 220"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="110" />
                <rect x="-1" y="116" rx="5" ry="5" width="150" height="15" />
                <rect x="0" y="137" rx="5" ry="5" width="100" height="15" />
                <rect x="0" y="184" rx="5" ry="5" width="80" height="25" />
                <rect x="122" y="181" rx="5" ry="5" width="32" height="32" />
            </ContentLoader> :
                <><div className={styles.favorite}>
                    <img onClick={onClickFavorite} src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"} alt="Unliked" />
                </div>
                    <img width={133} height={112} src={image} alt="Sneakers " />
                    <h5>{name}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} грн.</b>
                        </div>
                        <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
                    </div></>
            }

        </div>
    );
}


export default Card;


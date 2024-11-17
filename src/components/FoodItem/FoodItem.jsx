import React, { useContext, useEffect, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    // Sync itemCount with cartItems context when it changes
    useEffect(() => {
        if (cartItems && cartItems[id]) {
            setItemCount(cartItems[id]);
        } else {
            setItemCount(0); // Reset count if the item is removed from the cart
        }
    }, [cartItems, id]);

    const handleAddToCart = () => {
        addToCart(id);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(id);
    };

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
                
                {!itemCount ? (
                    <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add to cart" />
                ) : (
                    <div className="food-item-counter">
                        <img 
                            src={assets.remove_icon_red} 
                            onClick={handleRemoveFromCart} 
                            alt="Remove from cart" 
                        />
                        <p>{itemCount}</p>
                        <img 
                            src={assets.add_icon_green} 
                            onClick={handleAddToCart} 
                            alt="Add more" 
                        />
                    </div>
                )}
            </div>

            <div className="food-item-info">
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default FoodItem;

import React from 'react';

import Aux from '../../../hoc/AuxReact';

const orderSumary = (props) => {
    const ingredientSumary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        });

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious with the following ingredients:</p>
            <ul>
                { ingredientSumary }
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
};

export default orderSumary;
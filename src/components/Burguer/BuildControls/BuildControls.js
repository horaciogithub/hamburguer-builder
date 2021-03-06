import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className="build-controls">
        <p>Current price: <strong>{ parseFloat(props.totalPrice).toFixed(2) } €</strong></p>
        { controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={ props.disabled[ctrl.type] }
            />
        ))}

        <button 
            className="order-confirmation"
            disabled={ !props.purchasable } 
            onClick={ props.ordered }>Order Now</button>
    </div>
);

export default buildControls;
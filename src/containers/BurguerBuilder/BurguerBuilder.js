import React, { Component } from 'react';

import Aux from '../../hoc/AuxReact';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSumary from '../../components/Burguer/OrderSumary/OrderSumary';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

export default class BurguerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat:0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        }
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        const updatedCount = oldCount === 0 ? oldCount = 0 : oldCount - 1;
       
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    cancelModalHandler = () => {
        this.setState({ purchasing: false });
    }
    
    render() {

        const disabledInfo = { ...this.state.ingredients } // Estado controles

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; // Intercambiamos true o false
        }

        return(
            <Aux>
                <Modal show={ this.state.purchasing } hide={ this.cancelModalHandler }>
                    <OrderSumary ingredients={ this.state.ingredients }/>
                </Modal>
                <Burguer ingredients={ this.state.ingredients }/>
                <BuildControls 
                    ingredientAdded={ this.addIngredientsHandler }
                    ingredientRemoved={ this.removeIngredientsHandler }
                    disabled={ disabledInfo }
                    totalPrice={ this.state.totalPrice }
                    purchasable={ this.state.purchasable }
                    ordered={ this.purchaseHandler }
                />
            </Aux>
        );
    }
}
export const addPizzaToCard = (objPizz) => ({
    type: 'ADD_PIZZA_CARD', payload: objPizz
});

export const clearCart = () => ({
    type: 'CLEAR_CART'
});

export const removedCartItem = (id) => ({
    type: 'REMOVED_CART_ITEM', id
});

export const PlusOnePizza = (id) => ({
    type: 'PLUS_ONE_CART_ITEM', id
});

export const MinusOnePizza = (id) => ({
    type: 'MINUS_ONE_CART_ITEM', id
});
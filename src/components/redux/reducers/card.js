let initial = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const getTTPrice = arr => arr.reduce((total, el) => {return total + el.price}, 0);

const card = (state = initial, action) => {
    switch (action.type) {
        case 'ADD_PIZZA_CARD':
            const currentPizzas = !state.items[action.payload.id] 
            ? [action.payload] 
            : [...state.items[action.payload.id].items, action.payload];
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzas,
                    totalPrice: getTTPrice(currentPizzas)
                }
            }
            return {
                ...state,
                items: newItems,
                totalCount: Object.keys(newItems).reduce((sum, key)=>newItems[key].items.length + sum,0),
                totalPrice: Object.keys(newItems).reduce((sum, key)=>newItems[key].totalPrice + sum,0)
            }
        case 'CLEAR_CART':
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0
            }
        case 'REMOVED_CART_ITEM':
            const itemsCopy = {
                ...state.items
            }
            const currentTotalPrice = itemsCopy[action.id].totalPrice;
            delete itemsCopy[action.id];
            let restItems = Object.values(itemsCopy).map(obj => obj.items)
            console.log(restItems)
            return {
                ...state,
                items: itemsCopy,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: [].concat.apply([], restItems).length
            }
        case 'PLUS_ONE_CART_ITEM':{ 
            const itemsNew = [...state.items[action.id].items, state.items[action.id].items[0]]
            const newItems = {
                ...state.items,
                [action.id]: {
                    items: itemsNew,
                    totalPrice: getTTPrice(itemsNew)
                }
            }
            return {
                ...state,
                items: newItems,
                totalCount: Object.keys(newItems).reduce((sum, key)=>newItems[key].items.length + sum,0),
                totalPrice: Object.keys(newItems).reduce((sum, key)=>newItems[key].totalPrice + sum,0)
            }
        }
        case 'MINUS_ONE_CART_ITEM':{ 
            const oldItems = state.items[action.id].items
            const itemsNew = oldItems.length > 1 ? [...state.items[action.id].items].slice(1): oldItems
            const newItems = {
                ...state.items,
                [action.id]: {
                    items: itemsNew,
                    totalPrice: getTTPrice(itemsNew)
                }
            }
            return {
                ...state,
                items: newItems,
                totalCount: Object.keys(newItems).reduce((sum, key)=>newItems[key].items.length + sum,0),
                totalPrice: Object.keys(newItems).reduce((sum, key)=>newItems[key].totalPrice + sum,0)
            }
        }
        default:
            return state
    }
}

export default card;
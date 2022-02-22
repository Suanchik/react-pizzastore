let initial = {
    items: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : {},
    totalPrice: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('totalPrice')) : 0,
    totalCount: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('totalCount')) : 0
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
            const newstate = {
                ...state,
                items: newItems,
                totalCount: Object.keys(newItems).reduce((sum, key)=>newItems[key].items.length + sum,0),
                totalPrice: Object.keys(newItems).reduce((sum, key)=>newItems[key].totalPrice + sum,0)
            }
            localStorage.setItem('items', JSON.stringify(newItems));
            localStorage.setItem('totalCount', JSON.stringify(Object.keys(newItems).reduce((sum, key)=>newItems[key].items.length + sum,0)));
            localStorage.setItem('totalPrice', JSON.stringify(Object.keys(newItems).reduce((sum, key)=>newItems[key].totalPrice + sum,0)));
            return newstate

        case 'CLEAR_CART':
            localStorage.removeItem('items');
            localStorage.removeItem('totalCount');
            localStorage.removeItem('totalPrice');
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
     
            localStorage.setItem('items', JSON.stringify(itemsCopy));
            localStorage.setItem('totalCount', JSON.stringify([].concat.apply([], restItems).length));
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice - currentTotalPrice));
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
            localStorage.setItem('items', JSON.stringify(newItems));
            localStorage.setItem('totalCount', JSON.stringify(Object.keys(newItems).reduce((sum, key)=>newItems[key].items.length + sum,0)));
            localStorage.setItem('totalPrice', JSON.stringify(Object.keys(newItems).reduce((sum, key)=>newItems[key].totalPrice + sum,0)));
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
            localStorage.setItem('items', JSON.stringify(newItems));
            localStorage.setItem('totalCount', JSON.stringify(Object.keys(newItems).reduce((sum, key)=>newItems[key].items.length + sum,0)));
            localStorage.setItem('totalPrice', JSON.stringify(Object.keys(newItems).reduce((sum, key)=>newItems[key].totalPrice + sum,0)));
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
let initial = {
    items: [],
    isLoaded: false
}

const pizzas = (state = initial, action) => {
    switch (action.type) {
        case 'SET_PIZZAZ':
            return {
                ...state,
                items:  [...state.items = action.payload],
                isLoaded: true
            }
            case 'SET_LOUDING':
                return {
                    ...state,
                    isLoaded: action.payload
                }
        default:
            return state
    }
}

export default pizzas;

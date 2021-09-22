
let initial = {
    category: null,
    sortBy: {
        type: 'popular',
        order: 'desc'
    }
}

const filters = (state = initial, action) => {
    switch (action.type) {
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.payload
            }
        case 'SET_GATEGORY':
            return {
                ...state,
                category: action.payload
            }
        default:
            return state
    }
}

export default filters;

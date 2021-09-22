import axios from "axios";

export const fetchPizzas = (category, sortBy) => (dispatch) => {
    dispatch(setLouding(false))
    axios.get(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`).then(({data}) => {
        dispatch(setPizzaz(data));
        })
}

export const setLouding = (val) => ({
    type: 'SET_LOUDING',
    payload: val
})

const setPizzaz = (items) => ({
    type: 'SET_PIZZAZ',
    payload: items
})
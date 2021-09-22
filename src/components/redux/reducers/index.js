import { combineReducers } from "redux";
import card from "./card";
import filters from "./filters";
import pizzas from "./pizzas";

export const reducers = combineReducers({
    filtersPage: filters,
    pizzasPage: pizzas,
    cardPage: card
})
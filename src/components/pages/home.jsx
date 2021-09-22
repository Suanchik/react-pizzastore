import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actionsCreaters/filters';
import { Categories, Sorts, PizzaBlock, PizzaLoudingBlock } from './../Exports';
import { fetchPizzas } from './../../components/redux/actionsCreaters/pizzas';
import { addPizzaToCard } from '../redux/actionsCreaters/card';


function Home() {

  const dispatch = useDispatch();
  const pizzas = useSelector(({ pizzasPage }) => pizzasPage.items);
  const cartItems = useSelector(({ cardPage }) => cardPage.items);
  const isLoaded = useSelector(({ pizzasPage }) => pizzasPage.isLoaded);
  const { category, sortBy } = useSelector(({ filtersPage }) => filtersPage);


  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy))
  }, [category, sortBy]);

  const categories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const sorts = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' }
  ]

  const onselectorCategory = index => {
    dispatch(setCategory(index))
  }

  const onClickSort = type => {
    dispatch(setSortBy(type))
  }

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCard(obj));
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categories} activeItem={category} onClick={(i) => onselectorCategory(i)} />
        <Sorts sortType={sortBy.type} items={sorts} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoaded ? pizzas.map(p => <PizzaBlock
            addPizza={handleAddPizzaToCart}
            key={p.id} {...p} isLoaded={true}
            addedCount={cartItems[p.id] && cartItems[p.id].items.length}
          />
          ) :
            Array(pizzas.length).fill(0).map((_, index) => <PizzaLoudingBlock key={index} />)
        }
      </div>
    </div>
  )
}

export default Home;
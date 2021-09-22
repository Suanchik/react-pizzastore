import React from 'react';


const Categories = React.memo(
  ({ items, onClick, activeItem }) => {


    let tipesOfPizza = items.map((p, index) => <li className={activeItem === index ? 'active' : ''}
      onClick={() => onClick(index)}
      key={`${p}_${index}`}>{p}</li>);

    return (
      <div className="categories">
        <ul>
          <li className={activeItem === null ? 'active' : ''} onClick={() => onClick(null)}>Все</li>
          {tipesOfPizza}
        </ul>
      </div>
    )
  }
)

export default Categories;
import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>We will plan out your next get-together!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
            <CardItem
              src='images/food.jpeg'
              text='Experience new flavors even if you are on a budget'
              label='Resturants'
            />
            <CardItem
              src='images/nature.jpeg'
              text='Explore fun attractions nearby with our help'
              label='Adventure'
            />
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;
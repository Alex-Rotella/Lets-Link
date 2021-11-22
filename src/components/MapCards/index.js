import React from 'react';
import './MapCards.css';
import CardItem from './MapCardItem';

function Cards() {
  let place1 = 'Resturant'
  let place2 = 'Movie Theater'
  let place3 = 'Shopping Mall'

  let details = 'Details for the place'


  return (
    <div className='cards'>
      <h1>Here are the top 3 places we found!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
            <CardItem
              src='/logo192.png'
              text={details}
              label={place1}
            />
            <CardItem
              src='/logo192.png'
              text={details}
              label={place2}
            />
              <CardItem
              src='/logo192.png'
              text={details}
              label={place3}
            />
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;
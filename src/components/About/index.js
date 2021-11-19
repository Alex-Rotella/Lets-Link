import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>About LETSLINK</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        <ul className='cards__items'>
            <CardItem
              src='images/nightOut.jpeg'
              text='LETSLINK was developed to plan your next night in town. If you ever had trouble deciding what to do on your night off with friends
                     and family, LETLINK will solve your problem. No more wasting time with undecisveness, LETSLINK today! 
                   '
              label='LETSLINK'
            />

          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Cards;
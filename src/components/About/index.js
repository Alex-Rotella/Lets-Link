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
              src='images/LetsLink.jpeg'
              text='LETSLINK was developed to plan your next night out on the town. If you have ever had trouble deciding what to do on your night off with friends
                     and family, LETSLINK will solve your problem. No more excuses. No more wasting time being indecisive. LETSLINK today! 
                   '
              label='LETSLINK'
            />

          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/userStory1.jpeg'
              text=' " My friends and I had no idea what to do on a Saturday night, so we decided to try Lets Link. We were not dissapointed, they catered a great night for us. The process was quick and easy, and the random aspect really adds to the excitement! " - Luke
              '
              label='User Stories'
            />
              <CardItem
              src='images/userStory2.jpg'
              text=' " Lets Link brought me and my friends to a cool farmers market, and there ended up being a beautiful pumpkin patch and corn maze there too! Could not recommend Lets Link enough, you can really turn a day of nothing into a great experience with just a few clicks! " - Andrea
                   '
              label='User Stories'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/userStory3.jpeg'
              text=' " Lets Link gave my sister and I an easy way to entertain our cousins while they were in town. We love Lets Link! "
                   '
              label='User Stories'
            />
              <CardItem
              src='images/rowan.png'
              text='LETSLINK is brought to you by : Batuhuan Kir, Alex Rotella, Brant Capozzoli, Declan Riddell, Matt McConnell, Zach Lolli, Ryan Bothmann, and Alexander Abbott. This application was developed for our Senior Project course.
                   '
              label='Team'
            />
                          
                      </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
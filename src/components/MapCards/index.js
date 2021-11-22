import React from 'react';
import MapCardItem from "./MapCardItem";
import './MapCards.css';

function MapCards(){
    return(
      <div classname='mapcards_overall'>
        <h1>Results</h1>
        <div className='mapcards_container'>
          <table className='mapcards_table'>
            <tr>
              <td>
                <MapCardItem
                  text='First Item Desc'
                  title='First Item'
                />
              </td>
              <td>
                <MapCardItem
                  text='Second Item Desc'
                  title='Second Item'
                />
              </td>
              <td>
                <MapCardItem
                  text='Third Item Desc'
                  title='Third Item'
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
}

export default MapCards;
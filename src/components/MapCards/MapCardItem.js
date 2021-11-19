import React from 'react';
import { Link } from 'react-router-dom';

function MapCardItem(props) {
  return (
    <>
      <table>
        <tr>
          <td>
            <div className='mapcards__item__link'>
              <h1 className='mapcard_item_header'>{props.title}</h1>
              <div className='mapcards__item__info'>
                <p className='mapcards__item__text'>{props.text}</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </>
  );
}

export default MapCardItem;
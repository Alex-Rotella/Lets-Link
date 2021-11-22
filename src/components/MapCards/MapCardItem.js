import React from 'react';
//import { Link } from 'react-router-dom';

function MapCardItem(props) {
  return (
    <>
      <div className='mapcard_item_container'>
        <table id='mapcard_table'>
          <tr>
            <td className='mapcard_item_table_item'>
              <div className='mapcard_item_link'>
                <h2 className='mapcard_item_title'>{props.title}</h2>
              </div>
            </td>
          </tr>
          <tr>
            <td className='mapcard_item_table_item'>
              <div className='mapcard_item_info'>
                <p className='mapcard_item_text'>{props.text}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default MapCardItem;
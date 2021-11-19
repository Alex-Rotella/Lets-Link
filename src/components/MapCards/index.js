import MapCardItem from "./MapCardItem";

function MapCards(){
    return(
      <div className='mapcards'>
        <h1>Let's plan out your next get-together!</h1>
        <div className='mapcards__container'>
          <div className='mapcards__wrapper'>
            <table className='mapcards__items'>
              <tr>
                <td>
                  <MapCardItem
                    text='Experience new flavors even if you are on a budget'
                    header='Resturants'
                  />
                </td>
                <td>
                  <MapCardItem
                    text='Explore fun attractions nearby with our help'
                    header='Adventure'
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
}

export default MapCards;
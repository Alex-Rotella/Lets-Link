import axios from 'axios';
export const getRestaurantsData = async (lat, lng) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng`, {
      params: {
        latitude: lat,
        longitude: lng,
      },
      headers: {
        'x-rapidapi-key': '2d6f7b4c23msh490fe4339c4d6cep1c9a6fjsn4cd5b255db2f',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAttractionsData = async (lat, lng) => {
    try {
      const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng`, {
        params: {
          latitude: lat,
          longitude: lng,
        },
        headers: {
          'x-rapidapi-key': '2d6f7b4c23msh490fe4339c4d6cep1c9a6fjsn4cd5b255db2f',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      });
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  
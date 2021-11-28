import axios from 'axios';

export const getRestaurantsData = async (lat, lng) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng`, {
      params: {
        latitude: lat,
        longitude: lng,
      },
      headers: {
        'x-rapidapi-key': 'e65de07aecmsh675c628cd2757f3p1a3e1ejsnc5163409a5e4',
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
          'x-rapidapi-key': 'e65de07aecmsh675c628cd2757f3p1a3e1ejsnc5163409a5e4',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      });
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  
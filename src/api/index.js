import axios from 'axios';
//261994b778msh032e8e575442ca5p10f2e3jsn8a007c096b14
//e65de07aecmsh675c628cd2757f3p1a3e1ejsnc5163409a5e4
export const getRestaurantsData = async (lat, lng) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng`, {
      params: {
        latitude: lat,
        longitude: lng,
      },
      headers: {
        'x-rapidapi-key': '261994b778msh032e8e575442ca5p10f2e3jsn8a007c096b14',
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
          'x-rapidapi-key': '261994b778msh032e8e575442ca5p10f2e3jsn8a007c096b14',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      });
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  
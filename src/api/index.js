import axios from 'axios';

export const getRestaurantsData = async (lat, lng) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng`, {
      params: {
        latitude: lat,
        longitude: lng,
      },
      headers: {
        'x-rapidapi-key': 'e140a25280msha0c613632d848ddp18a6b2jsncc574072cc50',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
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
          'x-rapidapi-key': 'e140a25280msha0c613632d848ddp18a6b2jsncc574072cc50',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      });
  
      return data;
    } catch (error) {
      console.log(error);
    }
  };
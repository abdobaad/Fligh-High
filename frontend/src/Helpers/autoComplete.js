import axios from "axios";

export const autoComplete = async (query) => {
  const request = await axios({
    method: "GET",
    url:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "56f2b7a17bmsh33a0345ddd7c4d9p148162jsn3c6b31a167c6",
      useQueryString: true,
    },
    params: {
      query,
    },
  });

  const places = request.data.Places;
  const all = [];
  await places.map((place, i) => {
    if (place.PlaceName !== place.CountryName) {
      if (i < 10) {
        all.push(place);
      }
    }
  });

  return all;
};

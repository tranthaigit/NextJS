import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map(result => result.urls["small"]);
}

export const fetchCoffeeStores = async (latLong = "10.80219243158919,106.71524045509209" , limit = 10) => {
  const photos = await getListOfCoffeeStorePhotos();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      latLong,
      "coffee",
      limit
    ),
    options
  );

  const data = await response.json();
  return data.results.map((result,index) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address === undefined ? 'Unable to locate' : result.location.address,
      name: result.name,
      neighborhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos[index]
    }
  })
};
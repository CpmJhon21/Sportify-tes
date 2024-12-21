// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCIB6hnmeA9LsoH-dT1bLs9j1WUSOFYOyiNiV0Bj5WQOZAL-_VlD3y_dnk4bJ_41inAPpDvblYbrnxLa3aN_QtQo5EgDg6J4zYypff2Xk30K8DhR3xA4q6_8wVnx935ZS3X35LdXcGfZHD9rzks7xoIhKLA_wsBWSQVrRIyZLKOeCOyZ4m-wxsLJIQsbyflbZLKFCayJF46xFVvUHCqGrlgQtnKnwkb_CLipsETXOzvKECKt1By8t5HvIPEg6-uAhHQZMnYUte3-yRQiWr5zmTfbd7VWovV';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);

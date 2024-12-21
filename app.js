// Replace with your own Spotify API token
const API_TOKEN = "BQCNsVfQXLDdh_Weqle3zQpW09qpLD0yJJnXSTlOHqpTrAvYPgdyWEOCACdheiE9b6XPkz6kRT5_n1yqjidYloDSlc3lT_FMQhzOalu5fpfwWbu7U-ZklL1580tRX8qkSnxxIY-tvlO86EX8HsAg9nAOpmsV88kd5p86di3aqtaOaqX_-ba_d9iKtzNopkPLw3AwfC7n4g6RAGU-ZkrJDa75bH43XRa-6B4HbEuUhCxKvq0MYLsQ6lYTE6XkxEYbhcTT4QkDCtAis_eir-CmMxuRmlWxhTCn";

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = document.getElementById("query").value;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Spotify API.");
    }

    const data = await response.json();
    const tracks = data.tracks.items;

    tracks.forEach((track) => {
      const trackElement = document.createElement("div");
      trackElement.classList.add("flex", "items-center", "p-4", "bg-gray-100", "rounded-lg", "shadow");

      trackElement.innerHTML = `
        <img src="${track.album.images[0]?.url}" alt="${track.name}" class="w-16 h-16 rounded-md mr-4">
        <div>
          <h2 class="text-lg font-bold">${track.name}</h2>
          <p class="text-sm text-gray-600">${track.artists.map(artist => artist.name).join(", ")}</p>
          <a href="${track.external_urls.spotify}" target="_blank" class="text-blue-500 underline">Listen on Spotify</a>
        </div>
      `;

      resultsContainer.appendChild(trackElement);
    });
  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = "<p class='text-red-500'>Failed to fetch songs. Please try again later.</p>";
  }
});

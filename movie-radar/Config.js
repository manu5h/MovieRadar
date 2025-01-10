const APIKey = "3e19ed027343875b8ea3f3d64a77a190";

const API_ENDPOINT = {
  Top_Picks: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&vote_average.gte=8&sort_by=popularity.desc`,
  Trending_Now: `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKey}`,
  New_Releases: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&primary_release_date.gte=2024-12-01&primary_release_date.lte=2025-01-10&sort_by=release_date.desc`,
  Comming_soon: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&primary_release_date.gte=2025-02-01&sort_by=release_date.asc`,
  Best_eng: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_original_language=en&sort_by=vote_average.desc&vote_count.gte=100`,
  Best_hindi: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=100`,
  Best_tamil: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_original_language=ta&sort_by=vote_average.desc&vote_count.gte=100`,
  Best_korean: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_original_language=ko&sort_by=vote_average.desc&vote_count.gte=100`,
  Best_sinhala: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_original_language=si`,
  highest_Revenue: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&sort_by=revenue.desc&vote_count.gte=500`,
  IMG_URL: `https://image.tmdb.org/t/p/w500`,
};

export default API_ENDPOINT;

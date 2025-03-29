export const TMDB_APIKey = import.meta.env.VITE_TMDB_APIKey;
export const OMDB_APIKey = import.meta.env.VITE_OMDB_APIKey;


const getFirstDayTwoMonthsAgo = () => {
  const today = new Date();
  const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1); 
  const year = twoMonthsAgo.getFullYear();
  const month = String(twoMonthsAgo.getMonth() + 1).padStart(2, '0');
  const day = String(twoMonthsAgo.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };
const today = new Date();

const API_ENDPOINT = {
    Top_Picks: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&vote_average.gte=8&sort_by=popularity.desc`,
    Trending_Now: `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_APIKey}`,
    New_Releases: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&primary_release_date.gte=${getFirstDayTwoMonthsAgo()}&primary_release_date.lte=${today.toISOString().split('T')[0]}&sort_by=release_date.desc`,
    Comming_soon: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&primary_release_date.gte=${today}&sort_by=release_date.asc`,
    Best_eng: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&with_original_language=en&sort_by=vote_average.desc&vote_count.gte=100`,
    Best_hindi: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=100`,
    Best_tamil: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&with_original_language=ta&sort_by=vote_average.desc&vote_count.gte=100`,
    Best_korean: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&with_original_language=ko&sort_by=vote_average.desc&vote_count.gte=100`,
    Best_sinhala: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&with_original_language=si`,
    highest_Revenue: `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&sort_by=revenue.desc&vote_count.gte=500`,
    IMG_URL: `https://image.tmdb.org/t/p/w500`,
    IMG_URL_Small: `https://image.tmdb.org/t/p/w200`,
    IMG_URL_Full_Res: `https://image.tmdb.org/t/p/original`,
    Additional_first_page: `https://api.themoviedb.org/3/movie/:id?api_key=${TMDB_APIKey}`,
    IMDB_rating: `https://www.omdbapi.com/?i=:IMDB_Id&apikey=${OMDB_APIKey}`,
    Cast_URL: `https://api.themoviedb.org/3/movie/:id/credits?api_key=${TMDB_APIKey}`,
    Search_URL: `https://api.themoviedb.org/3/search/movie?query=:KeyWord&api_key=${TMDB_APIKey}`,
    

}
export default API_ENDPOINT;

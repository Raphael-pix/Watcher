

export const API_KEY = "70eb76599dc7bc44345db1155f1c1c14";
export const baseUrl = "https://api.themoviedb.org/3"


const requests = {
    fetchTrending: {
        all:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
        movie: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
        tv: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,
    },
    fetchTopRated:{
        movie: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
        tv: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    },
    fetchLatest:{
        movie:`/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
        tv:`/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
    },
    fetchPopular:`/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    getSearch:`/search/multi?api_key=${API_KEY}`,
    fetchDiscover:{
        movie:`/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=4&sort_by=popularity.desc`,
        tv:`/discover/tv?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    }
}

export default requests;
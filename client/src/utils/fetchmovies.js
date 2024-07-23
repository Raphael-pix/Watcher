const baseUrl = "https://api.themoviedb.org/3"

export async function fetchMovies(getMoviesUrl){
    try{
        const response = await fetch(`${baseUrl}${getMoviesUrl}`)
        const data = await response.json()
        return data.results
    }catch(e){
        console.error(e)
        return
    }
}

export default fetchMovies;
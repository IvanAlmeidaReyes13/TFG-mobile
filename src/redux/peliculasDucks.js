import{db} from '../components/firebase'
import axios from 'axios'

//data inicial
const dataInicial = {
    count : 0,
    next:null,
    previous:null,
    results: []
  };
//types
const OBTENER_PELICULA_EXITO='OBTENER_PELICULA_EXITO';
const OBTENER_GENERO_PELICULA_EXITO='OBTENER_GENERO_PELICULA_EXITO';
const OBTENER_PELICULA_POR_GENERO_EXITO='OBTENER_PELICULA_POR_GENERO_EXITO';
const OBTENER_PELICULA_POR_KEYWORD_EXITO='OBTENER_PELICULA_POR_KEYWORD_EXITO'
const OBTENER_KEYWORD_EXITO='OBTENER_KEYWORD_EXITO'
const OBTENER_PELICULA_QUERY_EXITO='OBTENER_PELICULA_QUERY_EXITO'

//reducer
export default function peliculasReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_PELICULA_EXITO:
            return{...state,...action.payload}
        case OBTENER_GENERO_PELICULA_EXITO:
              return {...state,generos:action.payload}
        case OBTENER_PELICULA_POR_GENERO_EXITO:
              return {...state,pelicula:action.payload}
        case OBTENER_PELICULA_POR_KEYWORD_EXITO:
            return{...state,pelicula:action.payload} 
        case OBTENER_KEYWORD_EXITO:
            return{...state,keyWords:action.payload} 
        case OBTENER_PELICULA_QUERY_EXITO:
            return{...state,query:action.payload}  
        default:
            return state
    }
  }
//acciones

export const obtenerPeliculaRandom = ()=>async(dispatch,getState)=>{

    
        try {
            const numeroPagina=Math.floor(Math.random()*50);
            const url=`https://api.themoviedb.org/3/discover/movie?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&sort_by=popularity.desc&include_adult=false&page=${numeroPagina}`
            
            const res =await axios.get(url)
    
            dispatch({
                type:OBTENER_PELICULA_EXITO,
                payload:res.data
            })
        } catch (error) {
            console.log(error)
        }
}

export const obtenerGenerosPeliculasAccion = (url='https://api.themoviedb.org/3/genre/movie/list?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES')=>async(dispatch,getState)=>{

        try {
            
            const res =await axios.get(url)
           
            dispatch({
                type:OBTENER_GENERO_PELICULA_EXITO,
                payload:res.data.genres
            })
        } catch (error) {
            console.log(error)
        }
}

export const obtenerPeliculaPorGeneroAccion = (genero)=>async(dispatch,getState)=>{

    try {
        const pagina=Math.floor(Math.random()*10);
        const generosURL='https://api.themoviedb.org/3/genre/movie/list?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES'
        const generos=await axios.get(generosURL)
        const url=`https://api.themoviedb.org/3/discover/movie?with_genres=${genero}&sort_by=popularity.desc&page=${pagina}&api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES`
        const numPelicula=Math.floor(Math.random()*20);
        
        var res;
        do{
            res=await axios.get(url)

        }while(res.data.results[numPelicula].overview==='')


        const generosNombre =await generos.data.genres.map(item =>
            item.id === res.data.results[numPelicula].genre_ids[0] ||item.id === res.data.results[numPelicula].genre_ids[1]||item.id === res.data.results[numPelicula].genre_ids[2] ? item.name : undefined
            );

            //const urlTrailer=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=trailer+${res.data.results[numPelicula].title}+español&key=AIzaSyDc4qkWCb_73_VqUdJU7iLsH0mpXeUovGc`
            //const trailer=await axios.get(urlTrailer)
            
        dispatch({
            type:OBTENER_PELICULA_POR_GENERO_EXITO,
            payload:{
                titulo:res.data.results[numPelicula].title,
                descripcion:res.data.results[numPelicula].overview,
                foto:res.data.results[numPelicula].poster_path,
                puntuacion:res.data.results[numPelicula].vote_average,
                genero:generosNombre,
                //trailer:trailer.data.items[0].id.videoId
            }
        })
    } catch (error) {
        console.log(error)
    }
}
//https://api.themoviedb.org/3/keyword/420/movies?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&include_adult=false
export const obtenerPeliculaPorKeyWordAccion = (idMovie)=>async(dispatch,getState)=>{

    try {
       
        
        var numPelicula=Math.floor(Math.random()*20);
        const codigoPelicula=await db.collection('keywords').doc(idMovie).get()
        const generosURL='https://api.themoviedb.org/3/genre/movie/list?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES'
        const generos=await axios.get(generosURL)
        var pagina=Math.floor(Math.random()*codigoPelicula.data().paginas);
        pagina===0&&(pagina=pagina+1)
        //console.log(codigoPelicula.data().id)
        const url=`https://api.themoviedb.org/3/keyword/${codigoPelicula.data().id}/movies?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&include_adult=false&page=${pagina}`

        var res;
        do{
            res=await axios.get(url)

        }while(res.data.results[numPelicula].overview==='')

        
        const generosNombre =await generos.data.genres.map(item =>
            item.id === res.data.results[numPelicula].genre_ids[0] ||item.id === res.data.results[numPelicula].genre_ids[1]||item.id === res.data.results[numPelicula].genre_ids[2] ? item.name : undefined
            );


       // const urlTrailer=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=trailer+${res.data.results[numPelicula].title}+español&key=AIzaSyDc4qkWCb_73_VqUdJU7iLsH0mpXeUovGc`
       // const trailer=await axios.get(urlTrailer)
        
        dispatch({
            type:OBTENER_PELICULA_POR_KEYWORD_EXITO,
            payload:{
                titulo:res.data.results[numPelicula].title,
                descripcion:res.data.results[numPelicula].overview,
                foto:res.data.results[numPelicula].poster_path,
                puntuacion:res.data.results[numPelicula].vote_average,
                genero:generosNombre,
                //url:url,
               // trailer:trailer.data.items[0].id.videoId

            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerKeyWordsAccion = ()=>async(dispatch,getState)=>{

    try {
        const keyWords=await db.collection('keywords').get();
       
        
        dispatch({
            type:OBTENER_KEYWORD_EXITO,
            payload:keyWords.docs
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPeliculaQueryAccion = (query)=>async(dispatch,getState)=>{

    
    try {
       
        //console.log(query)
        const url=`https://api.themoviedb.org/3/search/movie?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&query=${query}&page=1&include_adult=false`
        
        const res =await axios.get(url)

        dispatch({
            type:OBTENER_PELICULA_QUERY_EXITO,
            payload:res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}
import React from "react";


import { View,Text,Image,StyleSheet, Button  } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { obtenerPeliculaRandom } from "../redux/peliculasDucks";

import CarouselVertical from './CarouselVertical'


export default  Pelicula = () => {
    const styles = StyleSheet.create({
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical:20,
          flex: 1,
        },
        tinyLogo: {
          width: 150,
          height: 250,
        },
        titleText: {
            paddingHorizontal:20,
            fontWeight: "bold"
          },
          NOtitleText: {
           
            fontWeight: "normal"
          },
          botonAnterior:{
              justifyContent:'space-around',
             
          }
        
      });
  const dispatch = useDispatch();

    const [posicionPelicula, setPosicionPelicula] = React.useState(0)
    const Peliculas = useSelector((store) => store.peliculas.results);
    const pathImg="http://image.tmdb.org/t/p/w185/";
    

    
    React.useEffect(() => {
      const InfoData = () => {
        dispatch(obtenerPeliculaRandom());
      };
      InfoData();
    }, [dispatch]);
    
    return (
      <View style={styles.container}>
       {Peliculas[posicionPelicula]!==undefined?(
         <CarouselVertical data={Peliculas} />
       ):(<Text>Cargando...</Text>)
}
   </View>
  );
};


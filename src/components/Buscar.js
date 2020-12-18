import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { obtenerPeliculaQueryAccion } from "../redux/peliculasDucks";

import CarouselVertical from './CarouselVertical'
import { TextInput, View, StyleSheet,Text, Button } from 'react-native';

const Peliculas = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  var Peliculas = useSelector((store) => store.peliculas.query);
  const pathImg = "http://image.tmdb.org/t/p/w185/";
 
    const [value, setValue] = React.useState('Introduzca su busqueda');

  const procesarDatos = () => {
    if (!value.trim()) {
      setError("Ingrese parametros de  busqueda");
      return;
    }
    //setError(false);
    
    dispatch(obtenerPeliculaQueryAccion(value));
    
  };

  
  return (

    <View style={styles.container}>
      
           <TextInput
      style={{ height: 40, borderColor: 'white', borderWidth: 1,color:'white',width:200,marginBottom:10}}
      importantForAutofill='Yes'
      onChangeText={text => setValue(text)}
      value={value}
    />
    <Button title='Buscar' onPress={()=>procesarDatos()}
    
    ></Button>
       {Peliculas!==undefined?(
         <CarouselVertical data={Peliculas} />
       ):(<Text>Cargando...</Text>)
}
   </View>
  );
};

export default Peliculas;

const styles = StyleSheet.create({
  input:{
    color:'white',
  },
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
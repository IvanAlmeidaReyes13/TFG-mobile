import React,{useState} from 'react'
import {View,Text,StyleSheet,Image,ScrollView} from 'react-native'
import { useDispatch, useSelector } from "react-redux";
//import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import {
  obtenerGenerosPeliculasAccion,
  obtenerPeliculaPorGeneroAccion,
} from "../redux/peliculasDucks";
const Genero = () => {
  const dispatch = useDispatch();
  const peliculaEscogida = useSelector((store) => store.peliculas.pelicula);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(28);
  const generos = useSelector((store) => store.peliculas.generos);
  const [objSelect, setObjSelect] = useState([])
  const pathImg = "http://image.tmdb.org/t/p/w185/";
  const [valorDelSelect, setValorDelSelect] = useState('Acción')
  

React.useEffect(() => {
 
 
    const InfoData = () => {
      dispatch(obtenerGenerosPeliculasAccion());
      dispatch(obtenerPeliculaPorGeneroAccion(generoSeleccionado));
    };
    InfoData();
  }, [dispatch]);
  
  

  const buscarPelicula = (value,index) => {
    
    setValorDelSelect(value)
    setGeneroSeleccionado(value);
    dispatch(obtenerPeliculaPorGeneroAccion(value));
    
  };
 
    return (
        <ScrollView>
          {generos!==undefined&&(
          <Picker
            selectedValue={valorDelSelect}
          style={{height: 50, width: 500,color:'white'}}
          onValueChange={(itemValue, itemIndex) =>
            buscarPelicula(itemValue,itemIndex)
          }
          >
          {(
            generos.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            )))}
         
        </Picker>
        )
          }
          {peliculaEscogida!==undefined&&(
            <View style={styles.container}>
            <Text style={styles.tittleText}>{peliculaEscogida.titulo}</Text>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: pathImg + peliculaEscogida.foto,
                }}
              />
              <Text style={styles.titleText}>
                <Text style={styles.NOtitleText}>{peliculaEscogida.descripcion}</Text>
              </Text>
            </View>
          )}
        </ScrollView>
    )
}

export default Genero

const styles = StyleSheet.create({
select:{
  color:'white'
},
  container: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
      marginBottom:70
  },
  tittleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    marginTop:10,
    marginBottom:20
  },
  tinyLogo: {
      width: 150,
      height: 250,
  },
  titleText: {
      paddingHorizontal: 20,
      marginBottom:10,
      marginTop:20,
      fontWeight: "bold",
      color: "white",
    },
    NOtitleText: {
      fontWeight: "normal",
      marginTop:20,
      color: "white",
      fontSize:20
    },
    botonAnterior: {
      justifyContent: "space-around",
    },
  });
  
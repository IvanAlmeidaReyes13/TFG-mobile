import React,{useState} from 'react'
import {View,Text,StyleSheet,Image,ScrollView} from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import {Picker} from '@react-native-picker/picker';
import {obtenerPeliculaPorKeyWordAccion,obtenerKeyWordsAccion } from "../redux/peliculasDucks";
const KeyWords = () => {
  const dispatch = useDispatch();
  
  const [keyWord, setKeyWord] = useState('Amor')
  const peliculaEscogida=useSelector((store) => store.peliculas.pelicula);
  const keyWordsIds=useSelector((store)=>store.peliculas.keyWords)
  const pathImg="http://image.tmdb.org/t/p/w185/";
  //const pathTrailer="https://www.youtube.com/embed/";
  
  
    React.useEffect(() => {
        const InfoData = () => {
            
            dispatch(obtenerPeliculaPorKeyWordAccion(keyWord));
            dispatch(obtenerKeyWordsAccion());
        }
        InfoData();
    }, [dispatch,keyWord]);

    const buscarPelicula=(keyWord,index)=>{
      setKeyWord(keyWord)
        dispatch(obtenerPeliculaPorKeyWordAccion(keyWord));
      }


    return (
        <ScrollView>
          {keyWordsIds!==undefined&&(
          <Picker
            selectedValue={keyWord}
          style={{height: 50, width: 500,color:'white'}}
          onValueChange={(itemValue, itemIndex) =>
            buscarPelicula(itemValue,itemIndex)
          }
          >
          {(
            keyWordsIds.map((item) => (
              <Picker.Item key={item.id} label={item.id} value={item.id} />
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

export default KeyWords



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
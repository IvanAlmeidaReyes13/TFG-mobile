import React,{useState} from 'react'
import { StyleSheet} from 'react-native'
import{DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import{Drawer,Switch,TouchableRipple,Text} from 'react-native-paper'
export default function DrawerContent(props) {
    const [active, setActive] = useState('Peliculas')
    const{navigation} = props

    const onChangeScreen= (screen='Pelicula')=>{
        setActive(screen);
        navigation.navigate(screen)
    }
    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item label='Inicio' active={active==='Pelicula'} onPress={()=>onChangeScreen('Pelicula')} /> 
                <Drawer.Item label='Búsqueda por Género' active={active==='Genero'} onPress={()=>onChangeScreen('Genero')} /> 
                <Drawer.Item label='Búsqueda por KeyWords' active={active==='KeyWords'} onPress={()=>onChangeScreen('KeyWords')} /> 
                <Drawer.Item label='Búsqueda' active={active==='Buscar'} onPress={()=>onChangeScreen('Buscar')} /> 
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

//const styles = StyleSheet.create({})

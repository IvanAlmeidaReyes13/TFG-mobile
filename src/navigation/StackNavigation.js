import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Pelicula from "../components/Pelicula";
import Genero from "../components/Genero";
import KeyWords from "../components/KeyWords";
import Buscar from "../components/Buscar"
export default StackNavigation = (props) => {
    const{navigation}=props;
    
  const butonLeft = () => {
    return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pelicula"
        component={Pelicula}
        options={{ title: "TRMA", headerLeft:()=>butonLeft() }}
        style={styles.container}
      />
      <Stack.Screen
        name="Genero"
        component={Genero}
        options={{ title: "Búsqueda por género", headerLeft:()=>butonLeft() }}
        style={styles.container}
      />
      <Stack.Screen
        name="KeyWords"
        component={KeyWords}
        options={{ title: "Búsqueda por KeyWord", headerLeft:()=>butonLeft() }}
        style={styles.container}
      />
       <Stack.Screen
        name="Buscar"
        component={Buscar}
        options={{ title: "Búsqueda", headerLeft:()=>butonLeft() }}
        style={styles.container}
      />
    </Stack.Navigator>
  );
};

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d2430",
  },
});

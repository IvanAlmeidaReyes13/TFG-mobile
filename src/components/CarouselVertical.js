import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
const CarouselVertical = (props) => {
  
  const { data } = props;
  const { width } = Dimensions.get("window");
  const ITEM_WIDTH = Math.round(width * 0.9);
  const pathImg = "http://image.tmdb.org/t/p/w185/";
  const RenderItem = (props) => {
    const { item } = props;
    return item['overview']!==""&&item['poster_path']!==""&&(
      
      <ScrollView style={styles.Scroll}>
        <View style={styles.container}>
        <Text style={styles.tittleText}>{item["title"]}</Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: pathImg + item["poster_path"],
            }}
          />
          <Text style={styles.titleText}>
            <Text style={styles.NOtitleText}>{item["overview"]}</Text>
          </Text>
        </View>
      </ScrollView>
      
    );
  };
  return (
    <Carousel
      layout={"default"}
      data={data}
      renderItem={(item) => RenderItem(item)}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      style={styles.todo}
    ></Carousel>
  );
};

export default CarouselVertical;

const styles = StyleSheet.create({

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
  marginTop:30,
  marginBottom:10
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

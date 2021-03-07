import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full heigh

const BlockMenu = (props) => {
  //   const { imageName, text } = props;
  return (
    <View style={myStyle.box}>
      <Text style={myStyle.textBox}>{props.text}</Text>
      {console.log(props.image)}
      <Image
        source={require(`../images/${"re.png"}`)}
        style={myStyle.imageStyleBox}
      />
    </View>
  );
};
const myStyle = StyleSheet.create({
  box: {
    width: width / 2 - 15,
    height: height / 4,
    backgroundColor: "#E9967A",
    borderRadius: 30,

    marginVertical: 5,
  },
  imageStyleBox: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    position: "absolute",
    top: 70,
  },
  textBox: {
    marginTop: 15,
    marginHorizontal: 10,
    fontSize: 31,
    fontWeight: "bold",
    color: "white",
  },
});

export default BlockMenu;

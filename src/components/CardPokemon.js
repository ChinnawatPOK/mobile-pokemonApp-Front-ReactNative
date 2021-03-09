import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full heigh

const CardPokemon = (props) => {
  const navigation = useNavigation();
  const [species, setSpecies] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  const { pokemonId, pokemonName, nameUser } = props.item;
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then((res) => {
        setSpecies(res.data);
      })
      .catch((err) => {
        console.log("err poke id");
        if (err.response.status === 404) Alert.alert("404 POK");
        console.log(err);
      });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res2) => {
        setPokemon(res2.data);
      })
      .catch((err) => {
        console.log("err spes");
        console.log(err);
      });
  }, []);
  return (
    <View style={myStyle.box}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Pokemon", { idd: pokemonId })}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          <View>
            {species && (
              <Text
                style={{ fontSize: 32, color: "white", fontWeight: "bold" }}
              >
                {species.name}
              </Text>
            )}
            <View style={{ flexDirection: "row" }}>
              {pokemon &&
                pokemon.types.map((cur) => (
                  <View
                    style={{
                      backgroundColor: "#aa2b1d",
                      marginHorizontal: 3,
                      alignItems: "center",
                      borderRadius: 3,
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 4,
                        marginVertical: 2,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {cur.type.name}{" "}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          <Image
            source={require(`../images/rr.png`)}
            style={{ width: 100, height: 100, opacity: 0.1 }}
          />

          <Image
            style={{
              width: 125,
              height: 125,
              resizeMode: "stretch",
              top: -20,
              position: "relative",
            }}
            source={{
              uri: `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`,
            }}
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const myStyle = StyleSheet.create({
  box: {
    width: width - 30,
    height: 120,
    backgroundColor: "#9b5151",
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default CardPokemon;

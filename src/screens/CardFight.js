import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const CardFight = ({ route }) => {
  const {
    opponentName,
    opponentd,
    opponentImage,
    opponentType,
    pokemonMe,
  } = route.params;
  const [cardOpponent, setcardOpponent] = useState(null);
  const [cardMe, setcardMe] = useState(null);
  const [randomCardOpponent, setrandomCardOpponent] = useState(null);
  const [randomCardMe, setrandomCardMe] = useState(null);
  const [lengthOpponent, setlengthOpponent] = useState(0);
  const [lengthMe, setlengthMe] = useState(0);
  const [hpMe, sethpMe] = useState(0);
  const [hpOpponent, sethpOpponent] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`https://api.pokemontcg.io/v2/cards?q=name:${opponentName}`)
      .then((res) => {
        setcardOpponent(res.data.data);
        setlengthOpponent(res.data.data.length);
      })
      .catch((err) => {
        [console.log(err)];
      });
    // console.log(pokemonMe.pokemonName);
    axios
      .get(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonMe.pokemonName}`)
      .then((res) => {
        setcardMe(res.data.data);
        // console.log(cardMe);
        setlengthMe(res.data.data.length);
      })
      .catch((err) => {
        [console.log(err)];
      });
  }, []);

  useEffect(() => {
    setrandomCardOpponent(
      Math.floor(Math.random() * (lengthOpponent * 1 + 1) + 1)
    );
  }, [lengthOpponent]);
  useEffect(() => {
    setrandomCardMe(Math.floor(Math.random() * (lengthMe * 1 + 1) + 1));
  }, [lengthMe]);

  useEffect(() => {
    if (cardOpponent && cardOpponent.length != 0) {
      sethpOpponent(
        cardOpponent.filter((item, index) => index + 1 == randomCardOpponent)[0]
          .hp
      );
    }
  }, [randomCardOpponent]);

  useEffect(() => {
    if (cardMe && cardMe.length != 0) {
      sethpMe(cardMe.filter((item, index) => index + 1 == randomCardMe)[0].hp);
    }
  }, [randomCardMe]);

  const calWin = (me, opponent) => {
    console.log(hpMe);
    console.log(hpOpponent);
    if (hpMe > hpOpponent) {
      return "YOU WIN";
    } else if (hpMe < hpOpponent) {
      return "YOU LOSE";
    } else if (hpMe == hpOpponent) {
      return "SAME";
    } else {
      return "GAME ERROR";
    }
  };
  return (
    <View style={myStyles.container}>
      <View
        style={{
          flex: 0.2,
          backgroundColor: "#e52d27",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          position: "relative",
          zIndex: 15,
        }}
      >
        <Image
          style={{
            width: 150,
            height: 150,
            opacity: 0.2,
            position: "absolute",
            right: -20,
            top: -10,
          }}
          source={{
            uri:
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f720bb6e-b303-4877-bffb-d61df0ab183f/d3b98cf-4fc5c76b-2a99-47fc-98b6-d7d4ee8d9d9f.png",
          }}
        ></Image>
        <Text
          style={{
            fontSize: 25,
            letterSpacing: 1,
            color: "#d8bcbb",
            fontWeight: "bold",
            marginTop: 30,
            marginLeft: 20,
          }}
        >
          Battle Mode
        </Text>
        <Text
          style={{
            fontSize: 25,
            letterSpacing: 1,
            color: "#fff",
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          status: FIGHTING
        </Text>
      </View>

      <View style={{ flex: 0.8 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 1,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          BATTLE
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: width,
            marginTop: 20,
          }}
        >
          {cardMe &&
            cardMe.map((item, index) => {
              if (index + 1 == randomCardMe) {
                return (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "red",
                        color: "#fff",
                        borderRadius: 6,
                      }}
                    >
                      Me
                    </Text>
                    <Image
                      style={{ width: 170, height: 250, resizeMode: "stretch" }}
                      source={{ uri: item.images.small }}
                    ></Image>
                    <Text
                      style={{
                        backgroundColor: "#e4e6e5",
                        borderRadius: 7,
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      HP-{item.hp}
                    </Text>
                  </View>
                );
              }
            })}
          {cardOpponent &&
            cardOpponent.map((item, index) => {
              if (index + 1 == randomCardOpponent) {
                return (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "green",
                        color: "#fff",
                        borderRadius: 6,
                      }}
                    >
                      Opponent
                    </Text>
                    <Image
                      style={{ width: 170, height: 250, resizeMode: "stretch" }}
                      source={{ uri: item.images.small }}
                    ></Image>
                    <Text
                      style={{
                        backgroundColor: "#e4e6e5",
                        borderRadius: 7,
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      HP-{item.hp}
                    </Text>
                  </View>
                );
              }
            })}
        </View>
        <Divider
          style={{
            backgroundColor: "red",
            height: 2,
            marginHorizontal: 20,
            marginBottom: 10,
            marginVertical: 30,
          }}
        />
        {/* <Text
          style={{
            fontSize: 40,
            letterSpacing: 1,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {hpMe && hpOpponent && calWin(hpMe, hpOpponent)}
        </Text> */}
        <TouchableOpacity onPress={() => navigation.navigate("RandomFight")}>
          <Text
            style={{
              fontSize: 20,
              letterSpacing: 1,
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "red",
              color: "#fff",
              paddingVertical: 20,
              marginTop: 30,
              marginHorizontal: 30,
              borderRadius: 30,
            }}
          >
            END GAME >>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e52d272c",
  },
});

export default CardFight;

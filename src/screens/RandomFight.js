import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ModalFightRandom from "./ModalFightRandom";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
import { useNavigation } from "@react-navigation/native";

const RandomFight = ({ route }) => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [id_pokemon, setid_pokemon] = useState(null);
  const [dataPokemon, setdataPokemon] = useState(null);
  const [dataSpecie, setdataSpecie] = useState(null);
  const navigation = useNavigation();
  const { idUser } = route.params;

  //   const randomPokemon = () => {
  //     Math.floor(Math.random() * 1001 + 1)
  //   }

  useEffect(() => {
    if (id_pokemon) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`)
        .then((res) => {
          setdataPokemon(res.data);
        });
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id_pokemon}`)
        .then((res) => {
          setdataSpecie(res.data);
        });
    }
  }, [id_pokemon]);

  const closeModal = () => {
    setisOpenModal(false);
    navigation.navigate("SelectFightOwn", {
      namePoke: dataSpecie.name,
      type: dataPokemon.types,
      idPoke: id_pokemon,
      idUser: idUser,
      image: `https://pokeres.bastionbot.org/images/pokemon/${id_pokemon}.png`,
    });
  };

  return (
    <ImageBackground
      style={{ flex: 1, opacity: 0.7, justifyContent: "flex-end" }}
      source={{
        uri:
          "https://i.pinimg.com/564x/19/cc/67/19cc67df627576729f240b6b23f278e1.jpg",
      }}
    >
      {isOpenModal && dataPokemon && dataSpecie && (
        <ModalFightRandom
          fn_close={closeModal}
          namePoke={dataSpecie.name}
          type={dataPokemon.types}
          idPoke={id_pokemon}
          image={`https://pokeres.bastionbot.org/images/pokemon/${id_pokemon}.png`}
        />
      )}

      <LinearGradient
        colors={["#cb2d3e", "#ef473a"]}
        style={{
          width: 350,
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginBottom: 35,
          borderRadius: 40,
          borderWidth: 5,
          borderColor: "red",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setid_pokemon(Math.floor(Math.random() * 1001 + 1));
            setisOpenModal(true);
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              letterSpacing: 1,
              fontWeight: "bold",
            }}
          >
            BATTLE - RANDOM
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

export default RandomFight;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full heigh

const ModalRandom = (props) => {
  const [response, setResponse] = useState(null);
  const [species, setSpecies] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${props.number}`)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("err poke id");
        if (err.response.status === 404) props.fn_close();
        console.log(err);
      });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${props.number}`)
      .then((res2) => {
        setSpecies(res2.data);
      })
      .catch((err) => {
        console.log("err spes");
        console.log(err);
      });
  }, []);
  const app = () => {
    {
      response &&
        axios
          .get(
            `http://10.0.2.2:8080/api/checkRandomPerDays?userId=${props.userId}&pokeName=${response.name}&pokeId=${props.number}`
          )
          .then((ress) => {
            props.fn_close();
            console.log(ress.data);
            console.log("saved pok");
          })
          .catch((err) => {
            console.log("save err");
            console.log(err);
          });
    }
  };
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={props.data}
      onRequestClose={() => {
        app();
      }}
    >
      <View
        style={{
          flex: 1,
          width: width,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 300 }}
          onPress={() => {
            // props.fn_close();
            app();
          }}
        >
          <LinearGradient
            colors={["#403B4A", "#E7E9BB"]}
            style={{
              display: "flex",
              height: height,
              marginTop: 350,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 30,
                  marginVertical: 3,
                  color: "#ffbe0f",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                Congratuations !
              </Text>
              <Image
                source={require(`../images/cong.png`)}
                style={{ width: 50, height: 50, opacity: 0.5 }}
              />
            </View>
            <Divider
              style={{ width: 250, alignSelf: "center", marginVertical: 10 }}
            />
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <Image
                style={{ width: 200, height: 200 }}
                source={{
                  uri: `https://pokeres.bastionbot.org/images/pokemon/${props.number}.png`,
                }}
              ></Image>
              <View
                style={{
                  padding: 3,
                  borderRadius: 10,
                }}
              >
                {response && (
                  <Text
                    style={{
                      fontSize: 32,
                      color: "white",
                      fontWeight: "900",
                      marginHorizontal: 20,
                    }}
                  >
                    {response.name}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, marginRight: 5 }}>
                      {species && species.weight}
                    </Text>
                    <Text style={{ fontSize: 14 }}>Kg.</Text>
                  </View>

                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Weight
                  </Text>
                </View>
                <Text style={{ marginHorizontal: 10, fontSize: 32 }}> | </Text>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, marginRight: 5 }}>
                      {species && species.height}
                    </Text>
                    <Text style={{ fontSize: 14 }}>M.</Text>
                  </View>

                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Height
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Types :
                </Text>

                {species &&
                  species.types.map((cur) => (
                    <View
                      style={{
                        marginHorizontal: 3,
                        backgroundColor: "#fa1e0e",
                        padding: 2,
                        borderRadius: 10,
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: 18,
                          marginHorizontal: 10,
                        }}
                      >
                        {cur.type.name}
                      </Text>
                    </View>
                  ))}
                {/* </View> */}
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalRandom;

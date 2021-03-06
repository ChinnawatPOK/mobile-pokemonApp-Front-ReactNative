import axios from "axios";
import { AsyncStorage } from "@react-native-community/async-storage";
import React, { useState, useEffect } from "react";
import spring from "../api/spring";

export default () => {
  const [response, setResponse] = useState([]);

  const getUserPokemon = async (Id) => {
    const getPokemonApi = await spring
      .get("/getPokemonById", {
        params: { userId: Id },
      })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        // console.log("erro pok");
        console.log(error);
      });
  };
  const login = async (username, password, setLoginRes, setLoginErr) => {
    const resLogin = await spring
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setLoginRes(res);
      })
      .catch((error) => {
        if (error.response.status === 400) setLoginRes(error.response);
      });
  };
  const registerApi = async (username, password, setRegisRes) => {
    const responseRegis = await spring
      .post("/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        setRegisRes(res);
      })
      .catch((error) => {
        if (error.response.status === 400) setLoginRes(error.response);
        console.log("error regis");
      });
  };
  return [registerApi, getUserPokemon, login, response];
};

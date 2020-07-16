import { useState, useEffect } from "react";

const { API } = require("../../backend");

export const getProductS = () => {


    return fetch(`${API}/products`, {method: "GET"})
      .then(
          response => {
              return response.json()
          }
      )
      .catch(err => console.log(err))

}
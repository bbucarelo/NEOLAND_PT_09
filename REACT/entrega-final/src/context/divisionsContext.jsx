import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const DivisionsContext = createContext();

const divisionsReducer = (state, action) => {
  switch (action.type) {
    case "GET_DIVISIONS":
      return action.payload;
    case "ADD_DIVISION":
      return [...state, action.payload];
    case "UPDATE_DIVISION":
      return state.map((division) =>
        division._id === action.payload._id ? action.payload : division
      );
    case "DELETE_DIVISION":
      return state.filter((division) => division._id !== action.payload);
    default:
      return state;
  }
};

export const DivisionsProvider = ({ children }) => {
  const [divisions, dispatch] = useReducer(divisionsReducer, []);

  useEffect(() => {
    const getDivisions = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/v1/division/getAll");
        dispatch({ type: "GET_DIVISIONS", payload: response.data });
      } catch (error) {
        console.error("Error al obtener las divisiones", error);
      }
    };
    getDivisions();
  }, []);

  const addDivision = async (division) => {
    try {
      const response = await axios.post("http://localhost:8081/api/v1/division/create", division);
      dispatch({ type: "ADD_DIVISION", payload: response.data });
    } catch (error) {
      console.error("Error al crear la división", error);
    }
  };

  const updateDivision = async (id, division) => {
    try {
      const response = await axios.patch(`http://localhost:8081/api/v1/division/update/${id}`, division);
      dispatch({ type: "UPDATE_DIVISION", payload: response.data });
    } catch (error) {
      console.error("Error al actualizar la división", error);
    }
  };

  const deleteDivision = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/division/delete/${id}`);
      dispatch({ type: "DELETE_DIVISION", payload: id });
    } catch (error) {
      console.error("Error al eliminar la división", error);
    }
  };

  return (
    <DivisionsContext.Provider value={{ divisions, addDivision, updateDivision, deleteDivision }}>
      {children}
    </DivisionsContext.Provider>
  );
};

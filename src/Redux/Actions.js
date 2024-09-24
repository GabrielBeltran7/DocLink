/* eslint-disable no-unused-vars */

import { GET_DOCUMENT_ID, UPDATE_DOCUMENT_SUCCESS} from "./ActionsTypes"

import {db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";   // Agregamos la importación de storage

import { collection,addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'; // Asegúrate de tener las importaciones correctas

import { Alert } from "react-native";

export const updateDocument = (UpdateDocuments) => {
  return async (dispatch) => {
    // Verifica si UpdateDocuments y el ID están definidos
    if (!UpdateDocuments || !UpdateDocuments.id) {
      console.error("El objeto UpdateDocuments o el campo 'id' no está definido");
      Alert.alert("Error", "Datos incompletos para la actualización.", [{ text: "OK" }]);
      return;
    }

    // Verifica que todos los campos requeridos están definidos
    const requiredFields = [
      'documentType', 'documentNumber', 'foundOrLost',
      'contactName', 'email', 'phoneNumber', 'country',
      'city', 'address'
    ];

    for (const field of requiredFields) {
      if (!UpdateDocuments[field]) {
        console.error(`El campo ${field} no está definido`);
        Alert.alert("Error", `Falta el campo ${field}.`, [{ text: "OK" }]);
        return;
      }
    }

    try {
      // Obtén la referencia del documento usando el ID proporcionado
      const documentRef = doc(db, "DocumentRegister", UpdateDocuments.id); 

      // Actualiza el documento en Firestore
      await updateDoc(documentRef, {
        documentType: UpdateDocuments.documentType,
        documentNumber: UpdateDocuments.documentNumber,
        foundOrLost: UpdateDocuments.foundOrLost,
        contactName: UpdateDocuments.contactName,
        email: UpdateDocuments.email,
        phoneNumber: UpdateDocuments.phoneNumber,
        country: UpdateDocuments.country,
        city: UpdateDocuments.city,
        address: UpdateDocuments.address,
      });

      Alert.alert(
        "Actualización Exitosa",
        "El documento se ha actualizado correctamente.",
        [{ text: "OK" }]
      );

       dispatch({ type: 'UPDATE_DOCUMENT_SUCCESS', payload: UpdateDocuments });

    } catch (error) {
      console.error("Error al actualizar el documento:", error);
      Alert.alert(
        "Error",
        "No se pudo actualizar el documento. Por favor, inténtalo de nuevo.",
        [{ text: "OK" }]
      );
    }
  };
};


export const registerDocument = (user) => {
  return async (dispatch) => {
    try {
      const { documentNumber } = user; // Obtener el número de documento del usuario
      const customersCollection = collection(db, "DocumentRegister");

      // Crear una consulta para verificar si ya existe un documento con el mismo número
      const q = query(customersCollection, where("documentNumber", "==", documentNumber));
      const snapshot = await getDocs(q);

      // Si el documento ya existe, mostrar alerta y no registrar
      if (!snapshot.empty) {
        Alert.alert(
          "Documento ya Registrado",
          "El documento ya se encuentra registrado. Por favor, consulta los datos.",
          [{ text: "OK" }]
        );
        return; // Salir de la función si ya está registrado
      }

      // Si no existe, registrar el nuevo documento
      await addDoc(customersCollection, user);
      Alert.alert(
        "Registro Exitoso",
        "El documento se ha registrado correctamente.",
        [{ text: "OK" }]
      );
      
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo registrar el documento. Por favor, inténtalo de nuevo.",
        [{ text: "OK" }]
      );
    }
  };
};


export const searchDocument = (documentNumber) => {

  return async (dispatch) => {
    try {
      // Crear la consulta para buscar el documento donde documentNumber sea igual al proporcionado
      const q = query(collection(db, "DocumentRegister"), where("documentNumber", "==", documentNumber));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Si no se encuentra el documento, despachar error
        Alert.alert(
          "Documento o Placa no Encontrado",
          "DEBE REGISTRALO.",
          [{ text: "OK" }]
        );
        
        return;
      }
      // Si se encuentra, despachar los resultados
      snapshot.forEach((doc) => {
        const documentData = { id: doc.id, ...doc.data() };

        
        if (documentData.contactName) {
        }

        dispatch({ type: "GET_DOCUMENT_ID", payload: documentData });
        console.log("333333333333333333", documentData)

        

      });
      
    } catch (error) {
      Alert.alert(
        "Error",
        "Al buscar el documento.",
        [{ text: "OK" }]
      );
      
    }
  };
};


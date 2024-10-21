/* eslint-disable no-unused-vars */

import { GET_DOCUMENT_ID, UPDATE_DOCUMENT_SUCCESS } from "./ActionsTypes";

import { db } from "../../api/firebase/FirebaseConfig/FirebaseConfig"; // Agregamos la importación de storage

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore"; // Asegúrate de tener las importaciones correctas

import { Alert } from "react-native";

export const deleteDocument = (documentId) => {
  return async (dispatch) => {
    try {
      // Verifica que el ID del documento esté definido
      if (!documentId) {
        Alert.alert("Error", "ID del documento no encontrado.", [
          { text: "OK" },
        ]);
        return;
      }

      // Obtén la referencia del documento usando el ID proporcionado
      const documentRef = doc(db, "DocumentRegister", documentId);

      // Actualiza el documento para marcarlo como eliminado
      await updateDoc(documentRef, {
        isDeleted: true, // Cambia isDeleted a true
      });

      // Despacha acción para actualizar el estado en Redux
      dispatch({ type: "GET_DOCUMENT_ID", payload: null });
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo eliminar el documento. Por favor, inténtalo de nuevo.",
        [{ text: "OK" }]
      );
    }
  };
};

export const updateDocument = (UpdateDocuments) => {
  return async (dispatch) => {
    // Verifica si UpdateDocuments y el ID están definidos
    if (!UpdateDocuments || !UpdateDocuments.id) {
      Alert.alert("Error", "Datos incompletos para la actualización.", [
        { text: "OK" },
      ]);
      return;
    }

    // Verifica que todos los campos requeridos están definidos
    const requiredFields = [
      "documentType",
      "documentNumber",
      "foundOrLost",
      "contactName",
      "email",
      "phoneNumber",
      "country",
      "city",
      "address",
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
        otherUserId: UpdateDocuments.otherUserId,
      });

      Alert.alert(
        "Actualización Exitosa",
        "El documento se ha actualizado correctamente.",
        [{ text: "OK" }]
      );

      dispatch({ type: "UPDATE_DOCUMENT_SUCCESS", payload: UpdateDocuments });
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo actualizar el documento. Por favor, inténtalo de nuevo.",
        [{ text: "OK" }]
      );
    }
  };
};





export const registerDocument = (user, navigation) => {
  return async (dispatch) => {
    try {
      const { documentNumber } = user; // Obtener el número de documento del usuario
      const customersCollection = collection(db, "DocumentRegister");

      // Crear una consulta para verificar si ya existe un documento con el mismo número
      const q = query(
        customersCollection,
        where("documentNumber", "==", documentNumber)
      );
      const snapshot = await getDocs(q);

      // Verificar si hay algún documento existente con isDeleted en false
      let foundActiveDocument = false;

      // Recorrer todos los documentos encontrados
      snapshot.forEach((doc) => {
        const existingDocument = doc.data(); // Obtener los datos del documento
        if (existingDocument.isDeleted === false) {
          foundActiveDocument = true; // Encontramos un documento activo
        }
      });

      // Si se encontró un documento activo, mostrar alerta y salir
      if (foundActiveDocument) {
        Alert.alert(
          "Documento ya Registrado",
          "El documento ya se encuentra registrado y no se puede volver a registrar. Por favor, consulta los datos.",
          [{ text: "OK", onPress: () => navigation.navigate('HomeMain') }]
        );
        

        return; // Salir de la función si hay un documento activo
      }

      // Si no se encontró ningún documento activo, registrar el nuevo documento
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
      const q = query(
        collection(db, "DocumentRegister"),
        where("documentNumber", "==", documentNumber),
        where("isDeleted", "==", false) // Solo documentos no eliminados
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Si no se encuentra el documento, despachar error
        Alert.alert("Documento o Placa no Encontrado", "REGÍSTRALO.", [
          { text: "OK" },
        ]);
        dispatch({ type: "GET_DOCUMENT_ID", payload: null });
        return;
      }

      // Despachar el primer documento activo encontrado
      const documentData = {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      };
      dispatch({ type: "GET_DOCUMENT_ID", payload: documentData });
    } catch (error) {
      Alert.alert("Error", "Al buscar el documento.", [{ text: "OK" }]);
    }
  };
};

/* eslint-disable no-unused-vars */

import { GET_USER_PROFILE, NEW_PHOTO_USER,  NEW_PHOTO_PICKER,UPDATE_USER_PROFILE} from "./ActionsTypes"

import {
  collection,
  where,
  getDocs,
  query,
  addDoc,
  updateDoc
} from "firebase/firestore";
import { storage } from "../../api/firebase/FirebaseConfig/FirebaseConfig";
import {db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";   // Agregamos la importación de storage
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const updateUserDate = (input) => {
  return async (dispatch) => {
    try {
      // Crear una referencia a la colección "customers" en Firebase Firestore
      const customersCollection = collection(db, "customers");
      // Realizar una consulta para encontrar documentos con el campo "email" igual al proporcionado en "input"
      const q = query(customersCollection, where("email", "==", input.email));
      // Esperar a que la consulta se resuelva y obtener un "querySnapshot"
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si se encuentra un documento que coincide con el correo electrónico, obtener su referencia
        const docRef = querySnapshot.docs[0].ref;

        // Crear un objeto "updatedUserData" con las propiedades a actualizar
        const updatedUserData = {
          name: input.name,
          phone: input.phone,
          email: input.email,
        };

        // Si se proporciona una foto de perfil, convertir la ruta de archivo local en un Blob
        if (input.photo) {
          const response = await fetch(input.photo);
          const blob = await response.blob();

          // Subir el Blob a Firebase Storage
          const storageRef = ref(storage, `profile_images/${input.email}.jpg`);
          await uploadBytes(storageRef, blob);

          // Obtener la URL pública de la imagen
          const downloadURL = await getDownloadURL(storageRef);

          // Agregar la URL de la imagen al objeto "updatedUserData"
          updatedUserData.photo = downloadURL;
        }

        // Actualizar el documento en Firestore con los datos en "updatedUserData"
        await updateDoc(docRef, updatedUserData);

        // Actualizar el estado de Redux con los datos actualizados
        dispatch({
          type: UPDATE_USER_PROFILE,
          payload: updatedUserData,
        });
      } else {
        // Si no se encuentra un documento con el correo electrónico proporcionado, registrar un mensaje de consola
        console.log("No se encontraron resultados para el correo electrónico");
      }
    } catch (error) {
      // Capturar y registrar cualquier error que ocurra durante la ejecución
      console.error(error);
    }
  };
};

export const getUserProfile = (email) => {
  return async (dispatch) => {
    try {
      
      const customersCollection = collection(db, "customers");
      const q = query(customersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        dispatch({ type: GET_USER_PROFILE, payload: userData });
      } else {
        console.log("No se encontraron resultados para el correo electrónico");
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const dispatchImagePicker = (image) => {
  return async (dispatch) =>{
    dispatch({
      type: NEW_PHOTO_PICKER,
      payload: image
    })
  }
}



export  const dispatchImage =(newphoto) =>{
  return async (dispatch) =>{
    dispatch({
      type: NEW_PHOTO_USER,
      payload: newphoto
    })
  }

}

export const postUser = (user) => {
  
  return async (dispatch) => {
    try {
      const firestore = getFirestore();
      const customersCollection = collection(firestore, "customers");
      await addDoc(customersCollection, user);
    } catch (error) {
      console.error(error);
    }
  };
};


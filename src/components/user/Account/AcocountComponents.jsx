import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserDate } from "../../../Redux/Actions";
import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";


import { useNavigation } from "@react-navigation/native";

import styles from "./AcocountComponentsStyle";


const AccountComponent = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.userdata);
  const dateUser = auth.currentUser;
  const userEmail = dateUser ? dateUser.email : "";
  
  useEffect(() => {
    dispatch(getUserProfile(userEmail));
  }, [dispatch, userEmail]);

  const newphotouser = useSelector((state) => state.newphotouser);


  const [input, setInput] = useState({
    email: userdata.email || "",
    phone: userdata.phone || "",
    name: userdata.name || "",
    photo: userdata.photo,
    ruc: userdata.ruc || "",
  });

console.log("88888888888888888888", input.photo)
console.log("555555555555555555555", userdata)
console.log("***********************", newphotouser) 


  const navigateCamera = () => {
    navigation.navigate("CameraComponents");
  };

  const navigateImagePicker = () => {
    navigation.navigate("ImagePickerComponent");
  };

  const handleChangeInput = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };



  useEffect(() => {
    if (newphotouser && newphotouser.length > 0) {
      setInput((prevState) => ({ ...prevState, photo: newphotouser }));
    }
  }, [newphotouser]);
  

  const takePictureButton = (
    <TouchableOpacity onPress={navigateCamera} style={styles.cameraButton}>
      <Icon name="camera" size={50} color="white" />
    </TouchableOpacity>
  );

  const handleUserdate = () => {
    dispatch(updateUserDate(input));
  };

  return (
    <View>
      {takePictureButton}

      <TouchableOpacity onPress={navigateImagePicker} style={styles.cameraButton}>
        <Icon name="image" size={50} color="white" />
      </TouchableOpacity>
      
      
      
  <Image source={{ uri: input.photo }} style={{ width: 100, height: 100 }}>
  </Image>


      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={input.name}
          onChangeText={(text) => handleChangeInput("name", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ruc"
          value={input.ruc}
          onChangeText={(text) => handleChangeInput("ruc", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={input.email}
          keyboardType="email-address"
          onChangeText={(text) => handleChangeInput("email", text)}
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="blue" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={input.phone.toString()}
          onChangeText={(text) => handleChangeInput("phone", text)}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity onPress={handleUserdate}>
        <Text>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountComponent;


// import React, { useState, useEffect } from "react";
// import { View, TextInput, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserProfile } from "../../../Redux/Actions";
// import { auth } from "../../../../api/firebase/FirebaseConfig/FirebaseConfig";
// import { updateUserDate } from "../../../Redux/Actions";

// import { useNavigation } from "@react-navigation/native";

// import styles from "./AcocountComponentsStyle";


// const AccountComponent = () => {

//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const userdata = useSelector((state) => state.userdata);
//   const dateUser = auth.currentUser;
//   const userEmail = dateUser ? dateUser.email : "";
//   useEffect(() => {
//     dispatch(getUserProfile(userEmail));
//   }, [dispatch, userEmail]);

//   const newphotouser = useSelector((state) => state.newphotouser);


//   const [input, setInput] = useState({
//     email: userdata.email || "",
//     phone: userdata.phone || "",
//     name: userdata.name || "",
//     photo: userdata.photo,
//     ruc: userdata.ruc || "",
//   });

// console.log("88888888888888888888", input.photo)
// console.log("555555555555555555555", userdata)
// console.log("***********************", newphotouser) 


//   const navigateCamera = () => {
//     navigation.navigate("CameraComponents");
//   };

//   const navigateImagePicker = () => {
//     navigation.navigate("ImagePickerComponent");
//   };

//   const handleChangeInput = (name, value) => {
//     setInput({
//       ...input,
//       [name]: value,
//     });
//   };



//   useEffect(() => {
//     if (newphotouser && newphotouser.length > 0) {
//       setInput((prevState) => ({ ...prevState, photo: newphotouser }));
//     }
//   }, [newphotouser]);
  

//   const takePictureButton = (
//     <TouchableOpacity onPress={navigateCamera} style={styles.cameraButton}>
//       <Icon name="camera" size={50} color="white" />
//     </TouchableOpacity>
//   );

//   const handleUserdate = () => {
//     dispatch(updateUserDate(input));
//   };

//   return (
//     <View>
//       {takePictureButton}

//       <TouchableOpacity onPress={navigateImagePicker} style={styles.cameraButton}>
//         <Icon name="image" size={50} color="white" />
//       </TouchableOpacity>
      
      
      
//   <Image source={{ uri: input.photo }} style={{ width: 100, height: 100 }}>
//   </Image>


//       <View style={styles.inputContainer}>
//         <Icon name="user" size={20} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Nombre"
//           value={input.name}
//           onChangeText={(text) => handleChangeInput("name", text)}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Icon name="user" size={20} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Ruc"
//           value={input.ruc}
//           onChangeText={(text) => handleChangeInput("ruc", text)}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Icon name="envelope" size={20} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Correo"
//           value={input.email}
//           keyboardType="email-address"
//           onChangeText={(text) => handleChangeInput("email", text)}
//           editable={false}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Icon name="phone" size={20} color="blue" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Teléfono"
//           value={input.phone.toString()}
//           onChangeText={(text) => handleChangeInput("phone", text)}
//           keyboardType="numeric"
//         />
//       </View>
//       <TouchableOpacity onPress={handleUserdate}>
//         <Text>Actualizar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AccountComponent;


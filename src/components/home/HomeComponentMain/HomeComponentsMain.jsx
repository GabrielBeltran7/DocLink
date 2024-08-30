import React from 'react';
import { View } from 'react-native';
import HomeNanvar from '../HomeNanvar/HomeNanvar';
import { getUserProfile } from '../../../Redux/Actions';
import { auth } from '../../../../api/firebase/FirebaseConfig/FirebaseConfig';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const HomeComponentsMain = () => {
//   dispatch = useDispatch()
//   const dateUser = auth.currentUser;
//   const userEmail = dateUser ? dateUser.email : '';

// console.log(dateUser)
//       useEffect(()=>{
//         dispatch(getUserProfile(userEmail))
//           },[])
     
  return (
    <View>
      <HomeNanvar />
    </View>
  );
};

export default HomeComponentsMain;

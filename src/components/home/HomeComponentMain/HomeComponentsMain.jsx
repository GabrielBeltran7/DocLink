import React from 'react';
import { View } from 'react-native';
import HomeNanvar from '../HomeNanvar/HomeNanvar';
import { getUserProfile } from '../../../Redux/Actions';
import { auth } from '../../../../api/firebase/FirebaseConfig/FirebaseConfig';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomeVistaContactos from '../HomeVistaContacto/HomeVistaContactos';

const HomeComponentsMain = () => {
  return (
    <View>
      <HomeNanvar />
      <HomeVistaContactos />
    </View>
  );
};

export default HomeComponentsMain;

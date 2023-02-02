/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNTextDetector from 'rn-text-detector';
import Toast from 'react-native-simple-toast';

const baseURL =
  'https://chapshop.softprodigyphp.in/api/v1/product/getProductUsingSKU/';

export default function ScannerScreen(props) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    loading: false,
    image: null,
    textRecognition: null,
    toast: {
      message: '',
      isVisible: false,
    },
  });

  const getProductDetails = skuNameToSearch => {
    setLoading(true);
    fetch(baseURL + skuNameToSearch, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2FqYWxAeW9wbWFpbC5jb20iLCJ1c2VyVHlwZSI6IkFkbWluIiwiaWF0IjoxNjY3MTk5ODU1fQ.Pf2KB14J6FEHsvqRFOvTb-9_dzw9sgDNx5_mqtNgJnE',
      },
    })
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        if (Object.values(json.data).length > 0) {
          props.navigation.navigate('Home', {
            productDetails: json.data,
            loading: loading,
          });
        } else {
          Toast.show('Invalid code product not found');
          props.navigation.navigate('ManualSKU');
        }
      })
      .catch(err => console.error(err.message));
  };

  function scanPhoto(type) {
    requestCameraPermission();
    setState({...state, loading: true});
    type === 'capture'
      ? launchCamera({mediaType: 'image'}, onImageSelect)
      : launchImageLibrary({mediaType: 'image'}, onImageSelect);
  }

  async function onImageSelect(media) {
    if (!media) {
      setState({...state, loading: false});
      return;
    }
    if (!!media && media.assets) {
      try {
        const file = media.assets[0].uri;
        const textRecognition = await RNTextDetector.detectFromUri(file);
        let recognizedText = textRecognition[0].text;
        let detectedText =
          recognizedText.charAt(0).toUpperCase() +
          recognizedText.slice(1).toLowerCase();
        console.log('detectedText', detectedText);
        getProductDetails(detectedText);
      } catch (e) {
        console.log(e);
        Toast.show('Scan a proper Image');
      }
    }
  }

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'ChapShop App Camera Permission',
          message: 'ChapShop App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, marginTop: 10}}>ChopShop Inventory</Text>
        <View>
          <TouchableOpacity
            style={{
              marginTop: 50,
              backgroundColor: 'lightgray',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => scanPhoto('capture')}>
            <Text>Scan Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

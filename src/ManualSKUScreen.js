/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import Toast from 'react-native-simple-toast';

const baseURL =
  'https://chapshop.softprodigyphp.in/api/v1/product/getProductUsingSKU/';

export default function ManualSKUScreen(props) {
  const [stockKeepingUnitValue, setStockKeepingUnitValue] = useState('');
  const [loading, setLoading] = useState(false);

  const [productDetails, setProductDetails] = useState({});

  const getProductDetails = () => {
    setLoading(true);
    fetch(baseURL + stockKeepingUnitValue, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2FqYWxAeW9wbWFpbC5jb20iLCJ1c2VyVHlwZSI6IkFkbWluIiwiaWF0IjoxNjY3MTk5ODU1fQ.Pf2KB14J6FEHsvqRFOvTb-9_dzw9sgDNx5_mqtNgJnE',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('json', json);
        console.log('productDetails', productDetails);
        setProductDetails(json.data);
        setLoading(false);
        if (Object.values(json.data).length > 0) {
          props.navigation.navigate('Home', {
            productDetails: json.data,
            loading: loading,
          });
        } else {
          Toast.show('Invalid code product not found');
        }
      })
      .catch(err => console.error(err.message));
  };

  const submit = () => {
    getProductDetails();
  };

  return (
    <View style={{flex: 1}}>
      <Header name="Add Product" navigation={props.navigation} />
      <View style={{padding: 15}}>
        <Text style={{fontSize: 14}}>Enter SKU Number</Text>
        <TextInput
          style={{
            height: 40,
            width: '100%',
            borderBottomWidth: 0.2,
            fontSize: 12,
          }}
          placeholder="Enter Code"
          onChangeText={value => setStockKeepingUnitValue(value)}
        />
        <Image
          resizeMode="contain"
          source={require('../assets/manScanner.png')}
          style={{width: '100%', height: '50%', marginTop: 50}}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '800',
            color: 'black',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Product not found
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '800',
            color: 'black',
            textAlign: 'center',
          }}>
          Please enter product SKU manually{' '}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#2e449e',
          paddingVertical: 10,
          borderRadius: 5,
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
        }}
        onPress={() => submit()}>
        <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

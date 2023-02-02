/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';

export default function HomeScreen(props) {
  const {productDetails, loading} = props.route.params;
  console.log('response', productDetails.main_image[0].filename);
  return (
    <View style={{flex: 1, opacity: loading ? 0.4 : 1}}>
      <Header name="Product Details" navigation={props.navigation} />

      {loading ? (
        <View style={{position: 'absolute', top: '50%'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{marginTop: 20, paddingLeft: 15}}>
            <Text>Product Image:</Text>
            <Image
              source={{
                uri: `https://chapshop.softprodigyphp.in/public/uploads/${productDetails.main_image[0].filename}`,
              }}
              resizeMode="center"
              style={{height: 100, width: 100, marginTop: 10, borderRadius: 5}}
            />
            <Text style={{marginTop: 10}}>Product Name:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {productDetails?.product_name}
            </Text>
            {/* <Text style={{marginTop: 10}}>Size</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {productDetails.sizes && productDetails.category.sizes.join(', ')}
            </Text> */}
            <Text style={{marginTop: 10}}>Buying Price:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {productDetails.buying_price}
            </Text>
            <Text style={{marginTop: 10}}>Reselling Price:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {productDetails.reselling_price}
            </Text>
            <Text style={{marginTop: 10}}>SKU:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              {productDetails.sku}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { Switch } from 'react-native-paper';
import { Button } from 'react-native';

export default function AssetExample() {
  let [red, setRed] = React.useState(0);
  let [green, setGreen] = React.useState(0);
  let [blue, setBlue] = React.useState(0);
  let [isSwitchOn, setIsSwitchOn] = React.useState(false);
  let [isSwitchOnAuto, setIsSwitchOnAuto] = React.useState(false);
  let [conectado, setConectado] = React.useState(true);

  const ligar = function () {
    setIsSwitchOn(!isSwitchOn);
    request({
      ligado: !isSwitchOn,
    });
  };

  const automatico = function () {
    setIsSwitchOnAuto(!isSwitchOnAuto);
    if (!isSwitchOnAuto) {
      setIsSwitchOn(false)
      request({
        automatico: !isSwitchOnAuto,
        ligado: false
      })
    } else {
      request({automatico: !isSwitchOnAuto});
    }
  };

  const conectar = function () {
    fetch('http://localhost:3000/estado/0')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setConectado(true);
        setIsSwitchOn(responseJson.ligado);
        setIsSwitchOnAuto(responseJson.automatico);
        setRed(responseJson.r)
        setGreen(responseJson.g)
        setGreen(responseJson.b)
      })
      .catch((error) => {
        console.error(error);
        setConectado(false);
      });
  }

  const changeGreen = function (value) {
    setGreen(value);

  };

  const changeRed = function (value) {
    setRed(value);

  };

  const changeBlue = function (value) {
    setBlue(value);

  };

  const rgbSubmit = function (){
      request({
          r: Math.floor(red),
          g: Math.floor(green),
          b: Math.floor(blue)
      })
  };

  const request = function (body) {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    fetch('http://localhost:3000/estado/0', requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
        setConectado(false);
      });
  };

  const styles = StyleSheet.create({
    square: {
      width: 100,
      height: 100,
      background: `rgb(${red}, ${green}, ${blue})`,
    },
  });

  return (
    <View>
      <Text>{conectado ? '' : 'Conecte-se a um dispositivo'}</Text>
      {conectado ? '' : <Button onPress={conectar} title='Conectar' color="grey"></Button>}
      {isSwitchOnAuto ? 'Automatico' : 'Manual'}
      <Switch value={isSwitchOnAuto} onValueChange={automatico} disabled={!conectado} />
      {isSwitchOn ? 'Ligado' : 'Desligado'}
      <Switch value={isSwitchOn} onValueChange={ligar} disabled={!conectado || isSwitchOnAuto}/>
      <View style={styles.square} />
      <Text> Vermelho: {Math.floor(red)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        disabled={!conectado}
        onValueChange={(value) => {
          changeRed(value);
        }}></Slider>
      <Text> Verde: {Math.floor(green)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        disabled={!conectado}
        onValueChange={(value) => changeGreen(value)}></Slider>
      <Text> Azul: {Math.floor(blue)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        disabled={!conectado}
        onValueChange={(value) => changeBlue(value)}></Slider>
      <Button 
        onPress={rgbSubmit} 
        title='Alterar cor' 
        color="#2196F3" 
        disabled={!conectado}></Button>  
    </View>
  );
}

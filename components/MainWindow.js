import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { Switch } from 'react-native-paper';

export default function AssetExample() {
  const [red, setRed] = React.useState(0);
  const [green, setGreen] = React.useState(0);
  const [blue, setBlue] = React.useState(0);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOnAuto, setIsSwitchOnAuto] = React.useState(false);
  const [conectado, setConectado] = React.useState(true);

  const ligar = function () {
    setIsSwitchOn(!isSwitchOn);
    request({
      ligado: !isSwitchOn,
    });
  };

  const automatico = function () {
    setIsSwitchOnAuto(!isSwitchOnAuto);
    request({
      automatico: !isSwitchOnAuto,
    });
  };



  const changeGreen = function (value) {
    setGreen(value);
    request({
      g: value,
    });
  };

  const changeRed = function (value) {
    setRed(value);
    request({
      r: value,
    });
  };

  const changeBlue = function (value) {
    setBlue(value);
    request({
      b: value
    });
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
      {isSwitchOnAuto ? 'Automatico' : 'Manual'}
      <Switch value={isSwitchOnAuto} onValueChange={automatico} disabled={!conectado} />
      {isSwitchOn ? 'Ligado' : 'Desligado'}
      <Switch value={isSwitchOn} onValueChange={ligar} disabled={!conectado}/>
      <View style={styles.square} />
      <Text> Vermelho: {Math.floor(red)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        disabled={!(isSwitchOn||isSwitchOnAuto)}
        onValueChange={(value) => {
          changeRed(value);
        }}></Slider>
      <Text> Verde: {Math.floor(green)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        disabled={!(isSwitchOn||isSwitchOnAuto)}
        onValueChange={(value) => changeGreen(value)}></Slider>
      <Text> Azul: {Math.floor(blue)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        disabled={!(isSwitchOn||isSwitchOnAuto)}
        onValueChange={(value) => changeBlue(value)}></Slider>
    </View>
  );
}

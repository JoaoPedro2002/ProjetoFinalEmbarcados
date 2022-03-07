import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { Switch } from 'react-native-paper';

export default function AssetExample() {
  const [red, setRed] = React.useState(0);
  const [green, setGreen] = React.useState(0);
  const [blue, setBlue] = React.useState(0);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


  const styles = StyleSheet.create({
    square: {
      width: 100,
      height: 100,
      background: `rgb(${red}, ${green}, ${blue})`,
    },
  });

  return (
    <View>
      {isSwitchOn ? "Ligado" : "Desligado"}
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      <View style={styles.square} />
      <Text> Vermelho: {Math.floor(red)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        onValueChange={(value) => setRed(value)}></Slider>
      <Text> Verde: {Math.floor(green)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        onValueChange={(value) => setGreen(value)}></Slider>
      <Text> Azul: {Math.floor(blue)} </Text>
      <Slider
        minimumValue={0}
        maximumValue={255}
        onValueChange={(value) => setBlue(value)}></Slider>
    </View>
  );
}

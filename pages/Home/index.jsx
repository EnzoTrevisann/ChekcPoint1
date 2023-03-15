import React, { useState } from "react";
import Sons from "../../components/Sons";
import { Audio } from 'expo-av';
import { styles } from "./style";
import { View, Text, TextInput } from "react-native";
import Button from "../../components/Button";

const sons = [1, 2, 3, 4, 5, 6, 7];

export default function Home() {
  const [sound, setSound] = React.useState();
  const [handleValue, setHandleValue] = React.useState('');
  const [isPlaying, setIsPlaying] = useState([false, false, false, false, false, false, false]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const soundList = [];

  async function playSound(soundIndex, buttonIndex) {
    await soundList[soundIndex].playAsync();

    setPlayingIndex(buttonIndex);
    setIsPlaying(prev => prev.map((_, i) => i === buttonIndex ? true : false)); // atualiza o estado para marcar apenas o botão correspondente

    await new Promise((resolve) => {
      soundList[soundIndex].setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          soundList[soundIndex].setOnPlaybackStatusUpdate(null)
          resolve()
        }
      })
    });

    setPlayingIndex(-1);
    setIsPlaying(prev => prev.map((_, i) => false)); // atualiza o estado para desmarcar todos os botões

    if (soundIndex < soundList.length - 1) {
      await playSound(soundIndex + 1, buttonIndex + 1) // chama a próxima iteração com o próximo som e o próximo botão
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.squareLayout}>
        {sons.map((value, index) => (
          <Sons
            key={index}
            isPlaying={isPlaying[index]}
            onPress={() => {
              const { sound } = Audio.Sound.createAsync(require(`/assets/sounds/audio${value}.mp3`));
              soundList[index] = sound;
            }}
          />
        ))}
      </View>

      <View style={styles.ViewButton}>
        <Button onPress={async () => {
          const { sound } = await Audio.Sound.createAsync(require(`/assets/sounds/audio${handleValue}.mp3`));
          soundList[handleValue - 1] = sound;
          await playSound(handleValue - 1, handleValue - 1); // passa o índice do som e o índice do botão correspondente
        }}>
          <Text>Submit</Text>
        </Button>

        <Button onPress={(buttonIndex) => {
          soundList[buttonIndex].unloadAsync();
          setIsPlaying(prev => prev.map((_, i) => i === buttonIndex ? false : prev[i])); // atualiza o estado para desmarcar apenas o botão pressionado
        }}>
          <Text>Reset</Text>
        </Button>

        <TextInput style={styles.input} value={handleValue} onChangeText={setHandleValue} />
      </View>
    </View>
  );
}
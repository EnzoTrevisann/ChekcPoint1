import React, { useState } from "react";
import Sons from "../../components/Sons";
import { Audio } from 'expo-av';
import { styles } from "./style";
import {View, Text, TextInput} from "react-native";
import Button from "../../components/Button";

  const sons = [
     1, 2, 3, 4, 5, 6, 7
  ]

export default function Home() {
  const [sound, setSound] = React.useState();
  const [handleValue, setHandleValue] = React.useState('');
  const soundList = []
  const [isPlaying, setIsPlaying] = useState([false, false, false, false, false, false, false]);


  async function playSound(index) {
    await soundList[index].playAsync();

    setIsPlaying((oldList) => {
      oldList.map((sound,i) =>{
        console.log(index, i);
        if(i === index) {
          return true
        }
        return false
      })
    })
    console.log(isPlaying);
    
    await new Promise((resolve) => {
      soundList[index].setOnPlaybackStatusUpdate((status) => {
        if(status.isLoaded && status.didJustFinish){
          soundList[index].setOnPlaybackStatusUpdate(null) 
          resolve()
          
        }
      })
    })
    setIsPlaying([false, false, false, false, false, false, false]);
    if(index < soundList.length -1 ) {
      await playSound(index + 1)
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
        <View style={styles.squareLayout}>{
        sons.map((__, index)=> (                     
          <Sons key={index} isPlaying = {false}/>
        ))                   
      }</View>
      
      <View style={styles.ViewButton}>
        <Button onPress={async () => {
          const arrayHandleValue = handleValue.split('')
          for (let i = 0; i < arrayHandleValue.length; i++){
            const { sound } = await Audio.Sound.createAsync(require(`/assets/sounds/audio${arrayHandleValue[i]}.mp3`));
            soundList.push(sound)
          }
          await playSound(0)
          
        }} >
          <Text>Submit</Text>
        </Button>

        
        <Button onPress={() => setHandleValue('')}> {/* Arrow function que limpa o conteudo dentro do componente button */}
          <Text>
            Reset
          </Text>
        </Button>

        <TextInput style={styles.input} value={handleValue} onChangeText={setHandleValue} />
      </View>
      </View>
  );
}
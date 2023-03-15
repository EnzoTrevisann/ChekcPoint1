import {View} from "react-native";
import { styles } from "./style";

export default function Sons({isPlaying}){
const handleColor = isPlaying ? styles.handleColor : undefined;
  return(
    <View style={[styles.square, handleColor]}></View>
  )
}
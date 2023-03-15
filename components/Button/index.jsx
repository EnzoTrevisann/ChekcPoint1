import { TouchableOpacity as NativeButton } from "react-native";
import styles from './style'

export default function Button(props){
  return(
    <NativeButton style={styles.button} {...props}>{props.children}</NativeButton>
  )
}
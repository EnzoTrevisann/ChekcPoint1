import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c4c4c4",
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    gap: 35
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex:1,
    alignItems: "center", 
    justifyContent: "center",
  },
  ViewButton: {
    alignItems: "center", 
    justifyContent: "center",
    gap: 22
  },
  squareLayout: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
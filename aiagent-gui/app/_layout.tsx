import { Stack } from "expo-router";

export default function RootLayout() {

//  // This hook will set the document title when the screen comes into focus
//   useFocusEffect(() => {
//     // This is the standard web API to set the browser tab title
//     if (typeof document !== 'undefined') {
//       document.title = "Mecanicien";
//     }
//   });

  return (<Stack >
      <Stack.Screen name="index"
          options={{
          title: "Mecanicien", // Set your desired title here,
        }}  />    
    </Stack>);
}

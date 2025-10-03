import { Stack } from "expo-router";
import { Image, Text, View } from 'react-native'; // Import Image

// 1. Define your custom header component
function LogoTitle() {
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', // Pushes items to opposite ends
      alignItems: 'center',
      width: '100%' // Important: takes full width of header
    }}>
      <Image
        style={{ 
          width: 70, 
          height: 70, 
          margin: 10
        }}
        source={require('@/assets/images/auto1.png')}
      />
      <Text style={{ 
        fontSize: 18, 
        fontWeight: 'bold',
        flex: 1, // Takes available space, pushing image to right
        textAlign: 'left'
      }}>
        Mecanicien
      </Text>



    </View>
  );
}

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          title: "Mecanicien",

          // 2. Set your custom component as the header title
          headerTitle: (props) => <LogoTitle {...props} />,
 // Add this to remove default header padding:
          // headerTitleContainerStyle: {
          //   width: '100%', // Force full width
          // },
          headerTitleAlign: 'left', // This helps with full width layout          
        }}  
      />    
    </Stack>
  );
}
import { Stack } from "expo-router";
import { Image, Text, View } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper'; // Import PaperProvider

// 1. Define your custom theme
const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'hsla(33, 53%, 28%, 1.00)', // Your brand's primary color
    secondary: 'rgba(206, 215, 236, 1)', // Your brand's secondary color
  },
  roundness: 4, // Adjust the roundness of components
};

// 2. Your custom header component (keep your existing code)
function LogoTitle() {
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
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
        flex: 1,
        textAlign: 'left'
      }}>
        Mecanicien
      </Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    // 3. Wrap your entire app with PaperProvider and pass the custom theme
    <PaperProvider theme={customTheme}>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{
            title: "Mecanicien",
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: 'left',
          }}  
        />
        {/* Add more Stack.Screen components here for other pages */}
      </Stack>
    </PaperProvider>
  );
}
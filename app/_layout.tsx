import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom theme function to set navbar color
const createCustomTheme = (
  baseTheme: { dark: boolean; colors: any },
  navbarColor: string
) => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    card: navbarColor, // This affects the navbar color
    border: "transparent", // Optional: removes the navbar bottom border
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Choose your desired navbar color
  const navbarColor = "#151718"; // This is the pink color from your previous header

  // Create custom themes with the navbar color
  const customLightTheme = createCustomTheme({ ...DefaultTheme, dark: false }, navbarColor);
  const customDarkTheme = createCustomTheme({ ...DarkTheme, dark: true }, navbarColor);

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? customDarkTheme : customLightTheme}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: navbarColor },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            headerStyle: { backgroundColor: navbarColor },
            headerTintColor: "white",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

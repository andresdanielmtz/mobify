import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View, SafeAreaView } from "react-native";
import { supabase } from "../../utils/supabase";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import SongList from "../../components/SongList";
import { ThemedView } from "@/components/ThemedView";


export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (Platform.OS === "web" || Platform.OS === "ios") {
        const { data, error } = await supabase.from("songs").select("*");
        if (error) {
          console.error("Error fetching data:", error.message);
          return;
        }
        setData(data);
        console.log("Data fetched:", data);
      } else {
        console.log("Fetching data is only supported on web.");
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Header />
        <ThemedView style={styles.content}>
          {data.length > 0 ? (
            <SongList data={data} />
          ) : (
            <ThemedText>Loading...</ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

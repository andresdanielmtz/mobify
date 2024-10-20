import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Header from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import SongList from "../../components/SongList";
import { ThemedView } from "@/components/ThemedView";
import readDB from "@/hooks/readDB";


type Song = { 
  id: number, 
  song_name: string,
  url: string,
  created_at: string,
  cover_url: string,
  creator: string
}
export default function HomeScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await readDB();
        setSongs(data);
      } catch (err) {
        setError("Failed to load songs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Header />
        <ThemedView style={styles.content}>
        {loading ? (
            <ThemedText>Loading...</ThemedText>
          ) : error ? (
            <ThemedText>{error}</ThemedText>
          ) : songs.length > 0 ? (
            <SongList data={songs} />
          ) : (
            <ThemedText>No songs found</ThemedText>
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

import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Audio } from "expo-av";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Play, Pause } from "lucide-react-native";
import MusicBar from "./MusicBar";

const SongItem = ({ song, itemWidth, onPress, isPlaying }) => (
  <TouchableOpacity
    onPress={() => onPress(song)}
    style={[styles.songItem, { width: itemWidth }]}
  >
    <Image
      source={{ uri: song.cover_url }}
      style={[
        styles.coverImage,
        { width: itemWidth - 20, height: itemWidth - 20 },
      ]}
    />
    <ThemedView style={styles.playIconContainer}>
      {isPlaying ? (
        <Pause color="white" size={24} />
      ) : (
        <Play color="white" size={24} />
      )}
    </ThemedView>
    <ThemedText numberOfLines={1} style={styles.songName}>
      {song.song_name}
    </ThemedText>
    <ThemedText numberOfLines={1} style={styles.creator}>
      {song.creator}
    </ThemedText>
  </TouchableOpacity>
);

const SongList = ({ data }) => {
  const { width } = useWindowDimensions();
  const numColumns = 2;
  const itemWidth = width / numColumns;
  const [sound, setSound] = useState();
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (song) => {
    const index = data.findIndex((item) => item.id === song.id);

    if (currentSongIndex === index) {
      if (isPlaying) {
        await pauseSound();
      } else {
        await resumeSound();
      }
      return;
    }

    // Unload the previous sound
    if (sound) {
      await sound.unloadAsync();
    }

    try {
      console.log("Loading Sound");
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true }
      );
      setSound(newSound);
      setCurrentSongIndex(index);
      setIsPlaying(true);

      console.log("Playing Sound");
      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          handleNext();
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error("Error pausing sound:", error);
      }
    }
  };

  const resumeSound = async () => {
    if (sound) {
      try {
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error resuming sound:", error);
      }
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pauseSound();
    } else if (currentSongIndex !== null) {
      if (sound) {
        await resumeSound();
      } else {
        await playSound(data[currentSongIndex]);
      }
    }
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % data.length;
    playSound(data[nextIndex]);
  };

  const handlePrevious = () => {
    const previousIndex = (currentSongIndex - 1 + data.length) % data.length;
    playSound(data[previousIndex]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SongItem
            song={item}
            itemWidth={itemWidth}
            onPress={playSound}
            isPlaying={currentSongIndex === data.indexOf(item) && isPlaying}
          />
        )}
        numColumns={numColumns}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
      <MusicBar
        currentSong={currentSongIndex !== null ? data[currentSongIndex] : null}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: "100%",
  },
  listContent: {
    paddingBottom: 60, // Add padding to account for the MusicBar
  },
  songItem: {
    padding: 10,
    alignItems: "center",
  },
  coverImage: {
    borderRadius: 10,
    marginBottom: 8,
  },
  playIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  songName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    width: "100%",
  },
  creator: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    width: "100%",
  },
});

export default SongList;

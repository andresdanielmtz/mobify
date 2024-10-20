import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react-native";

const MusicBar = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) => {
  if (!currentSong) return null;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.songInfo}>
        <ThemedText numberOfLines={1} style={styles.songName}>
          {currentSong.song_name}
        </ThemedText>
        <ThemedText numberOfLines={1} style={styles.creator}>
          {currentSong.creator}
        </ThemedText>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={onPrevious}>
          <SkipBack color="#f7287b" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause} style={styles.playPauseButton}>
          {isPlaying ? (
            <Pause color="#f7287b" size={24} />
          ) : (
            <Play color="#f7287b" size={24} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext}>
          <SkipForward color="#f7287b" size={24} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  creator: {
    fontSize: 12,
    color: "#666",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  playPauseButton: {
    marginHorizontal: 20,
  },
});

export default MusicBar;


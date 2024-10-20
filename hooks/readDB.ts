import * as SQLite from "expo-sqlite";

const CREATE_TABLE_COMMAND = `
CREATE TABLE IF NOT EXISTS songs (
  "id" INTEGER PRIMARY KEY,
  "song_name" TEXT,
  "url" TEXT,
  "created_at" TEXT,
  "cover_url" TEXT,
  "creator" TEXT
);
`;

const INSERT_DATA_COMMAND = `
INSERT INTO songs (id, song_name, url, created_at, cover_url, creator) VALUES 
('2', 'Espresso', 'https://dleuxlfpyhnwgisamddi.supabase.co/storage/v1/object/public/music/sabrinaCarpenterEspresso.mp3?t=2024-10-19T22%3A57%3A24.159Z', '2024-10-19 22:36:39.898658+00', 'https://i.imgur.com/g1SDD5S.png', 'Sabrina Carpenter'), 
('3', 'Good Luck, Babe!', 'https://dleuxlfpyhnwgisamddi.supabase.co/storage/v1/object/public/music/GoodLuckBabeChapellRoan.mp3', '2024-10-19 22:38:14.873443+00', 'https://i.imgur.com/5etUER3.png', 'Chappell Roan'), 
('4', 'BOBOMENSOTONTO', 'https://dleuxlfpyhnwgisamddi.supabase.co/storage/v1/object/public/music/NSQK_TONTOMENSOBOBO.mp3?t=2024-10-19T23%3A02%3A27.923Z', '2024-10-19 22:40:26.859211+00', 'https://i.imgur.com/NGtglE1.png', 'NSQK'), 
('5', 'SMILE', 'https://dleuxlfpyhnwgisamddi.supabase.co/storage/v1/object/public/music/Persona4Smile.mp3?t=2024-10-19T23%3A43%3A04.019Z', '2024-10-19 23:41:53.170124+00', 'https://i.imgur.com/Rr71wAJ.png', 'Persona 4'), 
('6', 'The Perfect Pair', 'https://dleuxlfpyhnwgisamddi.supabase.co/storage/v1/object/public/music/BeabadoobeeThePerfectPair.mp3?t=2024-10-19T23%3A49%3A48.068Z', '2024-10-19 23:49:52.547982+00', 'https://i.imgur.com/P9lSlN1.png', 'Beabadoobee'), 
('7', 'Love Bug', 'https://dleuxlfpyhnwgisamddi.supabase.co/storage/v1/object/public/music/GFriend_Lovebug.mp3?t=2024-10-19T23%3A54%3A01.025Z', '2024-10-19 23:54:09.576845+00', 'https://i.imgur.com/DhR0xvT.png', 'GFriend');
`;

export default async function readDB(): Promise<any[]> {
  try {
    const db = await SQLite.openDatabaseAsync("mobify");

    // Check if the songs table exists
    const tableCheck = await db.getFirstAsync(`
      SELECT name FROM sqlite_master WHERE type='table' AND name='songs';
    `);

    if (!tableCheck) {
      console.log("Songs table does not exist. Creating and populating it...");

      // Create the table
      await db.execAsync(CREATE_TABLE_COMMAND);
      await db.execAsync(INSERT_DATA_COMMAND);
      console.log("Table created and populated successfully.");
    }
    const songs = await db.getAllAsync("SELECT * FROM songs");
    console.log("songs:", songs);
    return songs;

  } catch (err) {
    console.error(err);
  }
  return [];
}

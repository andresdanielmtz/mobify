import { enablePromise, openDatabase } from "react-native-sqlite-storage";
import { SQLiteDatabase } from "react-native-sqlite-storage";

const tableName = "mobifyTable";

enablePromise(true);

export const getDBConnection = () => {
  return openDatabase({ name: "mobify.db", location: "default" });
};

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
          value TEXT NOT NULL
      );`;

  await db.executeSql(query);
};

//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Button, TouchableHighlight } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function DatosSqlite() {

  const [db, setDb] = useState(null);

  const [elementosLista, setElementosLista] = useState([])

  const crearInfoInicial = async ()=>{
    try{
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nombre TEXT NOT NULL, edad INTEGER);
        INSERT INTO usuarios (nombre, edad) VALUES ('Alberto', 22);
        INSERT INTO usuarios (nombre, edad) VALUES ('Juan', 20);
        INSERT INTO usuarios (nombre, edad) VALUES ('Jose', 24);
        INSERT INTO usuarios (nombre, edad) VALUES ('Mario', 21);
      `);
    }catch(error){
      console.log("No pasa nada: " + error);
    }
  }
  
  // `getFirstAsync()` is useful when you want to get a single row from the database.
  /*const firstRow = await db.getFirstAsync('SELECT * FROM test');
  console.log(firstRow.id, firstRow.value, firstRow.intValue);
  */
  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const obtenerListaDeValores = async ()=> {
    // `execAsync()` is useful for bulk queries when you want to execute altogether.
    // Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
    setElementosLista(await db.getAllAsync('SELECT * FROM usuarios'));
    console.log(await db.getAllAsync('SELECT * FROM usuarios'));
  }

  // `runAsync()` is useful when you want to execute some write operations.
  const actualizarTabla = async ()=>{
    await db.runAsync('UPDATE usuarios SET edad = 40 WHERE id = 1'); 
    await db.runAsync('UPDATE usuarios set nombre = "Jose Alberto" WHERE id = 4');
    await db.runAsync('DELETE FROM usuarios WHERE id = 5');
  }
  /*
  // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
  for await (const row of db.getEachAsync('SELECT * FROM test')) {
    console.log(row.id, row.value, row.intValue);
  }
  */
  useEffect(()=> {
    const inicializarBD = async ()=> {
      try{
        setDb(await SQLite.openDatabaseAsync('clase2_db'));
      }catch(error){
        console.log(`Error al inicializar el elemento. ${error}`);
      }
    };
    inicializarBD();
  }, [])

  useEffect(()=> {
    const crearDatos = async ()=> {
      await crearInfoInicial();
      await obtenerListaDeValores();
    }
    crearDatos();
  }, [db])

  return (
    <View style={styles.container}>
      {/* Cabecera de la tabla */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Nombre</Text>
        <Text style={styles.headerText}>Edad</Text>
      </View>
      
      {/* Filas de la tabla */}
      <ScrollView>
        {elementosLista.map((item) => (
          <View style={styles.tableRow} key={item.id}>
            <Text style={styles.rowText}>{item.id}</Text>
            <Text style={styles.rowText}>{item.nombre}</Text>
            <Text style={styles.rowText}>{item.edad}</Text>
          </View>
        ))}
      </ScrollView>
      
      <TouchableHighlight
        underlayColor={"#09f"}
        onPress={()=> actualizarTabla}
        style={{ width: 100, height: 50, backgroundColor: "blue", justifyContent: 'center', alignItems: "center" }} >
          <Text style={{ color: "white"}}>Actualizar</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
});

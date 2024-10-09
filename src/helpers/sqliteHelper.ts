import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({name: 'MyDatabase.db', location: 'default'});

export const initializeDatabase = async () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, isCompleted INTEGER);',
        [],
        () => resolve(),
        (err: any) => {
          console.log('create error', err);
          reject(err);
        },
      );
    });
  });
};

export const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM tasks',
        [],
        (tx: any, results: any) => {
          let tasks = [];
          for (let i = 0; i < results.rows.length; i++) {
            tasks.push(results.rows.item(i));
          }
          resolve(tasks);
        },
        (err: any) => reject(err),
      );
    });
  });
};

export const getUndoneTask = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE isCompleted = 0',
        [],
        (tx: any, results: any) => {
          let tasks = [];
          for (let i = 0; i < results.rows.length; i++) {
            tasks.push(results.rows.item(i));
          }
          resolve(tasks);
        },
        (err: any) => reject(err),
      );
    });
  });
};

export const addTask = async (
  title: string,
  desc: string,
  date: string,
  isCompleted: Number,
) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO tasks (title, description, date, isCompleted) VALUES (?, ?, ?, ?);',
        [title, desc, date, isCompleted],
        (tx: any, results: any) => resolve(results.insertId),
        (err: any) => {
          console.log(err);
          reject(err);
        },
      );
    });
  });
};

export const tickTask = async (id: Number) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE tasks SET isCompleted = 1 WHERE id = (?)',
        [id],
        (tx: any, results: any) => {
          console.log('results', results);
          resolve();
        },
        (err: any) => {
          console.log(err);
          reject(err);
        },
      );
    });
  });
};

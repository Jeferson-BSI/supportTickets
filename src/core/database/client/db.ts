import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'tickets.db';

export const db = SQLite.openDatabaseSync(DATABASE_NAME);

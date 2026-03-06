import { db } from '../client/db';
import { CREATE_TICKETS_TABLE, ADD_CLOSURE_DESCRIPTION_COLUMN } from '../schema/ticket.schema';

function columnExists(table: string, column: string): boolean {
  const rows = db.getAllSync<{ name: string }>(`PRAGMA table_info(${table})`);
  return rows.some((row) => row.name === column);
}

export function runMigrations(): void {
  db.execSync(CREATE_TICKETS_TABLE);

  if (!columnExists('tickets', 'closure_description')) {
    db.execSync(ADD_CLOSURE_DESCRIPTION_COLUMN);
  }
}

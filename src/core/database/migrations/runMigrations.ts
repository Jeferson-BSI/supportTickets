import { db } from '../client/db';
import { CREATE_TICKETS_TABLE } from '../schema/ticket.schema';

export function runMigrations(): void {
  db.execSync(CREATE_TICKETS_TABLE);
}

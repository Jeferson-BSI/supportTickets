export const CREATE_TICKETS_TABLE = `
  CREATE TABLE IF NOT EXISTS tickets (
    id         TEXT    PRIMARY KEY,
    title      TEXT    NOT NULL,
    description TEXT   NOT NULL,
    status     TEXT    NOT NULL,
    priority   TEXT    NOT NULL,
    created_at INTEGER NOT NULL,
    deadline   INTEGER NOT NULL,
    closed_at  INTEGER
  );
`;

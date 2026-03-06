export const CREATE_TICKETS_TABLE = `
  CREATE TABLE IF NOT EXISTS tickets (
    id                  TEXT    PRIMARY KEY,
    title               TEXT    NOT NULL,
    description         TEXT    NOT NULL,
    status              TEXT    NOT NULL,
    priority            TEXT    NOT NULL,
    created_at          INTEGER NOT NULL,
    deadline            INTEGER NOT NULL,
    closed_at           INTEGER,
    closure_description TEXT
  );
`;

export const ADD_CLOSURE_DESCRIPTION_COLUMN = `
  ALTER TABLE tickets ADD COLUMN closure_description TEXT;
`;

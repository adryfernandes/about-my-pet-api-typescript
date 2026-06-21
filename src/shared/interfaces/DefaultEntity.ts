import type { ObjectLiteral } from 'typeorm';

interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type DefaultEntity = Timestamp & ObjectLiteral;

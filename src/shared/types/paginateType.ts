import type { Timestamp } from '@/database/entities/extendings/timestamp.extending';

export type EntityDefault<Entity> = {
  timestamp: Timestamp;
} & Entity;

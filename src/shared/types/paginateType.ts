import type { Timestamp } from '@/database/entities/extendings/timestamp';

export type EntityDefault<Entity> = {
  timestamp: Timestamp;
} & Entity;

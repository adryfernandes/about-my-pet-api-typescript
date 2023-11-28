import type { Timestamp } from '@/database/entities/extendings/Timestamp';

export type EntityDefault<Entity> = {
  timestamp: Timestamp;
} & Entity;

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class Timestamp {
  @CreateDateColumn({
    name: 'criado_em',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'atualizado_em',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletado_em',
  })
  deletedAt: Date;
}

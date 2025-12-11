import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';

export enum ClientSource {
  INSTAGRAM = 'instagram',
  WHATSAPP = 'whatsapp',
  REFERRAL = 'referral',
  OTHER = 'other',
}

export interface Child {
  name: string;
  birthday: Date;
}

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  /**
   * Dados dos filhos
   *
   * JSONB: tipo nativo do PostgreSQL para JSON
   * Por quê JSONB?
   * - Permite queries (WHERE children @> '[{"name": "Ana"}]')
   * - Mais eficiente que TEXT
   * - Valida JSON automaticamente
   *
   * Estrutura: [{ name: "Ana", birthday: "2020-03-15" }]
   */
  @Column('jsonb', { default: [] })
  children: Child[];

  @Column({
    type: 'enum',
    enum: ClientSource,
    default: ClientSource.INSTAGRAM,
  })
  source: ClientSource;

  @Column({ type: 'text', nullable: true })
  notes: string;

  /**
   * Relacionamento: Um cliente tem vários eventos
   *
   * @OneToMany: 1 cliente → N eventos
   * () => Event: função que retorna a entity relacionada (evita import circular)
   * event => event.client: como acessar cliente a partir do evento
   * cascade: false - não deletar eventos ao deletar cliente
   */
  @OneToMany(() => Event, (event) => event.client, {
    cascade: false,
  })
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { User } from '../../users/entities/user.entity';
import { EventTeamMember } from './event-team-member.entity';

/**
 * Enum para tipo de evento
 */
export enum EventType {
  BIRTHDAY_CHILD = 'birthday_child',
  BIRTHDAY_ADULT = 'birthday_adult',
  CHURCH = 'church',
  OTHER = 'other',
}

/**
 * Enum para status do evento
 */
export enum EventStatus {
  PENDING = 'pending', // Pendente de confirmação
  CONFIRMED = 'confirmed', // Confirmado
  COMPLETED = 'completed', // Realizado
  CANCELLED = 'cancelled', // Cancelado
}

/**
 * Enum para métodos de pagamento
 */
export enum PaymentMethod {
  PIX = 'pix',
  CASH = 'cash',
  CARD = 'card',
}

/**
 * Interface para atrações do evento
 */
export interface Attractions {
  balloonSculpting: boolean; // Escultura de balão
  facePainting: boolean; // Pintura facial
  games: boolean; // Jogos e brincadeiras
  characters: string[]; // Personagens (["Elsa", "Anna"])
}

/**
 * Interface para dados financeiros
 *
 * Centraliza toda informação financeira do evento
 */
export interface Financial {
  quotedPrice: number; // Preço total orçado

  deposit: {
    // Sinal (40%)
    amount: number;
    dueDate: Date;
    paidDate?: Date;
    method?: PaymentMethod;
  };

  finalPayment: {
    // Pagamento final (60%)
    amount: number;
    dueDate: Date;
    paidDate?: Date;
    method?: PaymentMethod;
  };

  costs: {
    // Custos do evento
    team: Array<{
      // Pagamento da equipe
      memberId: string;
      amount: number;
    }>;
    materials: number; // Materiais (balões, tinta, etc)
    transport: number; // Transporte/combustível
    other: number; // Outros custos
  };
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Cliente que contratou o evento
   *
   * @ManyToOne: N eventos → 1 cliente
   * @JoinColumn: cria coluna client_id
   */
  @ManyToOne(() => Client, (client) => client.events)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  /**
   * ID do cliente (foreign key)
   *
   * Por quê expor clientId?
   * - Facilita queries (WHERE clientId = '...')
   * - Não precisa fazer join só para filtrar
   * - Melhor performance
   */
  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.BIRTHDAY_CHILD,
  })
  type: EventType;

  /**
   * Tema da festa (opcional)
   *
   * Ex: "Frozen", "Super-Heróis", "Princesas"
   */
  @Column({ nullable: true })
  theme: string;

  @Column('jsonb')
  attractions: Attractions;

  /**
   * Dados financeiros completos
   *
   * TUDO relacionado a dinheiro fica aqui
   * Por quê?
   * - Fácil de auditar
   * - Histórico preservado (JSONB não muda)
   * - Cálculos ficam mais simples
   */
  @Column('jsonb')
  financial: Financial;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.PENDING,
  })
  status: EventStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  /**
   * Equipe alocada para o evento
   *
   * Relacionamento N:M via EventTeamMember
   */
  @OneToMany(() => EventTeamMember, (etm) => etm.event, {
    cascade: true, // Ao salvar event, salva alocações também
  })
  teamAllocations: EventTeamMember[];

  /**
   * Usuário que criou o evento
   *
   * Para auditoria: quem cadastrou?
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_by' })
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

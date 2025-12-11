import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventTeamMember } from '../../events/entities/event-team-member.entity';

export enum TeamMemberStatus {
  ACTIVE = 'active',
  TRAINING = 'training',
  INACTIVE = 'inactive',
}

export interface Skills {
  //(1-5)
  balloonSculpting: number;
  facePainting: number;
  entertainment: number;
}

export interface PersonalityNotes {
  notes: string; //Observações gerais
  worksWellWith: string[]; // IDs de membros que trabalha bem junto
  bestFor: string[]; //Tipos de evento ideais
}

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  /**
   * Habilidades técnicas
   *
   * JSONB permite armazenar objeto complexo
   * e ainda fazer queries nele
   *
   * Exemplo: WHERE skills->>'balloonSculpting' >= '4'
   */
  @Column('jsonb')
  skills: Skills;

  /**
   * Especialidades
   *
   * Array de strings
   * Ex: ["super-heróis", "princesas", "personagens"]
   *
   * Por quê simple-array?
   * - PostgreSQL armazena como TEXT com separador
   * - TypeORM converte automaticamente para array
   * - Mais simples que JSONB para array de strings
   */
  @Column('simple-array', { default: [] })
  specialties: string[];

  /**
   * Notas sobre personalidade e fit
   *
   * Conhecimento da Gabi: "trabalha bem com Maria",
   * "melhor para festas infantis", etc
   */
  @Column('jsonb', { nullable: true })
  personality: PersonalityNotes;

  @Column({
    type: 'enum',
    enum: TeamMemberStatus,
    default: TeamMemberStatus.TRAINING,
  })
  status: TeamMemberStatus;

  /**
   * Data de entrada na equipe
   */
  @Column({ type: 'date' })
  joinedDAte: Date;

  /**
   * Relacionamento: Membro participa de vários eventos
   *
   * Relacionamento N:M via tabela intermediária EventTeamMember
   */
  @OneToMany(() => EventTeamMember, (etm) => etm.teamMember)
  eventAllocations: EventTeamMember[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

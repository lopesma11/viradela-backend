/**
 * Entity EventTeamMember
 *
 * Tabela intermediária entre Event e TeamMember
 *
 * Por quê não @ManyToMany simples?
 * - Precisamos armazenar dados extras:
 *   - role (função do membro neste evento específico)
 *   - confirmedAt (quando confirmou presença)
 *
 * Relacionamento:
 * Event 1:N EventTeamMember N:1 TeamMember
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { TeamMember } from '../../team/entities/team-member.entity';

@Entity('event_team_members')
export class EventTeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Evento ao qual o membro foi alocado
   */
  @ManyToOne(() => Event, (event) => event.teamAllocations, {
    onDelete: 'CASCADE', // Se deletar evento, deleta alocações
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ name: 'event_id' })
  eventId: string;

  /**
   * Membro alocado
   */
  @ManyToOne(() => TeamMember, (member) => member.eventAllocations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'team_member_id' })
  teamMember: TeamMember;

  @Column({ name: 'team_member_id' })
  teamMemberId: string;

  /**
   * Função do membro neste evento
   *
   * Ex: "Recreador Principal", "Pintor Facial", "Personagem Frozen"
   *
   * Por quê nullable?
   * - Nem sempre precisa especificar
   * - Pode definir depois
   */
  @Column({ nullable: true })
  role: string;

  /**
   * Quando o membro confirmou presença
   *
   * null = ainda não confirmou
   * timestamp = confirmado
   */
  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date;

  /**
   * Quando foi alocado
   */
  @CreateDateColumn()
  allocatedAt: Date;
}

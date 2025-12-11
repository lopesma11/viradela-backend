import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './team-member.entity';
import { EventTeamMember } from '../../events/entities/event-team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamMember, EventTeamMember])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TeamModule {}

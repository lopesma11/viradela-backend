import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTeamMember } from './entities/event-team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventTeamMember])],
  controllers: [],
  providers: [],
  exports: [],
})
export class EventsModule {}

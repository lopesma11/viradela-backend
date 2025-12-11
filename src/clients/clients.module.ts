import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ClientsModule {}

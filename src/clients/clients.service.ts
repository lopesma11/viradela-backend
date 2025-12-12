import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['events'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['events'],
    });

    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }

    return client;
  }

  async findByPhone(phone: string): Promise<Client | null> {
    return this.clientRepository.findOne({
      where: { phone },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.findOne(id);

    await this.clientRepository.update(id, updateClientDto);

    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const client = await this.findOne(id);

    if (client.events && client.events.length > 0) {
      throw new NotFoundException(`Não é possível deletar cliente com eventos cadastrados`);
    }

    await this.clientRepository.delete(id);
  }
}

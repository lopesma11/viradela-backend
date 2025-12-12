import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

/**
 * DTO para atualizar cliente
 *
 * PartialType torna TODOS os campos opcionais
 */
export class UpdateClientDto extends PartialType(CreateClientDto) {}

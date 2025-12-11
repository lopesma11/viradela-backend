import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

/**
 * Decorator para pegar usuário autenticado
 *
 * Uso:
 * async findAll(@CurrentUser() user: User) {
 *   console.log(user.email); // Email do user autenticado
 * }
 */

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

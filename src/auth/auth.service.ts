// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../../users/users.service';
// import { JwtService } from '@nestjs/jwt';
// import { LoginDto } from './dto/login.dto';
// import * as bcrypt from 'bcrypt';
// import { RegisterDto } from './dto/register.dto';
// import { User } from '../../users/entities/user.entity';

// interface JwtPayload {
//   sub: string;
//   email: string;
//   role: string;
// }

// interface LoginResponse {
//   access_token: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//     role: string;
//   };
// }

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async login(loginDto: LoginDto): Promise<LoginResponse> {
//     const user = await this.usersService.findByEmail(loginDto.email);

//     if (!user) {
//       throw new UnauthorizedException('Credenciais inválidas');
//     }

//     if (!user.isActive) {
//       throw new UnauthorizedException('Usuário inativo');
//     }

//     const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Credenciais inválidas');
//     }

//     const payload: JwtPayload = {
//       sub: user.id,
//       email: user.email,
//       role: user.role,
//     };

//     const access_token = this.jwtService.sign(payload);

//     return {
//       access_token,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//       },
//     };
//   }

//   async register(registerDto: RegisterDto): Promise<User> {
//     const existingUser = await this.usersService.findByEmail(registerDto.email);

//     if (existingUser) {
//       throw new UnauthorizedException('Email já cadastrado');
//     }

//     const hashedPassword = await bcrypt.hash(registerDto.password, 10);

//     const user = await this.usersService.create({
//       ...registerDto,
//       password: hashedPassword,
//     });

//     delete user.password;

//     return user;
//   }

//   async validateUser(payload: JwtPayload): Promise<User> {
//     const user = await this.usersService.findOne(payload.sub);

//     if (!user || !user.isActive) {
//       throw new UnauthorizedException('Usuário inválido');
//     }

//     return user;
//   }
// }

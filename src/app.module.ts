import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Postagem } from './postagem/entidade/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './tema/entities/tema.entities';
import { TemaModule } from './tema/tema.module';
import { Usuario } from './usuario/entities/usuario.entities';
import { UsuarioModule, } from './usuario/usuario.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:'root',
    password:'root',
    database:'db_blognaty',
    entities: [Postagem, Tema, Usuario],
    synchronize: true
  }),
  TemaModule,
  AuthModule,
  PostagemModule,
  UsuarioModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

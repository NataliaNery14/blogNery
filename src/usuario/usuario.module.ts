import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bcrypt } from "src/auth/bcrypt/bcrypt";
import { UsuarioController } from "./controller/usuario.controller";
import { Usuario } from "./entities/usuario.entities";
import { UsuarioService } from "./service/usuario.service";
import { ApiProperty } from "@nestjs/swagger";


@Module({
    imports:[TypeOrmModule.forFeature([Usuario])],
    providers:[UsuarioService,Bcrypt],
    controllers:[UsuarioController],
    exports:[UsuarioService],
})
export class UsuarioModule {}

    @ApiProperty()
    public usuario: string

    @ApiProperty()
    public senha: string
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entities";
import { UsuarioService } from "../service/usuario.service";


@ApiTags('Usuario')
@Controller("/usuario")

export class UsuarioController {
    constructor(private readonly usarioService: UsuarioService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usarioService.findAll();
    }

    @ApiTags('Usuario')
    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usarioService.create(usuario);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usarioService.update(usuario);
    }
}



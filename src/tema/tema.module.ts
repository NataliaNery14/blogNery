import { Controller, Module } from "@nestjs/common/decorators";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostagemModule } from "../postagem/postagem.module";
import { TemaController } from "./controllers/tema.controllers"; 
import { Tema } from "./entities/tema.entities"; 
import { TemaService } from "./services/tema.services";

@Module ({
    imports: [TypeOrmModule.forFeature([Tema])],
    providers: [TemaService],
    controllers: [TemaController],
    exports: [TypeOrmModule]
})

export class TemaModule {}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaModule } from "src/tema/tema.module";
import { TemaService } from "../tema/services/tema.services";
import { PostagemController } from "./controllers/postagem.controllers";
import { Postagem } from "./entidade/postagem.entity";
import { PostagemServices } from "./services/postagem.services";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers:[PostagemServices, TemaService],
    controllers:[PostagemController],
    exports: [TypeOrmModule]
})
export class PostagemModule {}

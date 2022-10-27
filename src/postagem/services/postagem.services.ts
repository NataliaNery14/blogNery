import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/services/tema.services";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entidade/postagem.entity";

@Injectable()
export class PostagemServices {
    constructor(
        @InjectRepository(Postagem)
        private PostegemRepository: Repository<Postagem>,
        private temaService: TemaService
    ) {}

    async findAll (): Promise<Postagem[]>{
        return await this.PostegemRepository.find({
            relations: {
             tema: true,
                usuario: true
        }
    })
    
    
    }

    async findById (id: number): Promise<Postagem> {
        
        let postagem = await this.PostegemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true,
                usuario: true
            }
        });

        if (!postagem)
          throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);
        
        return postagem;
    }

    async findByTitulo (titulo:string): Promise<Postagem[]> {
        return await this.PostegemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                tema: true,
                usuario: true
            }
        });
    }

    async create (postagem: Postagem): Promise<Postagem> {
        if (postagem.tema){
            let tema = await this.temaService.findById(postagem.tema.id)
        if (!tema)
            throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
        }

        return await this.PostegemRepository.save(postagem);
    }

    async update (postagem: Postagem): Promise<Postagem> {
        let buscaPostagem : Postagem = await this.findById(postagem.id);
        
        if (!buscaPostagem || !postagem.id)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        if (postagem.tema){

            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
        
            return await this.PostegemRepository.save(postagem);
        }

    }

        async delete (id : number): Promise<DeleteResult> {
            let buscaPostagem = await this.findById(id);

            if (!buscaPostagem)
              throw new HttpException('Postagem Não encontrada!', HttpStatus.NOT_FOUND);
              return await this.PostegemRepository.delete(id)
        }
    
}

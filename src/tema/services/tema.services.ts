import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entities";

@Injectable ()
export class TemaService {
    findByDescricao(_descricao: string): Promise<Tema[]> {
        throw new Error("Method not implemented.");
    }
    constructor (
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>
    ) {}

    async findALl (): Promise<Tema[]> {
        return await this.temaRepository.find ({
            relations: {
                postagem: true
            }        })
    }

    async findById (id: number): Promise<Tema> {
        let tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem:true
            }
        });

    if (!tema)
        throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
    return tema; 
    }

    async findDescricao (descricao: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}`)
            }
        })
    }

    async create (tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema);
    }

    async update (tema: Tema): Promise<Tema>{
        let buscaTema = await this.findById(tema.id);

        if(!buscaTema || !tema.id)
            throw new HttpException('Tema não enncontrado', HttpStatus.NOT_FOUND)

        return await this.temaRepository.save(tema);

    }

    async delete (id: number): Promise<DeleteResult> {
        let buscaTema = await this.findById(id);

        if (!buscaTema)
            throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)

        return await this.temaRepository.delete(id);
    }
}


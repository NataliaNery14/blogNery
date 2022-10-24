import { IsNotEmpty, MinLength, } from "class-validator";
import { Postagem } from "src/postagem/entidade/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger"


@Entity({name:'tb_usuario'})
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    public nome: string;

    @IsNotEmpty()
    @Column({length:255, nullable: false})
    @ApiProperty()
    public usuario: string;

    @IsNotEmpty()
    @MinLength(8)
    @Column({length:255,nullable:false})
    @ApiProperty({exemplo: "natalianery23@gmail.com"})
    public senha: string;

    @Column({ length:5000 })
    @ApiProperty()
    public foto: string;

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}

function ApiProperty() {
    throw new Error("Function not implemented.");
}

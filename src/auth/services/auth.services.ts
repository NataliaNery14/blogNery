import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { Bcrypt } from '../bcrypt/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt
  ) { }

  async validateUser(username: string, password: string): Promise<any> {

    const buscaUsuario = await this.usuarioService.FindByUsuario(username)

    if (!buscaUsuario)
        throw new HttpException('Não achei o Usuario!', HttpStatus.NOT_FOUND);
      
    const match = await this.bcrypt.compararSenha(buscaUsuario.senha, password)

    if (buscaUsuario && match) {
      const { senha, ...result } = buscaUsuario;
      return result;
    }
    return null;
  }

  async login(usuarioLogin: any) {

    const payload = { username: usuarioLogin.usuario, sub: "blogNery" };

    return {
      usuario: usuarioLogin.usuario,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
    
  }

}
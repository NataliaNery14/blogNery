import { UnauthorizedException } from "@nestjs/common";
import { Injectable, } from "@nestjs/common/decorators/core/injectable.decorator";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.services";


@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'usuario',
            passwordField: 'senha'
        });
    }

    async validate(username:string,password:string): Promise<any> {
        const user = await this.authService.validateUser(username,password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
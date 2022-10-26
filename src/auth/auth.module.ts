import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsuarioModule } from "../usuario/usuario.module";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstants } from "./constants/constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.services";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { localStrategy } from "./strategy/local.strategy";


@Module({
    imports:[
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h'},
        }),
    ],
    providers:[Bcrypt, AuthService, localStrategy,JwtStrategy],
    controllers:[AuthController],
    exports:[Bcrypt],
})
export class AuthModule { }

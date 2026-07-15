import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllersModule } from './infrastructure/modules/controllers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5433),
        username: config.get<string>('DATABASE_USER', 'tvtime'),
        password: config.get<string>('DATABASE_PASSWORD', 'tvtime'),
        database: config.get<string>('DATABASE_NAME', 'tvtime'),
        autoLoadEntities: true,
        // v1 : le schéma est synchronisé automatiquement. Passer à des
        // migrations TypeORM avant toute mise en production sérieuse.
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'dev-secret-change-me'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN', '30d') as JwtSignOptions['expiresIn'],
        },
      }),
    }),
    ControllersModule,
  ],
})
export class AppModule {}

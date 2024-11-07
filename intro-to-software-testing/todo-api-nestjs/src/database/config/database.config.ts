import { Signer } from '@aws-sdk/rds-signer';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Env } from '../../env.interface';
import { ConnectionOptions } from 'mysql2';

config();

const configService = new ConfigService<Env>();

let connectionOptions: ConnectionOptions;

if (configService.get('NODE_ENV') == 'production') {
  const signer = new Signer({
    hostname: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
  });
  connectionOptions = {
    host: configService.get('DB_HOST'),
    user: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    port: configService.get('DB_PORT'),
    authPlugins: { mysql_clear_password: () => () => signer.getAuthToken() },
  };
} else {
  connectionOptions = {
    host: configService.get('DB_HOST'),
    user: configService.get('DB_USER'),
    database: configService.get('DB_NAME'),
    password: configService.get('DB_PASSWORD'),
    port: configService.get('DB_PORT'),
    debug: false,
  };
}

export default connectionOptions;

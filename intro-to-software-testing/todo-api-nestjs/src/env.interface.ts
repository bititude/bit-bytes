export interface Env {
  NODE_ENV: 'development' | 'production' | 'staging' | 'testing';
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
}

import knex from 'knex';
import { configs } from "../knexfile";
const environment: string = process.env.NODE_ENV || 'development';

export const db = knex(configs[environment]);

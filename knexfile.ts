// still janky for typescript

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  pool: {
    afterCreate: (conn: any, done: Function) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    },
  },
}

interface Config {
  [key: string]: any
}

export const configs: Config = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/lambda.db3' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/testing.db3' },
  },
}

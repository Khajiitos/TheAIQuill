import { MysqlError, Pool, QueryOptions } from "mysql";

import { createPool } from "mysql";

const config = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  connectionLimit: 10
}

const pool: Pool = createPool(config);

export function query(sql: string | QueryOptions, values: any[]) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error: MysqlError | null, results: any[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
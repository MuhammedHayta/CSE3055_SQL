// Database.ts
import sql, { ConnectionPool, ISqlQuery } from 'mssql';

class Database {
  private static pool: ConnectionPool;

  private static config = {
    user: 'sa',
    password: '123456',
    server: 'DESKTOP-TDQC2P0',
    database: 'ERŞAT_FACTORY',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
  };

  public static async connect(): Promise<void> {
    if (!Database.pool) {
      Database.pool = await sql.connect(Database.config);
      console.log('Connected to database');
    }
  }

  public static async execute(
    queryOrProcedure: string,
    parameters: { [key: string]: any } = {}
  ): Promise<ISqlQuery<any>> {
    try {
      await Database.connect();

      const request = Database.pool.request();

      // Add parameters to the request
      Object.entries(parameters).forEach(([name, value]) => {
        request.input(name, value);
      });

      // Determine if it's a query or stored procedure
      if (queryOrProcedure.toLowerCase().startsWith('exec')) {
        // It's a stored procedure
        const result = await request.execute(queryOrProcedure);
        return result;
      } else {
        // It's a regular SQL query
        const result = await request.query(queryOrProcedure);
        return result;
      }
    } catch (error) {
      throw new Error(`Error executing query or stored procedure: ${error}`);
    }
  }

  public static async close(): Promise<void> {
    if (Database.pool) {
      await Database.pool.close();
    }
  }

  public static getPool(): ConnectionPool {
    return Database.pool;
  }
}

export default Database;

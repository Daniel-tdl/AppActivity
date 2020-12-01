module.exports = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        database: 'db-apptask',
        user: 'root',
        password: '123456',
        insecureAuth: true
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
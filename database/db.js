import PG from 'pg' // импорт модуля postgreSQL
const { Pool } = PG // достаём конкретный модуль Pool из PG (с помощью pool делаем запросы к БД)

const pool = new Pool({
    user: 'postgres',
    password: 'admin1',
    host: 'localhost',
    port: 5432,
    database: 'db_testing',
})

export default pool

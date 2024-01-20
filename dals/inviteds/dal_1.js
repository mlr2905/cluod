
const knex = require('knex')
const config = require('config')

const connectedKnex = knex({
    client: 'pg',
    version: '15',
    connection: {
        host: config.db_cloud.host,
        user: config.db_cloud.user,
        password: config.db_cloud.password,
        database: config.db_cloud.database,
        ssl: true
    }
})

async function create_table_if_not_exist() {
    const tableExists = await connectedKnex.schema.hasTable('invited');

    if (!tableExists) {
        await connectedKnex.schema.createTable('invited', (table) => {
            table.increments('id').primary(); // This creates a SERIAL column
            table.string('user').notNullable();
            table.string('text').notNullable();
            table.time('time', { precision: 0 });
            table.string('type').notNullable();
        });
    }

}

async function delete_all() {
    // db.run('update invited ....')
    const result = await connectedKnex('invited').del()
    await connectedKnex.raw('ALTER SEQUENCE "invited_id_seq" RESTART WITH 1');
    return result
}

async function get_all() {
    // db.run('select * from invited')
    const messages = await connectedKnex('invited').select('*')

    return messages
}

async function get_by_id(id) {
    // db.run('select * from invited where id=?')
    const message = await connectedKnex('invited').select('*').where('id', id).first()
    return message
}

async function new_message(new_mes) {
    // db.run('insert into invited ....')
    // result[0] will be the new ID given by the SQL
    // Insert into invited values(....)
    const result = await connectedKnex('invited').insert(new_mes)
    return { ...new_mes, id: result[0] }
}

async function update_message(id, updated_message) {
    // db.run('update invited ....')
    const result = await connectedKnex('invited').where('id', id).update(updated_message)
    return updated_message
}

async function delete_message(id) {
    // db.run('update invited ....')
    const result = await connectedKnex('invited').where('id', id).del()
    return result
}

module.exports = {
    get_all, get_by_id, new_message, update_message, delete_message,
    delete_all, create_table_if_not_exist
}
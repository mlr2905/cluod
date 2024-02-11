const knex = require('knex')
const db = require('../../a_db/db')
const connectedKnex = db.connect()

async function create_table_if_not_exist() {
    const tableExists = await connectedKnex.schema.hasTable('chat2');

    if (!tableExists) {
        await connectedKnex.schema.createTable('chat2', (table) => {
            table.increments('id').primary(); // This creates a SERIAL column
            table.string('user').notNullable();
            table.string('text').notNullable();
            table.time('time', { precision: 0 });
            table.string('type').notNullable();
        });
    }

}

async function delete_all() {
    // db.run('update chat2 ....')
    const result = await connectedKnex('chat2').del()
    await connectedKnex.raw('ALTER SEQUENCE "chat2_id_seq" RESTART WITH 1');
    return result
}

async function get_all() {
    // db.run('select * from chat2')
    const messages = await connectedKnex('chat2').select('*')
    return messages
}

async function get_by_id(id) {
    // db.run('select * from chat2 where id=?')
    const message = await connectedKnex('chat2').select('*').where('id', id).first()
    return message
}

async function new_message(new_mes) {
    // db.run('insert into chat2 ....')
    // result[0] will be the new ID given by the SQL
    // Insert into chat2 values(....)
    const result = await connectedKnex('chat2').insert(new_mes)
    return { ...new_mes, id: result[0] }
}

async function update_message(id, updated_message) {
    // db.run('update chat2 ....')
    const result = await connectedKnex('chat2').where('id', id).update(updated_message)
    return updated_message
}

async function delete_message(id) {
    // db.run('update chat2 ....')
    const result = await connectedKnex('chat2').where('id', id).del()
    return result
}

module.exports = {
    get_all, get_by_id, new_message, update_message, delete_message,
    delete_all, create_table_if_not_exist
}
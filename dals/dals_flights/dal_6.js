
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

// ---------------User functions only and admin---------------

async function new_ticket(new_t) {
    // db.run('insert into tickets ....')
    // result[0] will be the new ID given by the SQL
    // Insert into tickets values(....)
    const result = await connectedKnex('tickets').insert(new_t)
    return { ...new_t, id: result[0] }
 
}

async function get_by_id(id) {
    // db.run('select * from tickets where user_id=?')
    const ticket = await connectedKnex('tickets').select('*').where('id', id).first()
    return ticket
}

async function delete_ticket(id) {
    // db.run('update tickets ....')
    const result = await connectedKnex('tickets').where('id', id).del()
    return result
}

// ---------------Admin permission only---------------

async function update_ticket(id, updated_ticket) {
    // db.run('update tickets ....')
    const result = await connectedKnex('tickets').where('id', id).update(updated_ticket)
    return updated_ticket
}
async function get_all() {
    // db.run('select * from tickets')
    const tickets = await connectedKnex('tickets')
    .leftJoin('countries', 'countries.id', 'tickets.flight_id')
    .leftJoin('customers', 'customers.id', 'tickets.customer_id')
    .leftJoin('passengers', 'passengers.id', 'tickets.passenger_id')
    .leftJoin('flights', 'flights.id', 'tickets.passenger_id')
    .leftJoin('airlines', 'airlines.id', 'flights.airline_id')
    .leftJoin('seats', 'seats.id', 'tickets.seat_id')
    .select('tickets.*','airlines.name as airline_name' ,'countries.country_name as flight_destination',
     'passengers.first_name as passanger_first_name','passengers.last_name as passanger_last_name',
     'customers.first_name','customers.last_name',"seats.name as seat");

    return tickets
}

async function delete_all() {
    // db.run('update tickets ....')
    const result = await connectedKnex('tickets').del()
    await connectedKnex.raw('ALTER SEQUENCE "tickets_id_seq" RESTART WITH 1');
    return result
}

// async function create_table_if_not_exist() {
//     const tableExists = await connectedKnex.schema.hasTable('tickets');

//     if (!tableExists) {
//         await connectedKnex.schema.createTable('tickets', (table) => {
//             table.increments('id').primary();
//             table.integer('flight_id').notNullable().references('flights.id');
//             table.integer('customer_id').unique().notNullable().references('customers.id');
//             table.integer('passenger_id').unique().notNullable().references('passengers.id');
//                 });
//     }
// }

module.exports = {
    get_all, get_by_id, new_ticket, update_ticket, delete_ticket,
    delete_all
    // , create_table_if_not_exist
}
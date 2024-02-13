const assert = require('assert')
const dal = require('../../dals/dal_1')
describe('Testing functionallity of the DAL', () => {
   
    it('get_all', async () => {
        const next_id = await dal.get_next_user_id()
        let id = parseInt(next_id.rows[0].last_value)
        const expected = id -1
        const users = await dal.get_all()
        const actual = users.length
        assert.strictEqual(expected, actual)
    })

    it('get_by_name', async () => {
        const expected = 'Michael29@gmail.com'
        const user_id_3 = await dal.get_by_name("Michael29")
        const actual = user_id_3.email
        assert.strictEqual(expected, actual)
    })

    it('get_by_id', async () => {
        const expected = 'Michael29'
        const user_id_3 = await dal.get_by_id(36)
        const actual = user_id_3.username
        assert.strictEqual(expected, actual)
    })

    it('new_user', async () => {
        const next_id = await dal.get_next_user_id()
        let id = parseInt(next_id.rows[0].last_value)
        await dal.sp_i_users({ 'username': 'michael_test', 'password': 'test', 'email': 'michael_test@gmail.com' }) 
        const expected = 'michael_test'
        const actual = await dal.get_by_id(id)
        assert.strictEqual(expected, actual.username)
    })

   it('update_user', async () => {
        const next_id = await dal.get_next_user_id()
        let id = parseInt(next_id.rows[0].last_value)
        await dal.update_user(id, { 'username': 'michael_test', 'password': 'test_12345', 'email': null})
        const expected = 'test_12345'
        const actual = await dal.get_by_id(id)
        assert.strictEqual(expected, actual.password)
    }) 

    it('delete_user', async () => {
        const next_id = await dal.get_next_user_id()
        let id = parseInt(next_id.rows[0].last_value)
        await dal.delete_user(id)
        const expected = undefined
        const user_id_5 = await dal.get_by_id(id)
        const set_id_user = await dal.set_id_user(id)
        assert.strictEqual(expected, user_id_5)
    })

    // it('Confirm_one_line',async () => {
    //     await dal.delete_all()
    //     await dal.new_user({ 'id': 1,  'username': 'michael', 'password': 'ferf444', 'email': 'c@gmail.com' }) // id: 1
    // })

})
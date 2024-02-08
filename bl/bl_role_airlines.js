
const dal_1 = require('../dals/dals_flights/dal_1')
const dal_3 = require('../dals/dals_flights/dal_3')
const dal_5 = require('../dals/dals_flights/dal_5')


//func users
async function create_user_airlines(uesr) {
  const user_name = await dal_1.get_by_name(uesr.username);
  if (!user_name) {
    try {
      // בודקת אם קיבלה סיסמה
      if (uesr.password !== '') {
        // מפעילה את הפרוצדורה sp_i_users
        const new_user = await dal_1.sp_i_users_airlines(uesr);
        return new_user
      } else {
        // מפעילה את הפרוצדורה sp_pass_users
        const new_user = await dal_1.sp_pass_users_airlines(uesr);
        return new_user
      }
    } catch (error) {
      console.error('Error passing users:', error);
      throw error; // מעבירה את השגיאה הלאה
    }

  }
  else {
    return console.error('User exists in the system:', error);

  }
}

async function get_by_id_user(id) {

  const user_id = await dal_1.get_by_id(id);
  return user_id

}

async function update_user(id, email, password) {

  const user_id = await dal_1.get_by_id(id);

  if (user_id) {

    const update_user = await dal_1.update_user(id, email, password);
    return `${user_id.username}${update_user}`
  }
  else {
    return console.error('The ID you specified does not exist:');

  }
}

///User airline

async function create_user_airline(username) {
  try {
    // בודקת אם קיבלה סיסמה

    // מפעילה את הפרוצדורה sp_i_users
    const new_user = await dal_3.new_airline(username);
    return new_user

  } catch (error) {
    console.error('Error passing users:', error);
    throw error; // מעבירה את השגיאה הלאה
  }
}

async function get_by_id_user_airline(id) {

  const user_id = await dal_3.get_by_id(id);
  return user_id

}

async function update_user_airline(id, update_airline) {

  const user_id = await dal_3.get_by_id(id);

  if (user_id) {

    const update_user = await dal_1.update_user(id, update_airline);
    return `${user_id.name}${update_user}`
  }
  else {
    return console.error('The ID you specified does not exist:');

  }
}

// flights

async function get_all_flights() {
  try {
    const get_all = await dal_5.get_all();

    return get_all


  } catch (error) {
    console.error('Error checking id  or fetching flight:', error);
    throw error; // מעבירה את השגיאה הלאה
  }
}

async function get_by_id_flights(id) {
  try {
    const get_by_id = await dal_5.get_by_id(id);

    if (get_by_id) {
      return get_by_id

    } else {
      return console.error('The hand does not exist in Bella'); // מחזירה null אם הטבלה לא קיימת
    }
  } catch (error) {
    console.error('Error checking id  or fetching flight:', error);
    throw error; // מעבירה את השגיאה הלאה
  }
}


async function create_new_flights(flights) {
  try {

    // מפעילה את הפרוצדורה sp_i_users
    const new_flights = await dal_5.new_flight(flights);
    return new_flights

  } catch (error) {
    console.error('Error passing users:', error);
    throw error; // מעבירה את השגיאה הלאה
  }
}

async function update_flight(id, update_flight) {

  const flight_id = await dal_5.get_by_id(id);

  if (flight_id) {

    const update = await dal_1.update_user(id, update_flight);
    return `${flight_id.id}${update}`
  }
  else {
    return console.error('The ID you specified does not exist:');

  }
}

async function delete_flight(id) {
  try {

    const delete_flight = await dal_5.delete_flight(id);
    return delete_flight

  } catch (error) {
    console.error('Error passing users:', error);
    throw error; // מעבירה את השגיאה הלאה
  }
}



module.exports = {
  create_user_airlines, get_by_id_user, update_user, create_user_airline, get_by_id_user_airline, update_user_airline,
  get_all_flights, get_by_id_flights, create_new_flights, update_flight, delete_flight
}
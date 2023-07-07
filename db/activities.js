const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  try {
    const { rows: [activities] } = await client.query(
      `
      INSERT INTO activities(name, description) 
      VALUES($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      [name, description]
    );
    return activities;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const { rows: activities } = await client.query(
      `
      SELECT *
      FROM activities
      `
    );
    return activities;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const { rows: [activities] } = await client.query(`
    SELECT *
    FROM activities
    WHERE id=$1;
    `, [id])
  
  
    return activities;

  } catch (error) {
    throw error;
  }
}

async function getActivityByName(name) {
// used as a helper inside db/routines.js
try {
  const { rows: [activities] } = await client.query(`
  SELECT *
  FROM activities
  WHERE name=$1;
  `, [name])

  
  return activities;

} catch (error) {
  throw error;
}
}

async function attachActivitiesToRoutines(routines) {

}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  try {
    const setString = Object.keys(fields).map((field, index) => `"${field}"=$${index+1}`).join(',')
    if (setString > 0) {
      return;
    }
    const { rows: [activities] } = await client.query(`
      UPDATE activities
      SET ${setString}
      WHERE id=$${Object.keys(fields).length+1}
      RETURNING *;
    `, [...Object.values(fields), id]);
    return activities;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};

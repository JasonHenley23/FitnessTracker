const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [routine_activities] } = await client.query(
      `
      INSERT INTO routine_activities("routineId", "activityId", count, duration) 
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );
    return routine_activities;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    const { rows: [routine_activities] } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE id=$1;
    `, [id])
  
  
    return routine_activities;

  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: [routine_activities] } = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE id=$1;
    `, [id])
  
    
    return routine_activities;
  
  } catch (error) {
    throw error;
}
}
async function updateRoutineActivity({ id, ...fields }) {
  try {
    const setString = Object.keys(fields).map((field, index) => `"${field}"=$${index+1}`).join(',')
    if (setString > 0) {
      return;
    }
    const { rows: [routine_activities] } = await client.query(`
      UPDATE routine_activities
      SET ${setString}
      WHERE id=$${Object.keys(fields).length+1}
      RETURNING *;
    `, [...Object.values(fields), id]);
    return routine_activities;

  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    await client.query(`
    DELETE FROM routine_activities
    WHERE "routineId"=$1
    `, [id]);

    const { rows: [routine] } = await client.query(`
    DELETE FROM routines
    WHERE id=$1
    RETURNING *;
    `, [id]);
    return routine;

  } catch (error) {
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};

const client = require("./client");
const { getUserByUsername } = require("./users");


async function createRoutine({ creatorId, isPublic, name, goal }) 
{
  try {
    const { rows: [routines] } = await client.query(
      `
      INSERT INTO routines("creatorId", "isPublic", name, goal) 
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const { rows: [routines] } = await client.query(`
    SELECT *
    FROM routines
    WHERE id=$1;
    `, [id])
  
   
    return routines;

  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(`
    SELECT * 
    FROM routines `)
    

    return routines; 
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON users.id=routines."creatorId"
    `)

    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.count, routine_activities.duration, routine_activities."routineId", routine_activities.id AS "routineActivityId"
    FROM activities
    JOIN routine_activities ON activities.id=routine_activities."activityId"
    `)
    
    for (const routine of routines) {
      const _activities = activities.filter (activity => activity.routineId === routine.id)
      routine.activities = _activities;
    }
   
    return routines;

  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON users.id=routines."creatorId"
    WHERE "isPublic"= true;
    `)
  
    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.count, routine_activities.duration, routine_activities."routineId", routine_activities.id AS "routineActivityId"
    FROM activities
    JOIN routine_activities ON activities.id=routine_activities."activityId"
    `)

    for (const routine of routines) {
      const _activities = activities.filter (activity => activity.routineId === routine.id)
      routine.activities = _activities;
    }
    return routines;

  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const user = await getUserByUsername(username);
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON users.id=routines."creatorId"
    WHERE "creatorId"=$1;
    `, [user.id])
  
    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.count, routine_activities.duration, routine_activities."routineId", routine_activities.id AS "routineActivityId"
    FROM activities
    JOIN routine_activities ON activities.id=routine_activities."activityId"
    `)

    for (const routine of routines) {
      const _activities = activities.filter (activity => activity.routineId === routine.id)
      routine.activities = _activities;
    }
    return routines;

  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON users.id=routines."creatorId"
    WHERE "isPublic" = true;
    `)
  
    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.count, routine_activities.duration, routine_activities."routineId", routine_activities.id AS "routineActivityId"
    FROM activities
    JOIN routine_activities ON activities.id=routine_activities."activityId"
    `)

    for (const routine of routines) {
      const _activities = activities.filter (activity => activity.routineId === routine.id)
      routine.activities = _activities;
    }
    return routines;

  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON users.id=routines."creatorId"
    JOIN routine_activities ON routine_activities."routineId"=routines.id
    WHERE "isPublic" = true AND routine_activities."activityId"=$1;
    `, [id])
  
    const { rows: activities } = await client.query(`
    SELECT activities.*, routine_activities.count, routine_activities.duration, routine_activities."routineId", routine_activities.id AS "routineActivityId"
    FROM activities
    JOIN routine_activities ON activities.id=routine_activities."activityId"
    `)

    for (const routine of routines) {
      const _activities = activities.filter (activity => activity.routineId === routine.id)
      routine.activities = _activities;
    }
    return routines;

  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  try {
    const setString = Object.keys(fields).map((field, index) => `"${field}"=$${index+1}`).join(',')
    if (setString > 0) {
      return;
    }
    const { rows: [routine] } = await client.query(`
      UPDATE routines
      SET ${setString}
      WHERE id=$${Object.keys(fields).length+1}
      RETURNING *;
    `, [...Object.values(fields), id]);
    return routine;

  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
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

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};

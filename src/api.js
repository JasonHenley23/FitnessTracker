const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

const getRoutines = async () => {
   
        const rsp = await fetch(`${BASE_URL}/routines`);
        console.log(rsp);
        const data = await rsp.json();
        console.log(data);
        return data;
    
};

const loginUser = async (username, password) => {
    try {
        const rsp = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify ({
                username,
                password
            })
        });
        const data = await rsp.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

const createRoutine = async (routineData, token) => {
    try {
        const data = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify (routineData)
        });
        return data;
    } catch (err) {
        console.log(err);
    }
}

export {
    getRoutines,
    loginUser,
    createRoutine
}
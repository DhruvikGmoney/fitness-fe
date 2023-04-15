const axios = require('axios').default;
// const BASEURL = "https://myfiti.herokuapp.com/";
// const BASEURL = "http://localhost:7700/";
const BASEURL = "https://fit-rbm3.onrender.com/";

////// user ///////

async function login(email, password) {
    var response = '';
    var url = BASEURL + 'User/Login/';
    try {
        response = await axios.post(url, JSON.stringify({
            "Email": email,
            "Social": false,
            "PassWords": password
        }), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        await getUserData(response.data._id).then((user) => {
            localStorage.setItem('userDetails', JSON.stringify(user.Data));
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getAllUsers() {
    var response = '';
    var url = BASEURL + 'User/Get_All_Users';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}



async function getUserData(id) {
    var response = '';
    var url = BASEURL + 'User/Get_User_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}
async function deteleuser(id) {
    var response = '';
    var url = BASEURL + 'User/Delete/' + id;
    try {
        response = await axios.delete(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateUser(id, data) {
    var response = '';
    var url = BASEURL + 'User/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}
////// end user ///////

////// workout ///////

async function getAllWorkouts() {
    var response = '';
    var url = BASEURL + 'Workout/Get_All_Workouts';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getSingleWorkout(id) {
    var response = '';
    var url = BASEURL + 'Workout/Get_Workout_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteWorkout(id) {
    var response = '';
    var url = BASEURL + 'Workout/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateWorkout(id, title, description, goal, level, bodypart, equipment, duration, price, day1, day2,
    day3,
    day4,
    day5,
    day6,
    day7,
    image) {
    var response = '';
    var data = {
        "TITLE": title,
        "DESCRIPTION": description,
        "GOAL": goal,
        "LEVEL": level,
        "BODYPART": bodypart,
        "EQUIPMENT": equipment,
        "DURATION": duration,
        'IMAGE': image,
        "PRICE": price,
        "DAY_1": day1,
        "DAY_2": day2,
        "DAY_3": day3,
        "DAY_4": day4,
        "DAY_5": day5,
        "DAY_6": day6,
        "DAY_7": day7,
        "STATUS": "Active"
    };

    var url = BASEURL + 'Workout/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addWorkout(title, description, goal, level, bodypart, equipment, duration, price, day1, day2,
    day3,
    day4,
    day5,
    day6,
    day7, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "DESCRIPTION": description,
        "GOAL": goal,
        "LEVEL": level,
        "BODYPART": bodypart,
        "EQUIPMENT": equipment,
        "DURATION": duration,
        "IMAGE": image,
        "PRICE": price,
        "DAY_1": day1,
        "DAY_2": day2,
        "DAY_3": day3,
        "DAY_4": day4,
        "DAY_5": day5,
        "DAY_6": day6,
        "DAY_7": day7,
        "STATUS": "Active"
    };
    var url = BASEURL + 'Workout/Add_Workout';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}
////// end workout ///////


////// bodyparts ///////

async function getAllBodyparts() {
    var response = '';
    var url = BASEURL + 'Bodyparts/Get_All_Bodyparts';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsinglebodypart(id) {
    var response = '';
    var url = BASEURL + 'Bodyparts/Get_Bodypart_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updatebodypart(id, title, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "IMAGE": image,

    };
    var url = BASEURL + 'Bodyparts/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addBodypart(title, image) {
    var response = '';
    var data = {
        "TITLE": title,
        'IMAGE': image
    };
    var url = BASEURL + 'Bodyparts/Add_Bodyparts_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteBodypart(id) {
    var response = '';
    var url = BASEURL + 'Bodyparts/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end bodyparts ///////

////// Equipment ///////

async function getAllEquipments() {
    var response = '';
    var url = BASEURL + 'Equipments/Get_All_Equipments';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleEquipment(id) {
    var response = '';
    var url = BASEURL + 'Equipments/Get_Equipment_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateEquipment(id, title, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "IMAGE": image
    };
    var url = BASEURL + 'Equipments/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addEquipment(title, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "IMAGE": image
    };
    var url = BASEURL + 'Equipments/Add_Equipments_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteEquipment(id) {
    var response = '';
    var url = BASEURL + 'Equipments/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end Equipment ///////

////// Category ///////

async function getAllCategory() {
    var response = '';
    var url = BASEURL + 'Categories/Get_All_Categories';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleCategory(id) {
    var response = '';
    var url = BASEURL + 'Categories/Get_Category_Data/' + id;

    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateCategory(id, title, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "IMAGE": image
    };
    var url = BASEURL + 'Categories/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addCategory(title, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "IMAGE": image
    };
    var url = BASEURL + 'Categories/Add_Categories_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteCategory(id) {
    var response = '';
    var url = BASEURL + 'Categories/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end Category ///////


////// tags ///////

async function getAllTags() {
    var response = '';
    var url = BASEURL + 'Tags/Get_All_Tag';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleTags(id) {
    var response = '';
    var url = BASEURL + 'Tags/Get_Tag_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateTags(id, title) {
    var response = '';
    var data = {
        "TITLE": title,
    };
    var url = BASEURL + 'Tags/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addTags(title) {
    var response = '';
    var data = {
        "TITLE": title,
    };
    var url = BASEURL + 'Tags/Add_Tag';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteTags(id) {
    var response = '';
    var url = BASEURL + 'Tags/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end tags ///////

////// level ///////

async function getAllLevel() {
    var response = '';
    var url = BASEURL + 'Levels/Get_all_Levels';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleLevel(id) {
    var response = '';
    var url = BASEURL + 'Levels/Get_Level_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateLevel(id, title, rate, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "RATE": rate,
        "IMAGE": image
    };
    var url = BASEURL + 'Levels/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addLevel(title, rate, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "RATE": rate,
        "IMAGE": image
    };
    var url = BASEURL + 'Levels/Add_Levels';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteLevel(id) {
    var response = '';
    var url = BASEURL + 'Levels/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end level ///////

////// goal ///////

async function getAllGoals() {
    var response = '';
    var url = BASEURL + 'Goals/Get_All_Goals';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleGoals(id) {
    var response = '';
    var url = BASEURL + 'Goals/Get_Goal_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateGoals(id, title, image, description) {
    var response = '';
    var data = {
        "TITLE": title,
        "IMAGE": image,
        "DESCRIPTION": description


    };
    var url = BASEURL + 'Goals/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addGoals(title, description, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "DESCRIPTION": description,
        "IMAGE": image
    };
    var url = BASEURL + 'Goals/Add_Goals_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteGoals(id) {
    var response = '';
    var url = BASEURL + 'Goals/Delete/' + id;

    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end goal ///////

////// Post ///////

async function getAllPost() {
    var response = '';
    var url = BASEURL + 'Post/Get_All_Posts';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsinglePost(id) {
    var response = '';
    var url = BASEURL + 'Post/Get_Post_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updatePost(id, title, description, tag, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "DESCRIPTION": description,
        "TAG": tag,
        "IMAGE": image,
        "FEATURED": "YES",
        "STATUS": "Active"
    };
    var url = BASEURL + 'Post/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addPost(title, description, tag, image) {
    var response = '';
    var data = {
        "TITLE": title,
        "DESCRIPTION": description,
        "TAG": tag,
        "IMAGE": image,
        "FEATURED": "YES",
        "STATUS": "Active"
    };
    var url = BASEURL + 'Post/Add_Posts_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deletePost(id) {
    var response = '';
    var url = BASEURL + 'Post/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end goal ///////

////// Recipe ///////

async function getAllRecipe() {
    var response = '';
    var url = BASEURL + 'Recipe/Get_All_Recipe';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleRecipe(id) {
    var response = '';
    var url = BASEURL + 'Recipe/Get_Recipe_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateRecipe(id, data) {
    var response = '';
    var url = BASEURL + 'Recipe/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addRecipe(data) {
    var response = '';

    var url = BASEURL + 'Recipe/Add_Recipe_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteRecipe(id) {
    var response = '';
    var url = BASEURL + 'Recipe/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end Recipe ///////


////// Exercise ///////

async function getAllExercise() {
    var response = '';
    var url = BASEURL + 'Exercises/Get_All_Exercises';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleExercise(id) {
    var response = '';
    var url = BASEURL + 'Exercises/Get_Exercise_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateExercise(id, data) {
    var response = '';
    var url = BASEURL + 'Exercises/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addExercise(data) {
    var response = '';

    var url = BASEURL + 'Exercises/Add_Exercise_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteExercise(id) {
    var response = '';
    var url = BASEURL + 'Exercises/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end Exercise ///////

////// Subscription ///////

async function getAllSubscription() {
    var response = '';
    var url = BASEURL + 'Subscription/Get_All_Subscriptions';
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function getsingleSubscription(id) {
    var response = '';
    var url = BASEURL + 'Subscription/Get_Subscriptions_Data/' + id;
    try {
        response = await axios.get(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function updateSubscription(id, data) {
    var response = '';
    var url = BASEURL + 'Subscription/Update/' + id;
    try {
        response = await axios.put(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function addSubscription(data) {
    var response = '';

    var url = BASEURL + 'Subscription/Add_Subscription_Data';
    try {
        response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await response.data;
    } catch (error) {
        return [];
    }
}

async function deleteSubscription(id) {
    var response = '';
    var url = BASEURL + 'Subscription/Delete/' + id;
    try {
        response = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.data;
    } catch (error) {
        return [];
    }
}

////// end Subscription ///////


async function changeStatus(id, path) {
    var response = '';
    var url = BASEURL + path + '/Status/' + id;
    try {
        response = await axios.post(url);
        return await response.data;
    } catch (error) {
        return [];
    }
}

export {
    login,
    getAllWorkouts,
    getSingleWorkout,
    getAllBodyparts,
    getAllEquipments,
    updateWorkout,
    deleteWorkout,
    addWorkout,
    getsinglebodypart,
    deleteBodypart,
    addBodypart,
    updatebodypart,
    getsingleEquipment,
    updateEquipment,
    addEquipment,
    deleteEquipment,
    getAllCategory,
    getsingleCategory,
    updateCategory,
    addCategory,
    deleteCategory,
    getAllTags,
    getsingleTags,
    updateTags,
    addTags,
    deleteTags,
    getAllLevel,
    getsingleLevel,
    updateLevel,
    addLevel,
    deleteLevel,
    getsingleGoals,
    updateGoals,
    addGoals,
    getAllGoals,
    deleteGoals,
    getAllPost,
    getsinglePost,
    updatePost,
    addPost,
    deletePost,
    getAllRecipe,
    getsingleRecipe,
    updateRecipe,
    addRecipe,
    deleteRecipe,
    getAllExercise,
    getsingleExercise,
    updateExercise,
    addExercise,
    deleteExercise,
    getAllUsers,
    getUserData,
    deteleuser,
    changeStatus,
    updateUser,
    getAllSubscription,
    getsingleSubscription,
    updateSubscription,
    addSubscription,
    deleteSubscription,
    BASEURL
}

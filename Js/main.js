//Setting the variables
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
//set the empty array to store all the tasks in it
let arrayOfTasks = [];
//check if there is tasks in the local storage or not
if(localStorage.getItem("tasks")){
   //Get the tasks in the local storage into the array of tasks
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
//Call the function
getDataFromLocalStorage();
//Add the tasks
submit.onclick = function(){
    //MAke sure that the element is not empty
    if(input.value !== ""){

        // Activate the add tasks function
        addTaskToTheArray(input.value);
        //Empty the input field
        input.value = "";
    }
};

//Create the delete and update controls
tasksDiv.addEventListener("click", function(e) {
    if(e.target.classList.contains("del")){
        //Remove the task from te local storage
        deleteTaskFromLocalStorageWith(e.target.parentElement.getAttribute("data-id"));
        //Remove the task from the tasks container
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("completed")){
        //function to toggle the task status in the local storage container
        toggleTaskStatusWith(e.target.parentElement.getAttribute("data-id"));
        //Toggle done class to indicate task is status
        e.target.parentElement.classList.toggle("done");
    }
});

function addTaskToTheArray(taskText) {
    //Collect the task Data
    const  task ={
        id : Date.now(),
        title : taskText,
        status: false,
    };
    //Push the task to the array
    arrayOfTasks.push(task);
    // Show the task elements in the page
    //Call the function
    showElementsOfTheTaskFrom(arrayOfTasks);
    //Call the add tasks to the local storage function
    addTasksToLocalStorageFrom(arrayOfTasks);
}

//create showElementsOfTheTaskFrom(arrayOfTasks) function

function showElementsOfTheTaskFrom(arrayOfTasks){
    //Make sure that the input field is empty
    tasksDiv.innerHTML = '';
    //Loop through the array to create an div for each task
    arrayOfTasks.forEach((task) =>{
        //create the div element
        let div = document.createElement("div");
        //give the div a class name
        div.className = "task";
        //check if the task is done already
        if(task.status){
            div.className = "task done";
        }
        //Give the element an attribute id to be able to catch it
        div.setAttribute("data-id", task.id);
        //show the task text in the element
        div.appendChild(document.createTextNode(task.title));
        //create the delete button
        let delSpan =document.createElement("span");
        delSpan.className = "del";
        delSpan.appendChild(document.createTextNode("Supprimer"));
        // append the delete span to tha div element
        div.appendChild(delSpan);
        //create completed span
        let spanCompleted = document.createElement("span");
        //give it a class
        spanCompleted.className = "completed";
        //give it a title
        spanCompleted.appendChild(document.createTextNode("Completed"));
        //append it to the div element
        div.appendChild(spanCompleted);
        // Add the div to the main page
        //create delete all button
        tasksDiv.appendChild(div);
    });
    let delAll = document.createElement("span");
    // give it class name
    delAll.className = "delete-all";
    // Name the button
    delAll.appendChild(document.createTextNode("Supprimer Tous"));
    tasksDiv.appendChild(delAll);
    delAll.onclick = function(){

        localStorage.removeItem("tasks");
        tasksDiv.innerHTML = "";
    }
}
//create addTasksToLocalStorageFrom(arrayOfTasks); function
function addTasksToLocalStorageFrom(arrayOfTasks){
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};

//Create a function to get the data from the local storage
function getDataFromLocalStorage(){
    let data = localStorage.getItem("tasks");
    if (data){
        let tasks = JSON.parse(data);
        showElementsOfTheTaskFrom(tasks);
    }
};

//Create Delete function to remove the element from the local storage
function deleteTaskFromLocalStorageWith(taskId){
    //filter the local storage to get all the data except the similar  to the chosen target element
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    //add the new data to the local storage
    addTasksToLocalStorageFrom(arrayOfTasks);
};


// //create toggleTasks statusWith function
function toggleTaskStatusWith(taskId){
    for(let i = 0 ; i < arrayOfTasks.length ; i++){
        //check if the id of the element is equal to the id of the task
        if(arrayOfTasks[i].id == taskId){

            arrayOfTasks[i].status == false ? (arrayOfTasks[i].status = true ) : (arrayOfTasks[i].status = false);
        }
    };
    addTasksToLocalStorageFrom(arrayOfTasks);
};


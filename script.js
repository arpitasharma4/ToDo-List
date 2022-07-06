// getting all required elements

const inputBox = document.querySelector(".inputfield input")
const addBtn = document.querySelector(".inputfield button")
const todoList = document.querySelector(".todolist")
const deleteAllBtn = document.querySelector(".footer button")


inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){   //if user values aren't only spaces
        addBtn.classList.add("active"); //active the add  button
    }else{
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null) {
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);  //transforming json string into a js obj
    }
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));  //transforming js object into a JSON string
    showTasks();
}

// function to add task list inside ul
function showTasks(){
    getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }

    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length;    //passing list length
    if(listArr.length > 0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})"; >X</span> </li>`
    });
    todoList.innerHTML = newLiTag;  //adding new li tag inside ul tag
    inputBox.value = "";    //once task added leave the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);

    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = [];   //empty an array
    // after delete all task again update the local storange
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}
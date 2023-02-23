
let listTask = [
    {
        "subjects":"Traveling",
        "date":"03/03/2023",
        "isDone":false
    },
    {
        "subjects":"Hicking",
        "date":"03/03/2023",
        "isDone":false
    }
]

function GetTaskFromStorage(){
    let RecievedTask = JSON.parse(localStorage.getItem("item"))
    if(RecievedTask == null){
        listTask = []
    }else{
        listTask = JSON.parse(localStorage.getItem("item"))
    }
}

GetTaskFromStorage()

function FillTaskOnThePage(){
document.querySelector("#tasks").innerHTML = ""
let DeleteIndex = 0;
for(lists of listTask){
    let content=
    `
        <!-- task -->
        <div class="task ${lists.isDone ? 'done' : ''}">
            <!-- task info -->
            <div style="width: 70%;">
                <h3>${lists.subjects}</h3>
                <div>
                    <span class="material-symbols-outlined">
                        calendar_month
                        </span>
                    <span>
                     ${lists.date}  
                    </span>
                </div>
            </div>
            <!-- task info// -->
            <!-- task action -->
            <div id="TaskAction">
                <button onclick="DeleteTask(${DeleteIndex})" id="btn1">
                    <span class="material-symbols-outlined">
                    delete
                    </span></button>

                    ${lists.isDone ? `
                            <button onclick="CompleteTask(${DeleteIndex})" style="background-color: #ffd60a" id="btn2">
                                <span class="material-symbols-outlined">
                                cancel
                                </span>
                            </button>
                    ` : `
                        <button onclick="CompleteTask(${DeleteIndex})"  id="btn2">
                        <span class="material-symbols-outlined">
                        check_box
                        </span>
                        </button>
                    `}
                <button onclick="EditTask(${DeleteIndex})" id="btn3">
                    <span class="material-symbols-outlined">
                        edit_note
                        </span>
                </button>
            </div>
            <!-- task action// -->
        </div>
`
document.querySelector("#tasks").innerHTML += content

DeleteIndex++
}
}
FillTaskOnThePage()
document.querySelector("#btn4").addEventListener("click",function(){
    let DateToday = new Date()
    let TaskDate = DateToday.getDate() + "/" + (DateToday.getMonth()+1) + "/" + DateToday.getFullYear()
   let TaskName= prompt("Please Enter your task:")
   if(TaskName){
   let TaskObj ={
    "subjects": TaskName,
    "date":TaskDate,
    "isDone":false
   }
   listTask.push(TaskObj)
   localStorageTask()
   FillTaskOnThePage()
}
})

function DeleteTask(DeleteIndex){
    let ConfirmDeleteTask = listTask[DeleteIndex]
   let IsConfirmed =  confirm("Do You Want To Delete This Task: " + ConfirmDeleteTask.subjects + "!")
   if (IsConfirmed){
    listTask.splice(DeleteIndex, 1)
    localStorageTask()
    FillTaskOnThePage()
   }
}

function EditTask(DeleteIndex){
    let NewTask = listTask[DeleteIndex]
    let NewTastkTittle = prompt("Plese Enter Your New Task:", NewTask.subjects)
    if(NewTastkTittle){
    NewTask.subjects = NewTastkTittle
    localStorageTask()
    FillTaskOnThePage()
    }
}

function CompleteTask(DeleteIndex){
    let CompleteDone = listTask[DeleteIndex]
    if(CompleteDone.isDone){
        CompleteDone.isDone = false
    }else{
        CompleteDone.isDone = true
    }
    localStorageTask()
    FillTaskOnThePage()
}

function localStorageTask(){
    let listTaskToString = JSON.stringify(listTask)
    localStorage.setItem("item",listTaskToString)
}




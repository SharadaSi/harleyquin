//---STEP BY STEP PROCESS


// Add new TO DOs using text input field

// Delete TO DOs by clicking the trash icon

// Save TO DOs to local storage so that it stays the same even after loading the page

// Remeber state of item (checked and unchecked) even after reloading the page

// Shift the checked item to the bottom of the list


//---VARIABLES

const todoForm = document.querySelector("form")
const todoInput = document.getElementById("todo-input")
const itemsListUL = document.querySelector(".items-list")
const checkBox = document.getElementsByClassName("custom-checbox")
const deleteBtn = document.getElementsByClassName("delete-btn")

let allTodos = []


//---SCRIPT

todoForm.addEventListener("submit", function(e) {

    e.preventDefault() 

    addTodo() //zavolej funkci addTodo()

})

function addTodo(){

    const todoText = todoInput.value.trim() //zachyť text z input políčka a ulož ji do proměnné TodoText

    if(todoText.length > 0){ //Pokud je text delší než 0 znaků, provede se push metoda

        allTodos.push(todoText) //Vem pole allTodos a nacpi tam output z todoText

        updateTodoList() //Zavolej tuto funkci

        createTodoItem(todoText)

        todoInput.value = "" //Text v input políčku se vymaže použitím prázdných (kalhotek :)) ) string
    } //kód se provede pouze pokud uživatel zadá nějaký text do políčka
}

function updateTodoList(){ //Jakákoliv změna v poli allTodos povede ke změne v To do listu - itemsListUL

    itemsListUL.innerHTML = "" //Vyresetuje UL v HTML, každou přibylou položkou chci totiž v to do list předělat odznova

    allTodos.forEach((todo, todoIndex)=>{ //Naplň to do list položkama z pole

        const todoItem = createTodoItem(todo, todoIndex) //První argument reprezentuje předmětnou položku to do listu a druhý argument reprezentuje pořadí iterace této položky

        itemsListUL.appendChild(todoItem) //Vem itemsListUL a přišpendli na něj nově vytvořenou todoItem
    })
}

function createTodoItem(todo){ //argument todo reprezentuje obsah nové to do položky - todoLI

    const todoLI = document.createElement("li") //vytvoř v HTML <li>

    // todoLI.innerText = todo //This makes the todoLI element display the value of todo as its visible text content.

    todoLI.className = "todo" //Ustanov class "todo"

    return(todoLI) //vrať mi <li> vytvořené v rámci proměnné todoLI
}

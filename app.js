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

let allTodos = getTodos()
console.log(allTodos)
updateTodoList()


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

        saveTodos() //Zavolej tuto funkci

        todoInput.value = "" //Text v input políčku se vymaže použitím prázdných (kalhotek :)) ) string
    } //kód se provede pouze pokud uživatel zadá nějaký text do políčka
}

function updateTodoList(){ //Jakákoliv změna v poli allTodos povede ke změne v To do listu - itemsListUL

    itemsListUL.innerHTML = "" //Vyresetuje UL v HTML, každou přibylou položkou chci totiž v to do list předělat odznova

    allTodos.forEach((todo, todoIndex)=>{ //Naplň to do list položkama z pole

        const todoItem = createTodoItem(todo, todoIndex) //První argument reprezentuje obsah předmětné položky to do listu a druhý argument reprezentuje pořadí iterace této položky

        itemsListUL.appendChild(todoItem) //Vem itemsListUL a přišpendli na něj nově vytvořenou todoItem
    })

}

function createTodoItem(todo, todoIndex){ //argument todo reprezentuje obsah nové to do položky - todoLI

    const todoId = "todo-"+todoIndex //Vytvoř proměnou, která reprezentuje ID každé nové vytvořené TodoItem
    const todoLI = document.createElement("li") //vytvoř v HTML element <li>

    // todoLI.innerText = todo // This makes the todoLI element display the value of todo as its visible text content.

    todoLI.className = "todo-item" //Ustanov classu "todo-item" ve vytvořeném HTML elementu <li>

    todoLI.innerHTML = ` 
                <input type="checkbox" name="todo-checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="var(--primary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label> 
                <label for="${todoId}" class="todo-text">
                    ${todo}
                </label>
                <button class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
                        ` //Vem proměnnou todoLI, která reprezentuje element vytvořený element LI a vraž do ní tenhle kus HTML - obsah LI

    return(todoLI) //vrať mi výstup proměnné todoLI o kterou se v této funkci jedná
}

function saveTodos() { //ulož mi každou novou to do položku todoLI do local storage

    const todosJson = JSON.stringify(allTodos) //Proměň všechny položky pole allTodos na string v JSON souboru

    localStorage.setItem("todo items", todosJson) //Ulož položky pod keyword todo items s hodnotou položek z pole allTodos
}

function getTodos() { //Nahraj uložené položky to do listu z local storage

    const loadedTodos = localStorage.getItem("todo items") || "[]" //Nahraj položky to do listu do proměnné loadedTodos, a pokud žádné k nahrání nejsou, vytvoř nové prázdné pole

    // if (!loadedTodos) {
    //     return []; // If no data exists, return an empty array
    // }

    // try {
    //     return JSON.parse(loadedTodos); // Try parsing the JSON
    // } catch (error) {
    //     console.error("Error parsing JSON from localStorage:", error);
    //     return []; // Return an empty array if parsing fails
    // }

    return JSON.parse(loadedTodos) //Promeň JSON žabáka loadedTodos zpátky na JS prince a vydej ho do placu
}
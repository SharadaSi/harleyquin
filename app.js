//---STEP BY STEP PROCESS


// Add new TO DOs using text input field

// Delete TO DOs by clicking the trash icon

// Save TO DOs to local storage so that it stays the same even after loading the page

// Remeber state of item (checked and unchecked) even after reloading the page

// Shift the checked item to the bottom of the list

//Move the new items to the top of the list


//---VARIABLES

const todoForm = document.querySelector("form")
const todoInput = document.getElementById("todo-input")
const itemsListUL = document.querySelector(".items-list")
const checkBox = document.getElementsByClassName("custom-checbox")
const deleteBtn = document.getElementsByClassName("delete-btn")


let allTodos = getTodos()
updateTodoList()


//---SCRIPT

todoForm.addEventListener("submit", function(e) {

    e.preventDefault() 

    addTodo() //kód se provede pouze pokud uživatel zadá nějaký text do políčka a submitne to
})

function animationTodo() {
    todoInput.classList.add("animation-todo-input")
    todoInput.addEventListener("animationend", ()=>{
        todoInput.classList.remove("animation-todo-input")
    })
}

function addTodo(){ //Zpracuje a pošle hodnotu z inputu do pole 

    const todoText = todoInput.value.trim() //zachyť text z input políčka a ulož ji do proměnné TodoText

    if(todoText.length > 0){ //Pokud je text delší než 0 znaků, provede se push metoda

        const todoObject = {
            text: todoText,
            completed: false
        }

        allTodos.unshift(todoObject) //Vem pole allTodos a nacpi do něj na začátek objekt todoObject

        updateTodoList() //Zavolej tuto funkci

        saveTodos() //Zavolej tuto funkci

        animationTodo()

        todoInput.value = "" //Text v input políčku se vymaže použitím prázdného stringu
    } 
}

function updateTodoList(){ //Jakákoliv změna v poli allTodos povede ke změne v To do listu - itemsListUL

    itemsListUL.innerHTML = "" //Vyresetuje UL v HTML, každou přibylou položkou chci totiž v to do list předělat odznova

    allTodos.forEach((todo, todoIndex)=>{ //Naplň to do list položkama z pole

        const todoItem = createTodoItem(todo, todoIndex) //První argument reprezentuje obsah předmětné položky to do listu a druhý argument reprezentuje pořadí iterace této položky

        itemsListUL.appendChild(todoItem) //Vem itemsListUL a přišpendli na něj nově vytvořenou todoItem
    })

}


// Inside this function, parameteters/arguments `todo` and `todoIndex` are variables that hold the values passed to the function.
function createTodoItem(todo, todoIndex){ //argument todo reprezentuje obsah nové to do položky - todoLI

    const todoId = "todo-"+ todoIndex //Vytvoř proměnou, která reprezentuje ID každé nové vytvořené TodoItem

    const todoText = todo.text
    const todoLI = document.createElement("li") //vytvoř v HTML element <li>

    // todoLI.innerText = todo // This makes the todoLI element display the value of todo as its visible text content.

    todoLI.className = "todo-item" //Ustanov classu "todo-item" ve vytvořeném HTML elementu <li>
 
    todoLI.innerHTML = ` 
                <input type="checkbox" name="todo-checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}> 
                <!--Proměnná na změnu atributu input checkboxu, podle toho jestli byl zaškrtnutý nebo ne-->
                <label class="custom-checkbox" for="${todoId}">
                    <svg fill="var(--primary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label> 
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
                        ` //Vem proměnnou todoLI, která reprezentuje element vytvořený element LI a vraž do ní tenhle kus HTML - obsah LI

    const deleteBtn = todoLI.querySelector(".delete-btn") //Zaměřím delete btn ne v původním HTML ale v HTML vytvořeném v JS

    deleteBtn.addEventListener("click", ()=>{ // Na tlačítko smazat nasaď event listener
        deleteTodoItem(todoIndex) //Proveď funkci smazat to do položku
    })

    const checkbox = todoLI.querySelector("input") // Zaměř input checboxu z HTML vytvořeného v rámci funkce createTodoItem

    checkbox.checked = todo.completed //Zaškrtnutím checkboxu přiřad vytvořené todo položce stav .completed

    checkbox.addEventListener("change", ()=> {
        allTodos[todoIndex].completed = checkbox.checked //Updatuj příslušnou položku v to do listu tak aby odpovídala stavu checkboxu

        if (checkbox.checked) { 
            
            const [completedTodo] = allTodos.splice(todoIndex, 1); //Deconstruction of array - vyextrahuj první položku pole allTodos
            allTodos.push(completedTodo); //přidej tu položku na konec pole alltodos
          }

        saveTodos()
        updateTodoList()
    })

    return(todoLI) //vrať mi výstup proměnné todoLI o kterou se v této funkci jedná
}

function saveTodos() { //ulož mi každou novou to do položku todoLI do local storage

    const todosJson = JSON.stringify(allTodos) //Proměň všechny položky pole allTodos na string v JSON souboru

    localStorage.setItem("todo items", todosJson) //Ulož položky pod keyword "todo items" s hodnotou položek z pole allTodos
}

function getTodos() { //Nahraj uložené položky to do listu z local storage

    try {

        const loadedTodos = localStorage.getItem("todo items")

        return loadedTodos ? JSON.parse(loadedTodos) : [] // Ensure an empty array if no data exists

    } catch (error) {

        console.error("Error parsing JSON from localStorage.", error)

        return []
    }
}


//FUNKCE NA SMAZÁNÍ POLOŽEK Z TODO LISTU

function deleteTodoItem(todoIndex) { 
    allTodos = allTodos.filter( ( _ ,i ) => i !== todoIndex ) //Přepiš pole allTodoes - vytvoř kopii, která vyfiltruje prvky, které neprojdou testem ve filtru.

//     The callback function inside filter() takes two parameters:
//     _ → Represents the current item in the array (not used in this  case, hence _).
//     i → Represents the index of the current item in the array.
//     Jednoduše, je to zavedený způsob jak smazat něco z pole, bez vedlejších efektů!
    saveTodos() //Novou kopii pole ulož
    updateTodoList() // Aktualizuj seznam
}



const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-select");
let todoArr; //for localStorage
$(".input-btn").on("click", function(event){
    const inputValue = document.querySelector(".input-todo").value;
    
    //prevent default behaviour of the button
    event.preventDefault();

    //create todo div
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //create li
    let newTodo = document.createElement("li");
    newTodo.classList.add("todo-li");
    newTodo.innerText = inputValue;
    todoDiv.appendChild(newTodo);
    
    //save to localStorage
    if (localStorage.getItem("todoArr") === null) {
        todoArr = [];
        todoArr.push(inputValue);
        localStorage.setItem("todoArr", JSON.stringify(todoArr));
        console.log("first if");
    } else {
        todoArr = JSON.parse(localStorage.getItem("todoArr"));
        todoArr.push(inputValue);
        localStorage.setItem("todoArr", JSON.stringify(todoArr));
        console.log("second if");
    }
    
    //create Checked button
    let newCheckedBtn = document.createElement("button");
    newCheckedBtn.classList.add("check-btn");
    newCheckedBtn.innerHTML = `<i class="fas fa-check-square fa-2x"></i>`;
    todoDiv.appendChild(newCheckedBtn);

    //create delete button 
    let newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add("delete-btn");
    newDeleteBtn.innerHTML = `<i class="fas fa-trash fa-2x"></i>`
    todoDiv.appendChild(newDeleteBtn);

    //append todoDiv
    todoList.appendChild(todoDiv);

    //clear input value after click
    document.getElementById("input-todo").value = "";

    //delete checked task
    $(".delete-btn").on("click", function(){
        $(this).parent().addClass("todo-div-deleded");
        $(this).parent().on('transitionend webkitTransitionEnd oTransitionEnd', function () {
            $(this).remove();
        });
    });

    //check task and create undo button
    $(".check-btn").on("click", function(){
        $(this).parent().find("li").addClass("li-checked");
        $(this).parent().addClass("todo-div-checked")
        $(this).addClass("btn-checked");
        
        //create undo button
        let undoBtn = document.createElement("button");
        undoBtn.classList.add("undo-btn");
        undoBtn.innerHTML = `<i class="fas fa-undo"></i>`;
        $(this).parent().append(undoBtn);
        
        //undo function
        $(".undo-btn").on("click", function () {
            const x = $(this).parent()
            x.find(".check-btn").removeClass("btn-checked");
            x.find(".todo-li").removeClass("li-checked");
            x.find(".undo-btn").remove();
            x.removeClass("todo-div-checked")
        });

        //filter todo
        $(".filter-select, .check-btn, .undo-btn").on("click", function(e) {
            if (filterOptions.value === "completed") {
                $(".todo-list").children().show();
                $(".todo-list").children()
                    .not(".todo-div-checked")
                    .hide();    
            } else if (filterOptions.value === "uncompleted") {
                $(".todo-list").children().show();
                $(".todo-list").children()
                    .filter(".todo-div-checked")
                    .hide();
            } else if (filterOptions.value === "all") {
                $(".todo-list").children().show();
            }
        });
    });
});

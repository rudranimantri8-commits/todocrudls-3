

const cl = console.log;

const form = document.getElementById("form");
const forminput = document.getElementById("forminput");
const submit = document.getElementById("submit");
const update = document.getElementById("update");
const remove = document.getElementById("remove");
const listcontainer = document.getElementById("listcontainer");


//let listArr=[{todoitem:"java",id:"12"},{todoitem:"javascript",id:"13"},]

//localStorage.setItem("listArr",JSON.stringify(listArr));

let listArr = JSON.parse (localStorage.getItem("listArr")) || [] ;

//read

function onread(ele){
    let result =``;
    ele.forEach(ele=> {
         result += ` <li class="list-group-item d-flex justify-content-between align-items-center" id="${ele.id}"> <strong> ${ele.todoitem} </strong>
                         <div>
                             <i onClick="onEdit(this)" class="fa-solid fa-2x fa-pen-to-square text-info" role="button"></i>
                             <i onClick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i>
                         </div> 
                         </li> `
    });
    listcontainer.innerHTML=result;
    }
    onread(listArr);

    //create

    function oncreate(eve){
        eve.preventDefault();
        let obj = {
            id:Date.now().toString(),
            todoitem:forminput.value,
        }
        listArr.push(obj);
        localStorage.setItem("listArr",JSON.stringify(listArr));
        form.reset();
        let li= document.createElement("li");
        li.id= obj.id;
        li.className="list-group-item d-flex justify-content-between align-items-center" ;
        
        li.innerHTML=` <strong> ${obj.todoitem} </strong>
                         <div>
                             <i onClick="onEdit(this)" class="fa-solid fa-2x fa-pen-to-square text-info" role="button"></i>
                             <i onClick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i>
                         </div>  `

    
    listcontainer.prepend(li);
}

//edit
function onEdit(ele){
    let Edit_Id = ele.closest("li").id;
    let Edit_OBJ =listArr.find(obj=>obj.id ===Edit_Id)
    forminput.value = Edit_OBJ.todoitem;
    submit.classList.add("d-none");
    update.classList.remove("d-none");
    localStorage.setItem("Edit_Id",Edit_Id)
}

//update
function onupdate(eve){
    let Edit_Id = localStorage.getItem("Edit_Id");
    let updateobj={
        id:Edit_Id,
        todoitem:forminput.value
    };

    let getIndex = listArr.findIndex(t=>t.id ===Edit_Id);
    listArr[getIndex] = updateobj;

    document
    .getElementById(Edit_Id).querySelector("strong").innerText=updateobj.todoitem    
    localStorage.setItem("listArr",JSON.stringify(listArr));
    form.reset();
    submit.classList.remove("d-none");
    update.classList.add("d-none");
    localStorage.removeItem("Edit_Id");
}
//remove

function onRemove(ele){
    let confirmation = confirm("are you suer to remove this todo");
    if(confirmation){
        let remove_id = ele.closest("li").id;
        let index = listArr.findIndex(obj=>obj.id===remove_id);
        listArr.splice(index,1);
        ele.closest("li").remove();
        localStorage.setItem("listArr",JSON.stringify(listArr));
    }
}

form.addEventListener("submit",oncreate);
update.addEventListener("click", onupdate);

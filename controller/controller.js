import { TaskOperation } from "../services/crud.js";

function init(){
  loadData();
  bindEvents();
}

function bindEvents(){
  document.querySelector('#add').addEventListener('click',addTask);
  document.querySelector('#delete').addEventListener('click',deleteForever);
  document.querySelector('#save').addEventListener('click',saveTask);
  document.querySelector('#update').addEventListener('click',updateTask);
}

window.addEventListener('load',init);

function updateTask(){
  const fields=['title','desc','date','priority'];
  fields.forEach(field=>{
    taskObj[field]=document.querySelector(`#${field}`).value;
  })
  printAllTask(TaskOperation.tasks);
  saveTask();
}

function saveTask(){
  if(localStorage){
    TaskOperation.save();
  }
  
}

function loadData(){
  if(localStorage.tasks){
    const tasks=TaskOperation.load();
    printAllTask(tasks);
  }else{
    console.log('Nothing to print');
  }
}

function deleteForever(){
  const tasks=TaskOperation.remove();
  saveTask();
  printAllTask(tasks);
}

function printAllTask(tasks){
  document.querySelector('#tbody').innerHTML='';
  tasks.forEach(task=>printTask(task));
}

function initId(){
  var count=0;
  return function (){
    count++;
    return count;
  }
}

let id=initId();
function addTask(){
  let taskObj={};
  taskObj.id=id();
  // const fields=['title','desc','date','priority'];
  taskObj.title=document.querySelector('#title').value;
  taskObj.desc=document.querySelector('#desc').value;
  taskObj.date=document.querySelector('#date').value;
  taskObj.priority=document.querySelector('#priority').value;

  const task=TaskOperation.addTask(taskObj);
  clearFields();
  printTask(task);
}

function clearFields(){
  const fields=['title','desc','date','priority'];
  fields.forEach(field=>{
    document.querySelector(`#${field}`).value='';
  })
}

function printTask(obj){
  const tbody=document.querySelector('#tbody');
  const tr=tbody.insertRow();
  for(let key in obj){
    
    const td=tr.insertCell();
    if(key=='ismarkedDeleted'){
      continue;
    }else if(key=='complete'){
      td.appendChild(createIcon('fa-regular fa-circle-check',completed,obj.id));
    }else if(key=='operation'){
      td.appendChild(createIcon('fa-solid fa-trash me-4',toggleMarkDelete,obj.id));
      td.appendChild(createIcon('fa-solid fa-pen-to-square',edit,obj.id));
    }else{
      td.innerText=obj[key];
    }
  }
}

function completed(){
  console.log('complete',this.getAttribute('task-id'));
}

function toggleMarkDelete(events){
  events.target.parentNode.parentNode.classList.toggle('table-danger');
  TaskOperation.markedDeleted(this.getAttribute('task-id'));
}

let taskObj;
function edit(){
  const fields=['title','desc','date','priority'];
  taskObj=TaskOperation.edit(this.getAttribute('task-id'));
  fields.forEach(field=>{
    document.querySelector(`#${field}`).value=taskObj[field];
  })

  console.log(taskObj);
}


function createIcon(className,fn,id){
  const icon=document.createElement('i');
  icon.className=className;
  icon.addEventListener('click',fn);
  icon.setAttribute('task-id',id);
  return icon;
}
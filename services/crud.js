import TaskModel from "../model/task-model.js"

export const TaskOperation={
  tasks:[],
  addTask(obj){
    let task=new TaskModel();
    for(let key in obj){
      task[key]=obj[key];
    }
    this.tasks.push(task);
    return task;
  },

  load(){
    // this.tasks.remove();
    const obj=JSON.parse(localStorage.tasks);
    const data=obj.data;
    data.forEach(t=>{
      const task=new TaskModel();
      task.id=t.id;
      task.date=t.date;
      task.complete=t.complete;
      task.desc=t.desc;
      task.ismarkedDeleted=t.ismarkedDeleted;
      task.operation=t.operation;
      task.priority=t.priority;
      task.title=t.title;
  
      this.tasks.push(task);
    });
    return this.tasks;
  },

  save(){
    const arr=this.tasks;
    const obj={data:arr};
    localStorage.tasks=JSON.stringify(obj);
  },

  remove(){
    return this.tasks=this.tasks.filter(task=>task.ismarkedDeleted==false);
  },

  search(id){
    return this.tasks.find(task=>task.id==id)
  },

  markedDeleted(id){
    const ans=this.search(id);
    ans.ismarkedDeleted=!ans.ismarkedDeleted;
  },

  edit(id){
    return this.search(id);
  },
}
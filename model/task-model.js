class TaskModel{
  constructor(id=0,title='',desc='',date='2000/01/01',priority='',operation=''){
    this.id=id;
    this.title=title;
    this.desc=desc;
    this.date=date;
    this.priority=priority;
    this.complete=false;
    this.operation=operation;
    this.ismarkedDeleted=false;
  }
}
export default TaskModel;


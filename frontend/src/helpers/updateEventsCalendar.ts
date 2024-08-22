import { ITaskDataBase  } from "moduleTypes";

export const updateEventsCalendar = (tasks:ITaskDataBase[])=>{
    return tasks.map((task: ITaskDataBase ) => ({
      title: task.title,
      description: task.description,
      place: task.place,
      filesDataBase: task.files,
      users: task.users,
      importance: task.importance,
      id: task.id,
      resource: task.id,
      start: new Date(task.start_date),
      end: new Date(task.due_date),
    }));}
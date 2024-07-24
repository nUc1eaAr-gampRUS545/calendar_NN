import { Task } from "moduleTypes";

export const updateEventsCalendar = (tasks:Task[])=>{
    return tasks.map((task: Task) => ({
      title: task.title,
      description: task.description,
      venue: task.venue,
      filesDataBase: task.files,
      users: task.users,
      importance: task.importance,
      id: task.id,
      resource: task.id,
      start: new Date(task.start_date),
      end: new Date(task.due_date),
    }));}
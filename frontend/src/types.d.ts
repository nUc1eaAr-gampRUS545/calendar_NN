declare module "moduleTypes" {
  type Task = {
    id: number;
    title: string;
    description?: string;
    created_at: Date;
    due_date: Date;
    updated_at?: Date;
    is_completed?: Date;
  };
  interface User {
    name: string;
    surname: string;
    email: string;
    is_active: boolean;
  }
  type LoginTrelProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };
 
  interface CRUDTaskProps {
    deleteTask: MouseEventHandler<HTMLButtonElement> | undefined;
    setEnd(date: Date | null): void;
    openDraw:boolean;
    closeDrawer:()=>void;
    startTask:Date | null | undefined;
    endTask:Date | null | undefined;
    updateStartTime:(start: Date | null) => void;
    titleTask:string;
    descriptionTask:string;
    setDescriptionTask: ChangeEventHandler<HTMLTextAreaElement> | undefined;
    updateTitleTask: ChangeEventHandler<HTMLTextAreaElement> | undefined;
    createTask:(employeeId: number) => Promise<void>;
    selectUser:number;
    buttonLabel:string;
}
}



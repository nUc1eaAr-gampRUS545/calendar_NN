declare module "moduleTypes" {
  import * as React from "react";
  type Task = {
    id: number;
    title: string;
    description?: string;
    venue: string;
    files: number[];
    users: number[];
    importance: string;
    created_at: Date;
    start_date: Date;
    due_date: Date;
    updated_at?: Date;
    is_completed?: boolean;
  };
  interface OrganizationType {
    surname?: string;
    name: string;
    id: number;
  }
  interface HandleDatasProps {
    start: Date | null | undefined;
    end: Date | null | undefined;
    id: number;
    title: string;
    venue: string;
    filesDataBase: number[];
    users: number[];
    importance: string;
    description: string | underfind;
  }
  type forms = {
    types_works_ids: number[];
    name: string;
    surname: string;
    place: string;
    start_date: Date;
    due_date: Date;
    phone: string;
    createdUser_id: number;
    responsiblePerson_id: number | underfind;
    organization_id: number | underfind;
  };
  type MounthState = {
    mounth: React.ComponentState;
    setMounth: React.ComponentState;
  };
  interface CreateApplicationPopupProps {
    open: boolean;
    onClose: () => void;
    formValues: forms;
    setValuesForms: React.Dispatch.SetStateAction<forms>;
  }
  interface BasicSelectProps {
    attributs: OrganizationType[] | string[];
    setAttribut: React.Dispatch<React.SetStateAction<number | underfind>>;
    options?: string;
    placeholder: string;
    valueProps?: string;
  }
  interface LoginAuthResponse {
    id: number;
    token: string;
  }
  interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    organization: number[];
    is_active: boolean;
  }
  type LoginTrelProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };
  interface InputProps {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string | underfind>>;
    onBlur: any;
    [key: string]: any;
  }

  interface TypeWork {
    id: number;
    description: string;
  }
  
  interface CRUDTaskProps {
    setExecutors: Dispatch<SetStateAction<number[]>>;
    setPlaceExecutionTask: Dispatch<SetStateAction<string>>;
    setWorkStatus: Dispatch<SetStateAction<string>>;
    workStatus: string;
    executors: number[];
    placeExecutionTask: string;
    taskId: number | underfind;
    setEnd(date: dayjs): void;
    setStart(date: dayjs): void;
    updateStartTime(date: dayjs): void;
    openDraw: boolean;
    filesDataBase: number[] | undefined;
    userlist: User[];
    closeDrawer: () => void;
    startTask: Date | null | undefined;
    endTask: Date | null | undefined;
    titleTask: string;
    updateTitleTask: ChangeEventHandler<HTMLTextAreaElement> | undefined;
    selectUserID: number;
    buttonLabel: string;
    description: string;
    setDescription: Dispatch<SetStateAction<string>>;
  }
  interface ApplicationDataBase {
    due_date: string;
    id: number;
    is_active: boolean;
    name: string;
    start_date: string;
    surname: string;
    createdUser_id: number,
    organization_id: number,
    responsiblePerson_id: number,
    types_works_ids:number[],
    tell:string,
    created_at: string
  }
}

declare module "moduleTypes" {
  import * as React from "react";
  interface ITaskDataBase {
    id: number;
    title: string;
    description?: string;
    place: IPlaceLMK;
    files: number[];
    users: IUser[];
    importance: string;
    created_at: Date;
    start_date: Date;
    due_date: Date;
    updated_at?: Date;
    is_completed?: boolean;
  };
  interface ITaskRequest {
    title: string;
    createdUser_id:number;
    description?: string;
    place_id: number;
    files: number[];
    users_ids: number[];
    importance: string;
    start_date: Date | null | undefined;
    due_date: Date | null | undefined;
    updated_at?: Date;
    is_completed?: boolean;
  };
  interface IOrganization {
    surname?:string;
    name: string;
    id: number;
  }
  interface HandleDatasProps {
    start: Date | null | undefined;
    end: Date | null | undefined;
    id: number;
    title: string;
    place: IPlaceLMK;
    filesDataBase: number[];
    users: IUser[];
    importance: string;
    description: string | underfind;
  }
  type IApplication = {
    types_works_ids: number[];
    name: string;
    surname: string;
    place_id: number;
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
  interface IUser {
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

  interface ITypeWork {
    id: number;
    description: string;
  }
  interface IPlaceLMK {
    id: number;
    frame: string | null;
    name: string | null;
    quntity: number | null;
    room_number: string | null;
    type_of_place: string | null;
    zone: string | null;
  }
  interface CRUDTaskProps {
    setExecutors: Dispatch<SetStateAction<number[]>>;
    setWorkStatus: Dispatch<SetStateAction<string>>;
    workStatus: string;
    executors: number[];
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
  interface IApplicationDataBase {
    due_date: string;
    id: number;
    is_active: boolean;
    name: string;
    start_date: string;
    surname: string;
    created_user: IUser;
    place:IPlaceLMK;
    organization: IOrganization;
    responsible_person: IUser;
    types_works: ITypeWork[];
    tell: string;
    created_at: string;
    is_completed: boolean;
    zone_owner_approval: boolean;
    security_approval: boolean;
    contractor_supervisor_approval: boolean;
    briefings:number[]
  }
}

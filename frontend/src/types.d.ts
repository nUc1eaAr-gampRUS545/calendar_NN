declare module "moduleTypes" {
  interface Task {
    title: string;
    start: string;
    end: string;
    taskId: string;
    employee: string; // New field for employee name
    day?: string;
  }
  type LoginTrelProps = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }
  type Person = {
    id: number;
    firstName: string;
    lastName: string;
    surname: string;
    jobTitle: string;
    offDays: number;
    group: string;
  };
  interface MounthData {
    name: string;
    dayNumber: number;
    mounthNumber: number;
  }
  interface DayElementProps {
    mounth: string;
    dayNumber: number;
    mounthNumber: number;
    peopleInvolved: Person[];
  }
  interface PopupForTascs {
    onClose: () => void;
    isOpen: boolean;
    dayNumber: number;
    mounthNumber: number;
  }
  interface DateTasc {
    day: number;
    mounth: number;
    year: number;
    hours: number;
    minutes: number;
  }
  interface TimeTasc {
    hours: number;
    minutes: number;
  }
  interface PropsCalendar {
    handleInputForm: React.Dispatch<React.SetStateAction<TimeTasc>>;
  }
  interface InputTascForm {
    label: string;
    handleInputForm: React.Dispatch<React.SetStateAction<string>>;
  }
  interface Tasc {
    taskContent: string;
    date: DateTasc;
    taskImportance: string;
  }
}

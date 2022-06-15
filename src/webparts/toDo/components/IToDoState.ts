import{ITodoModel} from '../Models/ITodoModel';
export interface IToDoState {
    todo:ITodoModel[];
    id:string;
    title: string;
    taskName:string;
    description :string;
    toDoDate : string;
    doneBy :string;
    createdBy:string;
    createdDate:string;
    formState:string;
    rows:number;
}

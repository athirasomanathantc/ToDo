import * as React from 'react';
import styles from './ToDo.module.scss';
import { IToDoProps } from './IToDoProps';
import{IToDoState} from './IToDoState';
import{} from '../Models/ITodoModel';
import { escape } from '@microsoft/sp-lodash-subset';
import{
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
 } from '@microsoft/sp-http'
import{ITodoModel}from '../Models/ITodoModel';

export default class ToDo extends React.Component<IToDoProps,IToDoState, {}> {
  constructor(props){
    super(props);
    this.state={
      todo:[],
      id:"",
      title: "",
      taskName:"",
      description :"",
      toDoDate : "",
      doneBy :"",
      createdBy:"",
      createdDate:"",
      formState:"view",
      rows:0
      }
  }
  private async fetchData(): Promise<void>{
    const url=`${this.props.siteUrl}/_api/web/list/getBtTitle('ToDo')/items`;
    this.props.context.spHttpClient.get(url,SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{
      return response.json();
      
    }).then((response)=>{
      const items : ITodoModel[] = response.value;
      this.setState{
        todo: items
      }
    });
  }
  public render(): React.ReactElement<IToDoProps> {
    
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;



    return (
      <div>
        <table>
          <thead>
          <tr>
            <th>SlNo.</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>To Do date</th>
            <th>Created By </th>
            <th>Creadted Date </th>
            <th>Done By </th>
            <th></th>
            <th> </th>
            <th> </th>
          </tr>
          </thead>
          <tbody>
            {
              this.state.todo.map((todo)=>{
                <tr>
                  <td>{todo.Title}</td>
                  <td>{todo.TaskName}</td>
                  <td>{todo.Description}</td>
                  <td>{todo.ToDoDate}</td>
                  <td>{todo.CreatedDate}</td>
                  <td>{todo.CreatedBy}</td>
                  <td><button type='button'>Edit</button></td>
                  <td><button type='button'>Delete</button></td>
                </tr>
              })
            }

          </tbody>
        </table>
      </div>
    );
  }
}

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
      rows:[{}]
      
      }
  }
  componentDidMount(): void {
    this.fetchData();
  }

  private handleAddRow(e:any){
    const createon = new Date().toLocaleString;
    const cre = this.props.context.pageContext.user.displayName;
    const item ={
      Title: "",
      Taskname:"",
      Description :"",
      ToDoDate : "",
      DoneBy :"",
      CreatedBy:createon,
      CreatedDate: ""
    };
    console.log(createon);
   
    this.setState((prevState,Props)=>{
    return {rows:[...this.state.rows,item]};
  })
    

  }

  private async fetchData(): Promise<void>{
    const url=`${this.props.siteUrl}/_api/web/lists/getByTitle('TODO')/items`;
    this.props.context.spHttpClient.get(url,SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{
      return response.json();
      
    }).then((response)=>{
      const items : ITodoModel[] = response.value;
      this.setState({
        todo: items,
        rows: items
      });
      
    }).catch((error)=>{
      console.log('error on fetching items', error);
    })
  }
  public render(): React.ReactElement<IToDoProps> {
    
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
            <th>Created Date </th>
            <th>Done By </th>
            <th></th>
            <th> </th>
            <th> </th>
          </tr>
          </thead>
          <tbody>
            {
              this.state.rows.map((todos,i)=>{
                
                return(
                <tr>
                  <td><input type="text" name="title" value={this.state.rows[i].Title} /></td>
                  <td><input type="text" name="title" value={this.state.rows[i].Taskname} /></td>
                  <td><input type="text" name="title" value={this.state.rows[i].Description} /></td>
                  <td><input type="text" name="title" value={this.state.rows[i].ToDoDate} /></td>
                  <td>{todos.CreatedDate}</td>
                  <td>{todos.CreatedBy}</td>
                  <td><button type='button'>Edit</button></td>
                  <td><button type='button'>Delete</button></td>
                </tr>);
                
              })
            }

          </tbody>
        </table>
        <button type='button' onClick={(e)=>this.handleAddRow(e)}>Add</button>
      </div>
    );
  }
}

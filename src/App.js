import React from 'react';
import './App.css';
import Table from "./components/Table";
import AddUser from "./components/AddUser";
import FiltrUser from "./components/FiltrUser";
import ShowDetails from "./components/ShowDetails";
import {URL_SMALL_DATASET,URL_BIG_DATASET, users, USER_PER_PAGE} from './components/constant';
import axios from 'axios';
class App extends React.Component{
  state = {
    users:[
        // ...users
    ],
    selectedUser:[{
      name:'',
      streetAddress: '',
      city: '',
      state: '',
      zip: '',
      description: '',
    }],
    disabled1: null,
    disabled2: null,
    isFormHidden: true,
    isDataHidden: true,
    polygonPoints:"7,0 0,14 14,14",
    field:'',
    uploadPercentage:0,
    activePage: 1,
    isTableShowed: false,
    isProgressShowed:false
  };
  totalUsers = null;
  pages = [];
  list = [];
  loadUsers = (value) =>{
    this.setState({isProgressShowed:true},
        () => {
          if(value === 'Маленький'){
            axios.get(URL_SMALL_DATASET, {
              onDownloadProgress: progressEvent => {this.setState({uploadPercentage: progressEvent.loaded})}
            })
                .then(res => {
                  this.totalUsers = res.data.length;
                  this.list = res.data;
                  this.displayPages(1, true, false, res.data)})
                .catch(err => console.log(err))
          }
          else if(value === 'Большой'){
            axios.get(URL_BIG_DATASET, {
              onDownloadProgress: progressEvent => this.setState({uploadPercentage: progressEvent.loaded })
            })
                .then(res => {
                  this.totalUsers = res.data.length;
                  this.list = res.data;
                  this.displayPages(1, false, true, res.data)
                })
                .catch(err => {console.log(err)})
          }
        })

  };
  displayPages = (pageNumber, disabled1, disabled2, users) => {
    let pagesCount = Math.ceil(this.totalUsers / USER_PER_PAGE);
    this.pages = [];
    for (let i=1; i <= pagesCount; i++){
      this.pages.push(i)
    }
    let usersPart = users.slice(USER_PER_PAGE * pageNumber - USER_PER_PAGE + 1 - 1, USER_PER_PAGE * pageNumber );
    if(disabled1 === null && disabled2 === null){
      this.setState({users: usersPart, activePage: pageNumber})
    }
    else if( (disabled1===true && disabled2 === false) || (disabled1===false && disabled2 === true)){
      this.setState({users: usersPart, disabled1: disabled1, disabled2: disabled2, isTableShowed: true, isProgressShowed:false})
    }
  };
  addUser = (array) => {
    this.list = array.concat(this.list);
    this.totalUsers += 1;
    this.displayPages(this.state.activePage, null, null, this.list)
  };
  showInfo = (...args) => {
    this.setState({selectedUser:[
        {
          name:args[0],
          streetAddress: args[1],
          city: args[2],
          state: args[3],
          zip: args[4],
          description: args[5],
        }
      ], isDataHidden: false})
  };

  searchUser = (searchedText) => {
    let regexp = new RegExp(`${searchedText.toLocaleLowerCase()}`);
    let res = [];
    for(let i=0; i < this.list.length; i++){
      if(this.list[i].id.toString().match(regexp) ||
          this.list[i].firstName.toLocaleLowerCase().match(regexp) ||
          this.list[i].lastName.toLocaleLowerCase().match(regexp) ||
          this.list[i].email.toLocaleLowerCase().match(regexp) ||
          this.list[i].phone.toLocaleLowerCase().match(regexp)){
        res.push(this.list[i]);
      }
    }
    this.setState({users:res})
  };
  cancelFiltr = () => {
    this.displayPages(this.state.activePage, null, null, this.list)
  };
  flagSort = false;
  lastColName = '';
  counter = 0;

  filtrColHelp = (field,type) => {
    switch (type) {
      case 'number':
        this.setState(prevState => ({field:field, users: prevState.users.sort( (a,b) => {
                return b[field] - a[field]}),
              polygonPoints:"0,0 14,0 7,14"}),
            () => {this.lastColName = field; this.flagSort = true});
        break;
      case 'string':
        this.setState(prevState => ({field:field, users: prevState.users.sort( (a,b) => {
                return ('' + a[field]).localeCompare(b[field])
              }), polygonPoints:"0,0 14,0 7,14"}),
            () => {this.lastColName = field; this.flagSort = true});
        break;
    }
  };
  filtrCol = (field, type) => {
    this.counter += 1;
    if(this.counter === 1 ){
      this.filtrColHelp(field, type)
    }
    else{
      if(field === this.lastColName && this.flagSort === true){
        switch (type) {
          case 'number':
            this.setState(prevState => ({field:field, users: prevState.users.sort( (a,b) => {
                    return a[field] - b[field]}),
                  polygonPoints:"7,0 0,14 14,14"}),
                () => {this.lastColName = field; this.flagSort = false});
            break;
          case 'string':
            this.setState(prevState => ({field:field, users: prevState.users.sort((a,b) => {
                      return ('' + b[field]).localeCompare(a[field])
                    }), polygonPoints:"7,0 0,14 14,14"}),
                () => {this.lastColName = field; this.flagSort = false});
            break;
        }
      }
      else if(field === this.lastColName && this.flagSort === false){
        this.filtrColHelp(field, type)
      }
      else if(field !== this.lastColName){
        this.filtrColHelp(field, type)
      }
    }
  };

  render() {
    return (
        <div className="App">
          <label>Выбирете набор данных, которые необходимо загрузить</label>
          <div>
            <button onClick={this.loadUsers.bind(this, 'Маленький')} disabled={this.state.disabled1} className='btn btn-outline-dark'>Маленький</button>
            <button onClick={this.loadUsers.bind(this, 'Большой')} disabled={this.state.disabled2} className='btn btn-outline-dark'>Большой</button>
          </div>

          <button onClick={() => this.setState({isFormHidden: !this.state.isFormHidden})} className='btn btn-outline-dark'>
            {this.state.isFormHidden ? "Добавить": "Закрыть" }</button>
          {
            this.state.isProgressShowed ?
                <div>
                  <progress max="100" value={this.state.uploadPercentage}/>
                  <span>Загружено: {this.state.uploadPercentage}</span>
                </div> : ''
          }

          {
            this.state.isFormHidden ? ""
                : <AddUser addUser={this.addUser}/>
          }
          <FiltrUser searchUser={this.searchUser}
                     cancelFiltr={this.cancelFiltr}/>
          {
            this.state.isTableShowed ? <Table filtrCol={this.filtrCol}
                                              polygonPoints={this.state.polygonPoints}
                                              field={this.state.field}
                                              selectedUser={this.state.selectedUser}
                                              users={this.state.users}
                                              showInfo={this.showInfo}
            />: " "
          }
          {
            this.state.isDataHidden ? ""
                : <ShowDetails selectedUser={this.state.selectedUser}/>
          }
          <div>
            {
              this.pages.map(p => {
                return <span style= {this.state.activePage === p ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}
                onClick={this.displayPages.bind(this, p, null, null, this.list)}>{p}</span>
              })
            }
          </div>
        </div>
    );
  }
}
export default App;

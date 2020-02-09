import React from "react";
class AddUser extends React.Component{
    state = {
        id:'',
        firstName:'',
        lastName: '',
        email: '',
        phone: '',
        address: {
            streetAddress: '',
            city: '',
            state: '',
            zip: ''
        },
        disabled:true,
    };
    flag = false;
    onInput = (e) => {
        if(e.target.name !== 'phone' && this.flag === false){
            this.setState({[e.target.name]: e.target.value})
        }
        else if(e.target.name !== 'phone' && this.flag === true){
            this.setState({[e.target.name]: e.target.value}, ()=>{
                this.state.disabled = false;
                for(let el in this.state){
                    if(this.state[el] === ''){
                        this.flag = true;
                        this.state.disabled = true;
                        return
                    }
                }
                this.setState({disabled:false})
            })
        }
        else if(e.target.name === 'phone'){
            this.setState({[e.target.name]: e.target.value}, () => {
                this.state.disabled = false;
                for(let el in this.state){
                    if(this.state[el] === ''){
                        this.flag = true;
                        this.state.disabled = true;
                        return
                    }
                }
                this.setState({disabled:false})
            });
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addUser([this.state]);
        this.setState({id:'',
            firstName:'',
            lastName: '',
            email: '',
            phone: '',
            disabled:true})
    };
   render() {
       return(
           <form className='form' onSubmit={this.onSubmit}>
               <div>
                   <label>ID</label>
                   <input type='number' name='id' value={this.state.id} onInput={this.onInput}/>
               </div>
               <div>
                   <label>firstName</label>
                   <input type='text' name='firstName' value={this.state.firstName} onInput={this.onInput}/>
               </div>
               <div>
                   <label>lastName</label>
                   <input type='text' name='lastName' value={this.state.lastName} onInput={this.onInput}/>
               </div>
               <div>
                   <label>email</label>
                   <input type='text' name='email' value={this.state.email} onInput={this.onInput}/>
               </div>
               <div>
                   <label>phone</label>
                   <input type='text' name='phone'  value={this.state.phone} onInput={this.onInput}/>
               </div>
               <button type='submit' disabled={this.state.disabled} className='btn btn-outline-dark'>Добавить в таблицу</button>
           </form>
       )
   }
}
export default AddUser
import React from "react";
class FiltrUser extends React.Component{
    state = {
        title: ""
    };
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });
    onClick1 = (e) => {
        this.props.searchUser(this.state.title);
    };
    onClick2 = (e) => {
        this.props.cancelFiltr();
        this.setState({title:''})
    };
    render() {
        return(
            <div>
                <input type='text'
                       placeholder='Введите критерий фильтрации'
                       className='form-control'
                       name = 'title'
                       value={this.state.title}
                       onChange={this.onChange}
                />
                <button className='btn btn-outline-dark'
                        name='filtr'
                        onClick={this.onClick1}>Найти</button>
                <button className='btn btn-outline-dark'
                        name='cancel'
                        onClick={this.onClick2}
                >Назад к списку пользователей</button>
            </div>
        )
    }
}
export default FiltrUser
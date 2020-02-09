import React from "react";
class ShowDetails extends React.Component{
    render() {
        return (
            <div>
                <div>
                    Выбран пользователь <b>{this.props.selectedUser[0].name}</b>
                </div>
                <div>
                    Описание:
                    <textarea value={this.props.selectedUser[0].description}/>
                </div>
                <div>
                    Адрес проживания: <b>{this.props.selectedUser[0].streetAddress}</b>
                </div>
                <div>
                    Город: <b>{this.props.selectedUser[0].city}</b>
                </div>
                <div>
                    Провинция/штат: <b>{this.props.selectedUser[0].state}</b>
                </div>
                <div>
                    Индекс: <b>{this.props.selectedUser[0].zip}</b>
                </div>
            </div>
        );
    }
}
export default ShowDetails
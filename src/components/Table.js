import React from "react";
import User from "./User";
class Table extends React.Component{
    list = [
        ['id','number'],
        ['firstName', 'string'],
        ['lastName','string'],
        ['email','string'],
        ['phone','string']
    ];
    render() {
        return(
            <table className='table'>
                <tbody>
                <tr>
                    {
                        this.list.map(el => <th onClick={this.props.filtrCol.bind(this, el[0], el[1])}>
                            <span style={{width:'28px',height:'25px'}}>{el[0]}</span>
                            {
                                this.props.field === el[0] ?
                                    <svg style={{width:'14px',height:'14px'}}>
                                        <polygon points={this.props.polygonPoints}
                                                 fill="black"/>
                                    </svg> : ''
                            }
                        </th>)
                    }
                </tr>
                {this.props.users.map( user => <User user={user}
                                                     selectedUser={this.props.selectedUser}
                                                     showInfo={this.props.showInfo}/>)}
                </tbody>
            </table>
        )
    }
}
export default Table
import React from "react";
class User extends React.Component{
    showData = () => {
        const {firstName,lastName, address, description} = this.props.user;
        this.props.showInfo(firstName+" "+lastName,
            address.streetAddress,
            address.city,
            address.state,
            address.zip,
            description)
    };
    render() {
        const {id,firstName,lastName,email,phone } = this.props.user;
        return (
            <tr onClick={this.showData}>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
            </tr>
        )
    }
}
export default User
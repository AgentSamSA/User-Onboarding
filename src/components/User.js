import React from "react";

function User(props) {
    const { details } = props;
    
    if (!details) {
        return <h3>Loading user data...</h3>
    }

    return (
        <div className="user container">
            <h2>{details.name}</h2>
            <p>Email: {details.email}</p>
            <p>Password: {details.password}</p>
            <p>Role: {details.role}</p>
        </div>
    )
}

export default User;
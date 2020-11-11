import React from "react";

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (event) => {
        event.preventDefault();
        submit();
    }

    const onChange = (event) => {
        const {name, value, type, checked} = event.target;
        const adjustedValue = type === "checkbox" ? checked : value;
        change(name, adjustedValue);
    }

    return (
        <form className="form container" onSubmit={onSubmit}>
            <div className="form-group submit">
                <h2>Add a User</h2>

                <button disabled={disabled}>Submit</button>

                <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.role}</div>
                    <div>{errors.termsOfService}</div>
                </div>
            </div>

            <div className="form-group inputs">
                <h4>User information</h4>

                <label>Name
                    <input
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    type="text"
                    />
                </label>

                <label>Email
                    <input
                    value={values.email}
                    onChange={onChange}
                    name="email"
                    type="text"
                    />
                </label>
                
                <label>Password
                    <input
                    value={values.password}
                    onChange={onChange}
                    name="password"
                    type="text"
                    />
                </label>

                <label>Role
                    <select onChange={onChange} value={values.roles} name="role">
                        <option value="">-- Select a role --</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Director">Director</option>
                    </select>
                </label>
            </div>

            <div className="form-group checkboxes">
                <label>Accept the Terms of Service
                    <input
                    type="checkbox"
                    name="termsOfService"
                    checked={values.termsOfService}
                    onChange={onChange}
                    />
                </label>
            </div>
        </form>
    )
}
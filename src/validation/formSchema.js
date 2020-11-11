import * as yup from "yup";

export default yup.object().shape({
    name: yup
        .string()
        .min(2, "Must be at least 2 characters long")
        .max(20, "Can be no more than 20 characters")
        .required("Enter a name"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Enter an email address"),
    password: yup
        .string()
        .min(8, "Must be at least 8 characters long")
        .required("Enter a password"),
    role: yup
        .string()
        .oneOf(["juniordev", "seniordev", "projectmanager", "director"], "Please select a role"),
    termsOfService: yup.boolean().oneOf([true], "Please accept the terms of service"),
})
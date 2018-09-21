import Validator from "./Validator/index";

export default {
    validators: {
        register: data => ({
            name: [Validator.validators.required, Validator.validators.min(2)],
            password: [Validator.validators.required, Validator.validators.matches(data.passwordConfirm)]
        }),
        login: data => ({
            name: [Validator.validators.required, Validator.validators.max(15)],
            password: [Validator.validators.required]
        })
    }
}

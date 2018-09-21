import Validator from "./Validator";

export default {
    validators: {
        registration: data => ({
            name: [Validator.validators.required],
            password: [Validator.validators.required, Validator.validators.matches(data.passwordConfirm)]
        })
    }
}

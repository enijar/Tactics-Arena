const cleanValue = value => String(value).trim();

const validators = {
    required: field => ({
        passed: cleanValue(field.value).length > 0,
        message: `${field.name} is required`
    }),
    matches: valueToCompare => field => ({
        passed: cleanValue(valueToCompare) === cleanValue(field.value),
        message: `${field.name}s don't match`
    })
};

export default {
    validators,
    validate(fields, rules) {
        const errors = [];

        for (let field in fields) {
            if (!fields.hasOwnProperty(field) || !rules.hasOwnProperty(field)) {
                continue;
            }

            const value = fields[field];

            for (let i = 0; i < rules[field].length; i++) {
                const {passed, message} = rules[field][i]({name: field, value});

                if (!passed) {
                    errors.push(message);
                }
            }
        }

        return {
            passed: errors.length === 0,
            errors
        }
    }
}

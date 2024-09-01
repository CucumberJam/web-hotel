import Ajv from "ajv";
import addFormats from "ajv-formats"
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
addFormats(ajv)
export const signInSchema = {
    type: "object",
    properties: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            format: 'password',
        },
    },
    required: ["name", 'email', 'password'],
    additionalProperties: false
}
const validate = ajv.compile(signInSchema);
export default validate;
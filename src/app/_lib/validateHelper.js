function isValidNationalId(id) {
    const pattern = /^[a-zA-Z0-9]{6,12}$/;
    return pattern.test(id);
}
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
function isValidPassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
    return passwordPattern.test(password);
}
function isValidFullName(name) {
    return name.length > 3;
}
function isValidPhoneNumber(phoneNumber) {
    const phonePattern = /^(?:\+\d\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;
    return phonePattern.test(phoneNumber);
}

const dictionaryValidate = {
    fullName: (data) => isValidFullName(data),
    nationalID: (data)=> isValidNationalId(data),
    email: (data)=> isValidEmail(data),
    password: (data) => isValidPassword(data),
    phone: (data) => isValidPhoneNumber(data),
}
const dictionaryErrorMessages = {
    fullName :{
        title: 'Invalid Full name',
        description: 'Length of name is between 3 and 25 characters',
        examples: 'Jon Trovolta'
    },
    nationalID: {
        title: 'Invalid national ID',
        description: 'Length of alphanumeric character (both uppercase and lowercase letters, and digits) is between 6 and 12 characters',
        examples: 'A1B2C3, 1234567890AB'
    },
    email: {
        title: 'Invalid email',
        description: '1) dot before the top-level domain;\n' +
            '2) domain should be at least 2 letters long (.com, .org);\n' +
            '3) @ symbol separating the local part from the domain part',
        examples: 'user@example.com, user.name+tag+sorting@example.com, user@sub.example.com'
    },
    password: {
        title: 'Invalid password',
        description: '1) Ensures that there is at least one letter;\n' +
            '2) Ensures that there is at least one digit;\n' +
            '3) Length is between 6 and 12 characters;\n' +
            '4) Contains only alphanumeric characters',
        examples: 'A1b@cd, A1b2C@d3, A1B@C2D#E'
    },
    phone: {
        title: 'Invalid phone',
        description: '1) Area code, which can be in parentheses or not, and is followed by an optional space, dot, or hyphen;',
        examples: '+1 123-456-7890, 123.456.7890, (123) 456-7890, 1234567890, +1 1234567890'
    },
}
export default function validateData(params){
    const errors = {};
    for(const feature in params){
        if(feature === 'nationality' || feature === 'countryFlag') continue;
        const value = params[feature];
        const func = dictionaryValidate[feature];
        const res = func(value);
        if(!res) errors[feature] = dictionaryErrorMessages[feature];
    }
    return Object.keys(errors).length > 0 ? {success: false, errors: errors}: {success: true}
}
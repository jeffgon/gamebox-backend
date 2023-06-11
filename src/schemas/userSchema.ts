import joi from 'joi';

const userSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().length(8),
    confirmPassword: joi.string().valid(joi.ref("password")).required()
});

export default userSchema;
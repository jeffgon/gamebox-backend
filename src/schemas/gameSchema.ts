import joi from 'joi';

const gameSchema = joi.object({
    title: joi.string().required(),
    genre: joi.string().required(),
    platform: joi.string().required(),
    cover_photo: joi.string().required(),
    review: joi.number().integer().min(1).max(5).required()
});

export default gameSchema;
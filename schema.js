const Joi = require('joi');



module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("",null), // URL validation
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required()
});

module.exports.reviewSchemaV = Joi.object({
    comment : Joi.string().required(),
    rating : Joi.number().min(0).max(5).required()
})
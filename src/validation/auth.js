
import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

/*export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});*/

/*export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
};*/


export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
  
export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
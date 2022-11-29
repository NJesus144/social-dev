import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().required().max(50).message('O campo "Nome" pode ter no máximo {{#limit}} caracteres.'),
  lastName: Joi.string().required().max(50).message('O campo "Sobrenome" pode ter no máximo {{#limit}} caracteres.'),
  user: Joi.string().required().max(30).message('O campo "Usuário" pode ter no máximo {{#limit}} caracteres.'),
  email: Joi.string().email({ tlds: { allow: false } }).required().max(100).message('O campo "Email" pode ter no máximo {{#limit}} caracteres.'),
  password: Joi.string().required()
  .max(50).message('O campo "Senha" pode ter no máximo {{#limit}} caracteres.')
  .min(6).message('O campo "Senha" precisa ter no mínimo {{#limit}} caracteres.'),
});

export const loginSchema = Joi.object({
  userOrEmail: Joi.string().required(),
  password: Joi.string().required()
  .max(50).message('O campo "Senha" pode ter no máximo {{#limit}} caracteres.')
  .min(6).message('O campo "Senha" precisa ter no mínimo {{#limit}} caracteres.'),
})

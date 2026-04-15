import Joi from 'joi';

export const validate = (schema, { source = 'body' } = {}) => {
  return async (req, res, next) => {
    try {
      // Récupération des données à valider (body, query, params)
      const payload = req?.[source] ?? {};

      // Validation asynchrone des données
      const value = await schema.validateAsync(payload, {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });

      // Remplacement des données originales par les données validées et nettoyées
      req[source] = value;
      return next();
    }
	catch (err) {
      return next(err);
    }
  };
};
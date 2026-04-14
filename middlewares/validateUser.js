import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('nom').isLength({ min: 2 }).withMessage('Nom invalide').trim(),
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/home', {
        title: 'Erreur',
        users: [],
        error: errors.array().map(e => e.msg).join(', ')
      });
    }
    next();
  }
];
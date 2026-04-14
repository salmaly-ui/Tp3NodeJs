// routes/index.js
import { Router } from 'express';
import { query } from '../config/db.js';

const router = Router();

// GET / – page d’accueil et liste des utilisateurs
router.get('/', async (req, res) => {
  try {
    const { rows } = await query('SELECT id, nom, prenom, email FROM utilisateurs ORDER BY id DESC LIMIT 10');
    res.render('pages/home', { title: 'Accueil', users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/home', { title: 'Erreur', users: [], error: 'Erreur serveur' });
  }
});

// POST /users – création
router.post('/users', async (req, res) => {
  const { nom, prenom, email } = req.body;
  try {
    await query(
      'INSERT INTO utilisateurs (nom, prenom, email) VALUES ($1, $2, $3)',
      [nom, prenom, email]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/home', { title: 'Erreur', users: [], error: 'Échec de création' });
  }
});

// PUT /users/:id – mise à jour
router.post('/users/:id/edit', async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email } = req.body;
  try {
    await query(
      'UPDATE utilisateurs SET nom=$1, prenom=$2, email=$3 WHERE id=$4',
      [nom, prenom, email, id]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur de mise à jour');
  }
});

// DELETE /users/:id – suppression
router.post('/users/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM utilisateurs WHERE id=$1', [id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur de suppression');
  }
});

export default router;
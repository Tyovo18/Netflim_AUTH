import { userService } from '../services/user.service.js';

export const userController = {
  // POST /users
  createUser: async (req, res, next) => {
    try {
      // req.body est déjà validé et nettoyé par validate(createUserSchema)
      const user = await userService.createUser(req.body);

      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /users
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();

      const payload = users.map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        createdAt: u.createdAt,
      }));

      return res.status(200).json(payload);
    } catch (err) {
      next(err);
    }
  },

  // GET /users/:id
  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      next(err);
    }
  },

  // PUT /users/:id
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      // req.body est déjà validé et nettoyé par validate(updateUserSchema)
      const updated = await userService.updateUser(id, req.body);

      return res.status(200).json({
        id: updated.id,
        username: updated.username,
        email: updated.email,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /users/:id
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);

      return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
      next(err);
    }
  },
};

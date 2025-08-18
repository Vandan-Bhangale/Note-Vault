const express = require('express');
const Routes = express.Router();
const userController = require('../controller/userController');

Routes.post('/login',userController.postLogin);
Routes.post('/register',userController.postRegister);
Routes.post('/createNote',userController.postNote);
Routes.get('/notes',userController.getNotes);
Routes.delete('/delete/:id',userController.deleteNote);
Routes.put('/notes/update/:id',userController.updateNote);
Routes.get('/note/:id',userController.getNoteById);
Routes.post('/logout',userController.postLogout);
Routes.get('/status',userController.getStatus);
// Routes.post('/logout',userController.postLogout);

// Routes.post('/logout',userController.postLogout);
// Routes.post('/check-auth',userController.checkAuth);

module.exports = Routes;
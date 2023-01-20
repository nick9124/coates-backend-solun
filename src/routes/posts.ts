import express from 'express';
import controller from '../controller/posts';
const router = express.Router();

router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUser);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);
router.post('/users', controller.addUser);

// router.get('/posts', controller.getPosts);
// router.get('/posts/:id', controller.getPost);
// router.put('/posts/:id', controller.updatePost);
// router.delete('/posts/:id', controller.deletePost);
// router.post('/posts', controller.addPost);

export = router;

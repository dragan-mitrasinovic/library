import express from 'express';
import { UserController } from '../controller/user.controller';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/users');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const userRouter = express.Router();

userRouter
  .route('/login')
  .post((req, res) => new UserController().login(req, res));

userRouter
  .route('/admin-login')
  .post((req, res) => new UserController().adminLogin(req, res));

userRouter.post(
  '/register',
  multer({ storage: storage }).single('image'),
  (req, res) => {
    new UserController().register(req, res);
  }
);

userRouter
  .route('/accept')
  .post((req, res) => new UserController().acceptRegistration(req, res));

userRouter
  .route('/decline')
  .post((req, res) => new UserController().declineRegistration(req, res));

userRouter
  .route('/requests/all')
  .get((req, res) => new UserController().getAllRegistrationRequests(req, res));

userRouter
  .route('/:username')
  .get((req, res) => new UserController().getByUsername(req, res));

userRouter
  .route('/change-password/:username')
  .post((req, res) => new UserController().changePassword(req, res));

export default userRouter;

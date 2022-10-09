import express from 'express';
import { request } from 'http';
import RegistrationRequest from '../model/registration-request';
import User from '../model/user';

export class UserController {
  public login = (req: express.Request, res: express.Response) => {
    User.findOne(
      { username: req.body.username, password: req.body.password },
      (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        if (user === null || user.type === 'admin') {
          res.status(401).json({ message: 'invalid' });
        } else {
          res.status(200).json({ message: 'success' });
        }
      }
    );
  };

  public adminLogin = (req: express.Request, res: express.Response) => {
    User.findOne(
      { username: req.body.username, password: req.body.password },
      (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        if (user == null || user.type !== 'admin') {
          res.status(401).json({ message: 'invalid' });
        } else {
          res.status(200).json({ message: 'success' });
        }
      }
    );
  };

  public register = (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const email = req.body.email;

    User.findOne({ $or: [{ username }, { email }] }, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      if (user != null) {
        res.status(409).json({ message: 'Username or email already in use!' });
      }

      RegistrationRequest.findOne(
        { $or: [{ username }, { email }] },
        (err, regRequest) => {
          if (err) {
            console.log(err);
            return;
          }
          if (regRequest != null) {
            res
              .status(409)
              .json({ message: 'Username or email already in use!' });
            return;
          }

          const url = req.protocol + '://' + req.get('host');
          let image;
          if (req.body.containsImage === 'true') {
            image = req.body.username;
          } else {
            image = 'default';
          }
          const newRequest = new RegistrationRequest({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            profilePicture: url + '/images/users/' + image,
          });
          newRequest.save().then(() => {
            res.status(200).json({ message: 'Success' });
          });
        }
      );
    });
  };

  public getByUsername = (req: express.Request, res: express.Response) => {
    const username = req.params.username;
    User.findOne({ username }, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(200).json(user);
    });
  };

  public changePassword = (req: express.Request, res: express.Response) => {
    const username = req.params.username;
    User.findOne({ username, password: req.body.oldPassword }, (err, user) => {
      if (err) {
        console.log(err);
        return;
      }
      if (user == null) {
        res.status(409).json({ message: 'Wrong password' });
        return;
      }

      User.updateOne(
        {
          username,
        },
        { $set: { password: req.body.newPassword } }
      )
        .then((obj) => {
          res.status(200).json({ message: 'Successfully updated password!' });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  public acceptRegistration = (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    RegistrationRequest.findOne({ username }, (err, regReq) => {
      if (err) {
        console.log(err);
        return;
      }
      const newUser = new User({
        username,
        password: regReq.password,
        firstName: regReq.firstName,
        lastName: regReq.lastName,
        address: regReq.address,
        phoneNumber: regReq.phoneNumber,
        email: regReq.email,
        type: 'user',
        booksBorrowed: 0,
        profilePicture: regReq.profilePicture,
      });
      newUser.save().then(() => {
        this.declineRegistration(req, res);
      });
    });
  };

  public declineRegistration = (
    req: express.Request,
    res: express.Response
  ) => {
    const username = req.body.username;
    RegistrationRequest.deleteOne({ username }, (err, resp) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(resp);
    });
  };

  public getAllRegistrationRequests = (
    req: express.Request,
    res: express.Response
  ) => {
    RegistrationRequest.find((err, resp) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(resp);
    });
  };
}

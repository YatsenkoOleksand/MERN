const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const uuid = require('uuid/v4');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Alex',
    email: 'test@test.com',
    password: 'testtest',
  },
  {
    id: 'u2',
    name: 'Viki',
    email: 'test@test.com',
    password: 'testtest',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }
  
  const { name, email, password } = req.body;

  const existedEmail = DUMMY_USERS.find((e) => e.email === email);

  if (existedEmail) {
    throw new HttpError(
      'Could not create an account, a user with this email is already exists',
      401
    );
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user', 401);
  }

  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT;

const User = require('../../../schemes/user.scheme');

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({ res: 'user' });
});

router.put('/register', async (req, res, next) => {
  const date = new Date();
  const passwordHash = await hashPassword(req.body.password)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash,
    image: '',
    lastConnexion: date.getTime(),
    role: 'user',
  });
  user.save()
    .then(() => res.json(user))
    .catch((e) => res.status(500).json({ error: "This user already exist" }))
})

router.post('/login', async (req, res, next) => {
  const date = new Date();
  const userMail = req?.body?.email;
  const userPass = req?.body?.password;
  
  if (!userMail || !userPass) {
    res.status(401).json({ error: 'Not right email or password' });
    return;
  }

  const userToCheck = await User.findOne({ email: userMail });
  const user = await User.findOne({ email: userMail }, {password: 0})

  if (!userToCheck) {
    res.status(401).json({ error: 'Not right email or password' });
    return;
  }

  const isPasswordValid = await comparePassword(userPass, userToCheck.password);
  if (isPasswordValid) {
    const payload = { id: userToCheck.id, email: userToCheck.email };
    const options = { expiresIn: '1d' };

    const token = jwt.sign(payload, JWT_SECRET, options)
    userToCheck.lastConnexion = date.getTime();
    userToCheck.save()
      .then(() => res.json({user, token}))
      .catch((e) => res.status(500).json({ error: "This user already exist", e }))
  } else {
    res.status(401).json({ error: 'Not right email or password' });
  }
})

router.patch('/:id', async function (req, res, next) {
  const date = new Date();
  const userId = req.params.id;
  const passwordHash = req.query.password ? await hashPassword(req.query.password) : undefined;

  const user = await User.findOne({ _id: userId });
  user.username = req.query.username ? req.query.username : user.username;
  user.email = req.query.email ? req.query.email : user.email;
  user.password = passwordHash ? passwordHash : user.password;

  user.save()
    .then(() => res.json(user))
    .catch(() => res.status(500).json({ error: "Unable to update this user" }))
});

async function hashPassword(plainPassword) {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

async function comparePassword(plainPassword, hash) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hash, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = router;
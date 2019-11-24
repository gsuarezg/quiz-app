"use strict";

const bcrypt = require("bcrypt-nodejs");
var User = require("../models/user");
var jwt = require("../services/jwt");


function saveUser(req, res) {
  let user = new User();
  let params = req.body;
  console.log(params);

  user.name = params.name;
  user.role = "PLAYER";

  if (params.password) {
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash;
      if (
        user.name !== null &&
        user.name.length > 3
      ) {
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "Error saving user." });
          } else {
            if (!userStored) {
              res
                .status(404)
                .send({ message: "The user has not registered." });
            } else {
              res.status(200).send({ user: userStored });
            }
          }
        });
      } else {
        res.status(200).send({ message: "Complete the required fields." });
      }
    });
  } else {
    res.status(500).send({ message: "Complete the password." });
  }
}

function loginUser(req, res) {
  const params = req.body;
  const name = params.name;
  const password = params.password;
  User.findOne(
    {
      name: name.toLowerCase()
    },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: "Request error." });
      } else {
        if (!user) {
          res.status(404).send({ message: "User does not exist." });
        } else {
          // comprobar la contraseña
          bcrypt.compare(password, user.password, (err, check) => {
            if (check) {
              // devolver los datos del usuario logueado
              if (params.gethash) {
                // devolver un token de jwt
                res.status(200).send({
                  token: jwt.createToken(user)
                });
              } else {
                res.status(200).send({ user });
              }
            } else {
              res
                .status(404)
                .send({ message: "The user could not login.", err });
            }
          });
        }
      }
    }
  );
}

module.exports = {
  saveUser,
  loginUser
};

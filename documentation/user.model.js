'use strict';

import crypto from 'crypto';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const authTypes = ['facebook'];

var UserSchema = new Schema({
  // name of user
  name: String,
  // email, cast to lowercase upon insertion
  email: {
    type: String,
    lowercase: true
  },
  // user roles, defaulting to 'user'
  role: {
    type: String,
    default: 'user'
  },
  // a user's collection of saved restaurants (saved in a JSON object)
  saved_restaurants: [],
  // user's password
  password: String,
  // if the user used facebook login, will be indicated here
  provider: String,
  // salt is used for security reasons
  salt: String,
  // user data returned from facebook
  facebook: {},
});

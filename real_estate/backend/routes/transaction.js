const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'armoni@Yu';



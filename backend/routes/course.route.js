const express = require('express');
const app = express();
const courseRoute = express.Router();
const mongoose = require('mongoose');
// Course model
let Course = require('../models/Course');
let File = require('../models/File');
let multer = require('multer')

// Multer File upload settings
const DIR = './public/';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf format allowed!'));
    }
  }
});

// Add Course
courseRoute.route('/create').post((req, res, next) => {

  const id = new mongoose.Types.ObjectId();

  Course.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      //data.pieces = id;
      res.json(data)
    }
  })
  /*file.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Done upload!",
      fileCreated: {
        _id: result._id,
        piece: result.file
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  });*/
});

// Get All Courses
courseRoute.route('/').get((req, res) => {
  Course.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single course
courseRoute.route('/read/:id').get((req, res) => {
  Course.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update course
courseRoute.route('/update/:id').put((req, res, next) => {
  Course.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete course
courseRoute.route('/delete/:id').delete((req, res, next) => {
  Course.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = courseRoute;

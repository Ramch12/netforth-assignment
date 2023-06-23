const express = require('express');

const router = express.Router();
const { sign_in, sign_up } = require('../controller/auth');
const { getdata, createdata, updatedata, deletedata } = require('../controller/controller');
const auth=require('../middleware/validate_token');

// sign up router
router
    .route('/sign_up')
    .post(sign_up);


// sign in router

router
    .route('/sign_in')
    .post(sign_in);


// route to create resource
router
    .route('/create')
    .post(auth,createdata);


 // router for fetch resource
router
    .route('/get')
    .get(auth,getdata);

 // router for update resource

router
    .route('/update')
    .put(auth,updatedata);


 // router for delete resource

router
    .route('/delete')
    .delete(auth,deletedata);

module.exports = router;
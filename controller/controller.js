const { connect } = require('../db/db');
const { biodata } = require('../validate/validate');
const joi = require('joi');
const {asyncHandler}=require('../utils/utils');

// function for creating the resource

exports.createdata = asyncHandler(async (req, res, next) => {
        const server = await connect();
        const { error, value } = biodata(req.body);
        if (error) return res.status(400).json({ status: 0, message: error.details[0].message });

        const [result] = await server.query('insert into biodata set ?', [value]);
        if (result.affectedRows) return res.status(201).json({ status: 1, message: "successfully created" });
})




// function for fetching the resource


exports.getdata = asyncHandler(async (req, res, next) => {
        const server = await connect();
        const data = req.query;
        const { error, value } = joi.object({ email: joi.string().email().required() }).validate(data);
        if (error) return res.status(400).json({ status: 0, message: error.details[0].message });

        const [result] = await server.query("select * from biodata where email=?", [value.email]);
        if (!result.length) return res.status(200).json({ status: 1, message: "No data found for this user" });

        return res.status(200).json({ status: 1, data: result });
});




// function for updating the resource

exports.updatedata = asyncHandler(async (req, res, next) => {

        const server = await connect();
        const data = req.query;

        const { error, value } = joi.object({ email: joi.string().email().required(), course: joi.string().min(3).max(255).required() }).validate(data);

        if (error) return res.status(400).json({ status: 0, message: error.details[0].message });

        const result = await server.query("update biodata set course=? where email=?", [value.course, value.email]);
        
        console.log(result);

        if (result[0].affectedRows) 
        {
            return res.status(201).json({ status: 1, message: "successfully updated" });
        }
})




// function for deleting the resource

exports.deletedata = asyncHandler(async (req, res, next) => {

        const server = await connect();
        const data = req.query;

        const { error, value } = joi.object({ email: joi.string().email().required() }).validate(data);

        if (error) return res.status(400).json({ status: 0, message: error.details[0].message });

        const result = await server.query("delete from  biodata where email=?", [value.email]);
       

        if (!result[0].affectedRows) return res.status(201).json({ status: 0, message: "No data is remaining to be deleted" });
       
        if (result[0].affectedRows) return res.status(201).json({ status: 1, message: "successfully deleted" });  
});
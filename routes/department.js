const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dot = require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


router.get('/',(req,res,next)=>{

  async function connectgetDB() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : process.env.USER,
        password      : process.env.PASSWORD,
        connectString : process.env.CONNECT
      });

  //select
      const result4 = await connection.execute(
        "SELECT deptno, dname FROM dept");

      //console.log(result4.rows);
      console.log(result4.rows);
      res.status(200).json({
        departments: result4.rows
      });

    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
connectgetDB();
});

router.post('/',(req,res,next)=>{

//  res.render('depts', { title: 'Please insert details' });
  async function connectpostDB() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : process.env.USER,
        password      : process.env.PASSWORD,
        connectString : process.env.CONNECT
      });


  //insert
      const result = await connection.execute(
     "INSERT INTO dept VALUES (:id, :nm,:loc)",
  { id : {val: req.body.deptno }, nm : {val: req.body.dname} , loc: {val: req.body.loc}},{autoCommit: true});

      console.log("Rows inserted: " + result.rowsAffected);

      res.status(200).json({
        departments: "Added"
      });

    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
connectpostDB();
});


module.exports= router;

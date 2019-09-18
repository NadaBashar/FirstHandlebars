const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const dot = require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


router.get('/',(req,res,next)=>{

  async function connectgetEmps() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : process.env.USER,
        password      : process.env.PASSWORD,
        connectString : process.env.CONNECT
      });

      var o = {} // empty Object
      var key = 'DEPT_EMPS';
      o[key] = ['Department'];
    //  var key2 = 'DEPT_EMPS';

    const result4 = await connection.execute(
      "SELECT  dname FROM dept");
  var content = result4.rows;
  for(dep in content){
  //select
      var i ={};
      const result5 = await connection.execute(
  "SELECT emp.ename  FROM emp join dept on emp.deptno = dept.deptno where dept.dname = :n",{n: content[dep].DNAME});
      console.log(result5.rows);
        i[content[dep].DNAME] = [content[dep].DNAME];
      i[content[dep].DNAME].push(result5.rows);
      o[key].push(i[content[dep].DNAME]);
}
      res.status(200).json({
        All: o[key]
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
connectgetEmps();
});



module.exports= router;

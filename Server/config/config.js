// //Se pide la libreria oracle
// const oracledb = require('oracledb');

// config = {
//     user: "PPI",
//     password: "123",
//     connectString: "localhost:1521",
//   };

//   //Se ejecuta la conexion
// async function Open(sql, binds, autoCommit) {
//     let conn;
//     try {
//       //Se usa la constante declarada en la primer la linea, se ejecuta la funcion de conexion y se ingresa la configuracion declara anteriormente
//       let conn = await oracledb.getConnection(config);
//       //Se ejecuta la sentencia sql
//       let result = await conn.execute(sql, binds, { autoCommit });
//       conn.release();//Se cierra la peticion
//       return result;//Se returna el resultado enviado por la bd.
//     } catch (err) {
//       console.log("Ouch!", err); //Nos muestra el error por si susece algo.
//     }
//   }
  
//   exports.Open = Open; //Se exporta la funcion open
  

var mysql = require('mysql');

var conexion = mysql.createConnection({
  host:'bnagucyl18kcsrgm8ym0-mysql.services.clever-cloud.com',
  database:'bnagucyl18kcsrgm8ym0',
  user:'uatj3gfvz68ohkny',
  password: 'QxbMhLs2fNC64IuDMabu'
});

conexion.connect(function(error){
  if(error){
    throw error;
  }else{
    console.log('Conexion exitosa');
  }
})
const { Router } = require("express");
const router = Router();
const DB = require("../config/config.js");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Ruta status 200 BUMBUM",
  });
});



router.get("/productos", async (req, res) => {
  try {
    let sql = `SELECT * FROM PRODUCTO`;
    let productoBD = [];
    let result = await DB.Open(sql, [], false);
    result.rows.map((producto) => {
      let userSchema = {
        ID_PRODUCTO: producto[0],
        NOMBRE: producto[1],
        PRECIO: producto[2],
        PESO: producto[3],
        CANTIDAD: producto[4]
      };
      productoBD.push(userSchema);
    });
    console.log(productoBD);
    res.json(productoBD);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    let sql = 'Delete from producto where id_producto = :id'
    let result = await DB.Open(sql, [id], true);
    console.log('Eliminado', result)
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})

router.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, peso, cantidad } = req.body
    let sql = 'Insert into PRODUCTO (ID_PRODUCTO,NOMBRE,PRECIO,PESO,CANTIDAD) values (id_producto.nextval,:nombre,:precio,:peso,:cantidad)'
    await DB.Open(sql, [nombre, precio, peso, cantidad], true)
    res.json({
      message: "Todo bien todo correcto y yo me que alegro",
    });
  } catch (error) {
    console.log(error)
  }
})

router.put("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const { nombre, precio, peso, cantidad } = req.body
    let sql = 'Update producto set nombre = :nombre, precio = :precio, peso =:peso, cantidad =:cantidad where id_producto =:id'
    await DB.Open(sql, [nombre, precio, peso, cantidad, id], true)
    console.log(`producto actualizado`)
  } catch (error) {
    console.log(error)
  }
})


router.get("/empleados/tipo_rh", async (req, res) => {
  try {
    let sql = `SELECT * FROM TIPO_RH`;
    let rhBD = [];
    let result = await DB.Open(sql, [], false);
    result.rows.map((rh) => {
      let userSchema = {
        ID_RH: rh[0],
        NOMBRE: rh[1],
      };
      rhBD.push(userSchema);
    });
    console.log(rhBD);
    res.json(rhBD);
  } catch (error) {
    console.log(error);
  }
});

router.get("/empleados/tipo_empleado", async (req, res) => {
  try {
    let sql = `SELECT * FROM TIPO_EMPLEADO`;
    let tipoEmpleadoBD = [];
    let result = await DB.Open(sql, [], false);
    result.rows.map((tipoEmpleado) => {
      let userSchema = {
        ID_TIPO_EMPLEADO: tipoEmpleado[0],
        NOMBRE: tipoEmpleado[1],
      };
      tipoEmpleadoBD.push(userSchema);
    });
    console.log(tipoEmpleadoBD);
    res.json(tipoEmpleadoBD);
  } catch (error) {
    console.log(error);
  }
});

router.get("/empleados", async (req, res) => {
  try {
    let sql = `SELECT E.ID_EMPLEADO,E.CEDULA,E.PRIMER_NOMBRE,E.SEGUNDO_NOMBRE,E.PRIMER_APELLIDO,E.SEGUNDO_APELLIDO,
    E.CORREO,E.TELEFONO,E.FECHA_DE_NACIMIENTO,E.SALARIO,E.EPS,E.GENERO,E.TELEFONO_EMERGENCIA,
    RH.NOMBRE as NOMBRE_RH,TE.NOMBRE AS NOMBRE_TIPO_EMPLEADO FROM EMPLEADO E INNER JOIN TIPO_RH RH ON E.ID_RH = RH.ID_RH 
    INNER JOIN TIPO_EMPLEADO TE ON E.ID_TIPO_EMPLEADO = TE.ID_TIPO_EMPLEADO`;
    let empleadoBD = [];
    let result = await DB.Open(sql, [], false);
    result.rows.map((empleado) => {
      let userSchema = {
        ID_EMPLEADO: empleado[0],
        CEDULA: empleado[1],
        PRIMER_NOMBRE: empleado[2],
        SEGUNDO_NOMBRE: empleado[3],
        PRIMER_APELLIDO: empleado[4],
        SEGUNDO_APELLIDO: empleado[5],
        CORREO: empleado[6],
        TELEFONO: empleado[7],
        FECHA_DE_NACIMIENTO: empleado[8],
        SALARIO: empleado[9],
        EPS: empleado[10],
        GENERO: empleado[11],
        TELEFONO_EMERGENCIA: empleado[12],
        NOMBRE_RH: empleado[13],
        NOMBRE_TIPO_EMPLEADO: empleado[14]
      };
      empleadoBD.push(userSchema);
    });
    console.log(empleadoBD);
    res.json(empleadoBD);
  } catch (error) {
    console.log(error);
  }
});

router.post("/empleados", async (req, res) => {
  try {
    const { cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, contrasena, telefono, fechaNacimiento, salario, eps, genero, telefonoEmergencia, idRh, idTipoEmpleado } = req.body;
    //Se modifica la contraseña enviada
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(contrasena, salt);
    console.log('fechaNAcimiento', fechaNacimiento);
    sql = `insert into EMPLEADO(ID_EMPLEADO,CEDULA,PRIMER_NOMBRE,SEGUNDO_NOMBRE,PRIMER_APELLIDO,SEGUNDO_APELLIDO,CORREO,CONTRASEÑA,TELEFONO,FECHA_DE_NACIMIENTO,SALARIO,EPS,GENERO,TELEFONO_EMERGENCIA,ID_RH,ID_TIPO_EMPLEADO) 
    VALUES (id_empleado.nextval,:cedula,:primerNombre,:segundoNombre,:primerApellido,:segundoApellido,:correo,:hashPassword,:telefono,TO_DATE(:fechaNacimiento,'yyyy/mm/dd'),:salario,:eps,:genero,:telefonoEmergencia,:idRh,:idTipoEmpleado)`
    await DB.Open(sql, [cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, hashPassword, telefono, fechaNacimiento, salario, eps, genero, telefonoEmergencia, idRh, idTipoEmpleado], true);
    res.json({
      message: "Todo bien todo correcto y yo me que alegro",
    });
  } catch (error) {
    console.log('error', error)
  }
})

router.put("/empleados/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const { cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono, fechaNacimiento, salario, eps, genero, telefonoEmergencia, idRh, idTipoEmpleado } = req.body;
    let sql = `Update empleado set CEDULA=:cedula, PRIMER_NOMBRE = :primerNombre, SEGUNDO_NOMBRE = :segundoNombre, PRIMER_APELLIDO =:primerApellido, SEGUNDO_APELLIDO =:segundoApellido, CORREO=:correo,TELEFONO=:telefono, FECHA_DE_NACIMIENTO=TO_DATE(:fechaNacimiento,'yyyy/mm/dd'),SALARIO=:salario,EPS=:eps, GENERO=:genero,TELEFONO_EMERGENCIA=:telefonoEmergencia,ID_RH=:idRh, ID_TIPO_EMPLEADO=:idTipoEmpleado  where ID_EMPLEADO =:id`
    await DB.Open(sql, [cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono, fechaNacimiento, salario, eps, genero, telefonoEmergencia, idRh, idTipoEmpleado, id], true)
    console.log(`empleado actualizado`)
  } catch (error) {
    console.log(error)
  }
})

router.delete("/empleados/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    let sql = 'Delete from empleado where id_empleado = :id'
    let result = await DB.Open(sql, [id], true);
    console.log('Eliminado', result)
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})

router.get("/proveedores", async(req, res) =>{
  try {
    let sql = `SELECT * FROM PROVEEDOR`;
    let proveedorBD = [];
    let result = await DB.Open(sql, [], false);
    result.rows.map((proveedor) => {
      let userSchema = {
        ID_PROVEEDOR: proveedor[0],
        NOMBRE: proveedor[1],
        DIRECCION: proveedor[2]
      };
      proveedorBD.push(userSchema);
    });
    console.log(proveedorBD);
    res.json(proveedorBD);
  } catch (error) {
    console.log('Error',error)
  }
})


router.post("/proveedores", async (req, res) => {
  try {
    const { nombre, direccion } = req.body
    let sql = 'insert into proveedor(ID_PROVEEDOR, NOMBRE, DIRECCION) values (id_proveedor.NEXTVAL,:nombre, :direccion)';
    await DB.Open(sql, [nombre, direccion], true)
    res.json({
      message: "Todo bien todo correcto y yo me que alegro",
    });
  } catch (error) {
    console.log(error)
  }
})

router.put("/proveedores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const { nombre, direccion } = req.body
    let sql = 'Update proveedor set nombre = :nombre, direccion = :direccion where id_proveedor =:id'
    await DB.Open(sql, [nombre, direccion,id], true)
    console.log(`proveedor actualizado`)
  } catch (error) {
    console.log(error)
  }
})


router.delete("/proveedores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    let sql = 'Delete from proveedor where id_proveedor = :id'
    let result = await DB.Open(sql, [id], true);
    console.log('Eliminado', result)
    res.json(result)
  } catch (error) {
    console.log(error)
  }
})

router.post("/register", async (req, res) => {
  //Se recibe la informaciond del frontend
  const {
    usuario,
    nombre1,
    nombre2,
    apellido1,
    apellido2,
    email,
    password,
    password2,
  } = req.body;
  //Se comparan las contraseñas enviadas por el frontend
  if (password !== password2)
    return res
      .status(400)
      .json({ msg: "Contraseña y confirmar contraseña son incorrectos." });

  //Se modifica la contraseña enviada
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  //Se crea el usuario en la bd.
  sql =
    "INSERT INTO usuarios(id_usuario,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,correo,contrasena,usuario) VALUES (id_usuario.nextval,:nombre1,:nombre2,:apellido1,:apellido2,:email,:hashPassword,:usuario)";
  try {
    await DB.Open(
      sql,
      [nombre1, nombre2, apellido1, apellido2, email, hashPassword, usuario],
      true
    );

    res.json({
      message: "Todo bien todo correcto y yo me que alegro",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

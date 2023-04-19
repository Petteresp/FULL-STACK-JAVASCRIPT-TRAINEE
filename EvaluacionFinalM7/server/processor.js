// FORMA DE CONECTAR CON CLIENTE
// const { Client } = require('pg');
// const conectionString =  'postgresql://postgres:root@127.0.0.1:5432/ventas';
// const client = new Client({
//     connectionString: conectionString
// }); 
// client.connect();

const { Pool } = require('pg');
const Cursor = require('pg-cursor');

const conectionString =  'postgresql://postgres:root@127.0.0.1:5432/paises_evaluacion';
const pool = new Pool({connectionString:conectionString});

const client = new Pool({connectionString:conectionString});
var cursor = null;  
client.connect();

module.exports = {

    get: async (req,res) => {

        if (client == null){
            client = await pool.connect(); 
        }

        // cabeceras
        const headers = {

            // "Content-Type": "text/plain;charset=UTF-8, application/json;charset=UTF-8",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
            "Access-Control-Max-Age": 2592000, // 30 days
            "Cache-Control": "no-cache"

        };
          
        let baseURL = 'http://' + req.headers.host + '/';
        let reqUrl = new URL(req.url,baseURL);
        
        switch (req.method) {

            case 'OPTIONS':

                res.writeHead(204, headers);
                res.end();
                break;

            case 'GET': 

            if (reqUrl.pathname.includes("/favicon.ico")){
                res.end();
            }else{

                let registros = 5;
                if (reqUrl.searchParams.get('registros')){
                    registros = reqUrl.searchParams.get('registros');
                }

                cliente = await pool.connect();

                let sql = "SELECT paises.*, pib.pib_2019, pib_2020 ";
                sql += "FROM paises, paises_pib pib "; 
                sql += "WHERE paises.nombre = pib.nombre;"

                // console.log(cursor);

                if(cursor == null){
                     cursor = cliente.query(new Cursor(sql))
                }
                // console.log(cursor);
            
            
                cursor.read(registros, async (err, rows) => {
                    
                    if (err) { throw err }
                    
                    // reiniciando si se llego al final
                    if(rows.length === 0){ 
                        cursor.close();
                        cursor = null;
                    }
                    
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(rows));
                    cliente.release();
                })
                
            }
                
            break;

            case 'POST':
                
                
                let body = [];
                req.on('data', (chunk) => {
                  body.push(chunk);
                }).on('end', async () => {
                    

                    const contentType = (req.headers['content-type']);
                    
                    body = Buffer.concat(body).toString();
                    
                    if ( contentType === 'application/x-www-form-urlencoded'){
                        // Si la data es enviada por un formulario, la agregamos al body
                        const data = decodeURIComponent(body);
                        body = parametros(data);
                        
                    }else{
                        // Si la data en el cuerpo del mensaje, lo leemos y agregamos al body
                        body = JSON.parse(body);
                       
                    }

                    console.log(body);

                    // Leemos las variables obtenidas en el body
                    const nombre = body.nombre.trim();
                    const continente = body.continente.trim();
                    const poblacion = parseInt(body.poblacion);
                    const pib_2019 = parseInt(body.pib_2019);
                    const pib_2020 = parseInt(body.pib_2019);

                    console.log(body);
                    try {

                        // INICIANDO LA TRANSACCIÓN
                        console.log('[BEGIN]')
                        await client.query('BEGIN')

                        // CONSULTAR SI EXISTE EL PAÌS
                        sql = "SELECT * FROM paises WHERE LOWER(nombre) = LOWER($1)";
                        result = await client.query(sql,[nombre]);
                        // si el país existe devolvemos el error
                        if (result.rowCount > 0 ){throw {message:"EL PAÍS YA EXISTE"};}
                        // de lo contrario se agrega el país
                        console.log("PAIS AGREGADO");

                        // INSERTAR LA ORDEN EN LA BASE DE DATOS
                        sql = "INSERT INTO paises (nombre, continente, poblacion) VALUES ($1, $2, $3)";
                        result = await client.query(sql,[nombre,continente,poblacion]);
                        console.log("PAIS AGREGADO");

                        // INSERTAR EL PIB
                        sql = "INSERT INTO paises_pib (nombre, pib_2019, pib_2020) VALUES ($1, $2, $3)";
                        result = await client.query(sql,[nombre,pib_2019, pib_2020]);
                        console.log("PRODUCTO INTERNO BRUTO AGREGADO: ");

                        // CONSULTAR SI EXISTE EL PAIS EN paises_data_web 
                        sql = "SELECT FROM paises_data_web WHERE LOWER(nombre_pais) = LOWER($1)";
                        result = await client.query(sql,[nombre]);

                        if (result.rowCount > 0) {
                            sql = "UPDATE paises_data_web SET accion = ($1) WHERE LOWER(nombre_pais) = LOWER($2)";
                            result = await client.query(sql,[1,nombre]);
                            console.log("ACCIÓN ACTUALIZADA")
                        } else {
                            // INSERTAR DATA WEB
                            sql = "INSERT INTO paises_data_web (nombre_pais, accion) VALUES ($1, $2)";
                            result = await client.query(sql,[nombre,1]);
                            console.log("ACCION INSERTADA");
                        }

                        // TERMINANDO LA TRANSACCIÓN
                        console.log('[COMMIT]')
                        await client.query('COMMIT')
                    } catch (error) {
                        console.log(error);
                        console.log(' [ROLLBACK] ' + error.message);
                        await client.query('ROLLBACK')
                    }finally{
                        console.log('FIN DE LA TRANSACCIÓN')
                        res.writeHead(200, headers);
                        res.end('FIN DE LA TRANSACCIÓN');
                    }
                  
                });

                break;

            case 'DELETE':
                
                res.writeHead(200, headers);
                
                    
                if(reqUrl.searchParams.get('nombre')){

                    const nombre = reqUrl.searchParams.get('nombre');
                    del = borrar('pais',nombre);

                }


                if(typeof del !== 'undefined'){
                    del.then(result => {
                        
                        if(result.deleted){
                            res.writeHead(200, headers);
                            res.end(JSON.stringify(result));
                        }else{
                            res.writeHead(200, headers);
                            res.end(JSON.stringify(result));
                        }

                    });

                }else{
                    res.writeHead(200, headers);
                    res.end(JSON.stringify({result:"error",details:"no data for delete"}));
                }
                    
                
                break;

            default:
                
                res.end(JSON.stringify({error:req.method + 'not supported'}));
                break;

        }

    }
}


function parametros(body){

    
    let campos = body.split('&');
    let parametros = {};    
    
    campos.forEach(campo => {
        key = campo.split("=")[0];
        value = campo.split("=")[1];
        parametros[key] = value;
    })
    
    return parametros;
}


async function borrar(filter,...values) {
    
    if (filter === 'pais') {
        const nombre = values[0]; 

        try {

            // INICIANDO LA TRANSACCIÓN
            console.log('[BEGIN]')
            await client.query('BEGIN')

            // BUSCANDO SI EL PAÍS EXISTE
            sql = "SELECT * FROM paises WHERE LOWER(nombre) = LOWER($1)";
            result = await client.query(sql,[nombre]);

            if(result.rowCount < 1){throw {message:"PAÍS NO EXISTE"};}

            console.log("PAIS ENCONTRADO");
                

            // ELIMINANDO EL PAIS DE LA TABLA PIBS
            sql = "DELETE FROM paises_pib WHERE LOWER(nombre) = LOWER($1)";
            result = await client.query(sql,[nombre]);
            console.log("PIBs ELIMINADOS");

            // ELIMINANDO EL PAIS DE LA TABLA PIBS
            sql = "DELETE FROM paises WHERE LOWER(nombre) = LOWER($1)";
            result = await client.query(sql,[nombre]);
            console.log("PAIS ELIMINADO");

            // CONSULTAR SI EXISTE EL PAIS EN paises_data_web 
            sql = "SELECT FROM paises_data_web WHERE LOWER(nombre_pais) = LOWER($1)";
            result = await client.query(sql,[nombre]);

            if (result.rowCount > 0) {
                sql = "UPDATE paises_data_web SET accion = ($1) WHERE LOWER(nombre_pais) = LOWER($2)";
                result = await client.query(sql,[0,nombre]);
                console.log("ACCIÓN ACTUALIZADA")
            } else {
                // INSERTAR DATA WEB
                sql = "INSERT INTO paises_data_web (nombre_pais, accion) VALUES ($1, $2)";
                result = await client.query(sql,[nombre,0]);
                console.log("ACCION INSERTADA");
            }
            
            // TERMINANDO LA TRANSACCIÓN
            console.log('[COMMIT]')
            await client.query('COMMIT')
        } catch (error) {
            console.log(error);
            console.log(' [ROLLBACK] ' + error.message);
            await client.query('ROLLBACK')
            return({deleted:false,result:"error",details:`no se pudo eliminar el país`});

        }finally{
            console.log('FIN DE LA TRANSACCIÓN')
            // res.end('FIN DE LA TRANSACCIÓN');
            // res.writeHead(200, headers);
            return({deleted:true,result:"success",details:`el país fue eliminado exitosamente`})

        }
        
    }

}
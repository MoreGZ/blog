const mysql = require('mysql')

module.exports = class Database {
    constructor(config) {
        this.pool  = mysql.createPool({
            connectionLimit : config.connectionLimit,
            host            : config.host,
            user            : config.user,
            password        : config.password,
            database        : config.database
        });
    }

    list() {

    }

    update() {

    }

    delete() {

    }

    add() {

    }

    query() {
        
    }

    query(sql) {
        return (new Promise((resolve, reject) => {
            this.pool.getConnection(function(err, connection) {
                // not connected!
                if (err) {
                    reject(err)

                    throw err
                } 
                
                // Use the connection
                connection.query(sql, function (error, results, fields) {    
                    // When done with the connection, release it.
                    connection.release();
                
                    // Handle error after the release.
                    if (error) {
                        reject(error)

                        throw error
                    }
                
                    // Don't use the connection here, it has been returned to the pool.
                    resolve({
                        results,
                        fields
                    })
                });
            });
        }))
    }   
}
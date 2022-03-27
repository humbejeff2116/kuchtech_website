


module.exports = function connectToMongodb(ODM, connect, configurations) {

    if (!connect) {
        
        return ;
        
    }

    if(typeof configurations !== 'object') throw new Error('functions second arguments should be an object')

    ODM.connect(configurations.dbURI, configurations.dbOptions, (err, conn)=> {

        if(err) throw err;

        console.log(`connection to database established`);

    })

}
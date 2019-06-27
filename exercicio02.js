const sql = 'create   table autor(id number, name string,   age   number, city  string,state string, country string  ) ';

const sqlRegex = /^create\s+table\s+(\w+)\s*\((.+)\)\s*$/;
const columnRegex = /^\s*(\w+)\s+(\w+)\s*$/;

const sqlMatches = sqlRegex.test(sql);


if (sqlMatches) {
    const sqlExec = sqlRegex.exec(sql);
    
    const columns = {};
    const tableName = sqlExec[1];
    const columnsDescription = sqlExec[2].split(",");


    for(const columnDescription of columnsDescription) {
        const columnMatches = columnRegex.test(columnDescription);
        
        if (columnMatches) {
            const columnExec = columnRegex.exec(columnDescription);
            
            const columnName = columnExec[1];
            const columnType = columnExec[2];
            
            columns[columnName] = columnType;
        }
    }
    

    const database = {};
    const tables = database.tables = {};

    tables[tableName] = {};
    tables[tableName].columns = columns;
    tables[tableName].data = [];

    console.log(JSON.stringify(database, null, 2));

}


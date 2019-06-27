const sql = 'create   table  autor(id number, name string,   age   number, city  string,state string, country string  ) ';

const sqlRegex = /^create\s+table\s+(\w+)\s*\((.+)\)\s*$/;
const columnRegex = /^\s*(\w+)\s+(\w+)\s*$/;

const sqlMatches = sqlRegex.test(sql);

if (sqlMatches) {
    const sqlExec = sqlRegex.exec(sql);
    console.log(sqlExec);

    const tableName = sqlExec[1];
    const columnsDescription = sqlExec[2].split(",");

    console.log("Table name:", tableName);

    console.log("Columns:");
    for(const columnDescription of columnsDescription) {
        const columnMatches = columnRegex.test(columnDescription);
        
        if (columnMatches) {
            const columnExec = columnRegex.exec(columnDescription);

            const columnName = columnExec[1];
            const columnType = columnExec[2];

            
            console.log(columnName, columnType);
        }

    }

}

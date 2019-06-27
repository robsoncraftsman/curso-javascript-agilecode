const DatabaseError = function(statement, message) {
    this.statement = statement;
    this.message = message;
}

DatabaseError.prototype.toString = function() {
    return `${this.message}: '${this.statement}'`;
}

const InvalidDatabaseStatement = function(statement) {
    DatabaseError.call(this, statement, "Syntax Error");
};

InvalidDatabaseStatement.prototype = Object.create(DatabaseError.prototype);
InvalidDatabaseStatement.prototype.name = "InvalidDatabaseStatement";
InvalidDatabaseStatement.prototype.constructor = InvalidDatabaseStatement;

class StatementParser {
    constructor(statementRegex) {
        this.statementRegex = statementRegex;
    }
    
    isValidStatement(statement) {
        return this.statementRegex.test(statement);
    }

    parse(statement) {
        const statementExec = this.statementRegex.exec(statement);
        
        if (statementExec) {
            return this._parse(statementExec);
        } else {
            throw new InvalidDatabaseStatement(statement);
        }
    }
};

class CreateTableStatementParser extends StatementParser {
    constructor() {
        super(/^create\s+table\s+(\w+)\s*\((.+)\)\s*$/);
        this.columnRegex = /^\s*(\w+)\s+(\w+)\s*$/;
    }

    _parse(statementExec) {
        const columns = {};

        const tableName = statementExec[1];
        const columnsDescription = statementExec[2].split(",");


        for(const columnDescription of columnsDescription) {
            const columnMatches = this.columnRegex.test(columnDescription);
            
            if (columnMatches) {
                const columnExec = this.columnRegex.exec(columnDescription);
                
                const columnName = columnExec[1];
                const columnType = columnExec[2];
                
                columns[columnName] = columnType;
            } else {
                throw new InvalidDatabaseStatement(statement);
            }
        }

        return {tableName, columns};
    }
};

class InsertStatementParser extends StatementParser {
    constructor() {
        super(/^insert\s+into\s+(\w+)\s*\((.+)\)\s+values\s*\((.+)\)\s*$/);
    }

    _parse(statementExec) {
        const tableName = statementExec[1];
        const columns = statementExec[2].split(",");
        const values = statementExec[3].split(",");

        if (columns.length !== values.length) {
            throw new InvalidDatabaseStatement(statement);
        }

        const row = {};

        for (let i=0; i < columns.length; i++) {
            const columnName = columns[i].trim();
            const columnValue = values[i].trim();

            row[columnName] = columnValue;
        }

        return {tableName, row};
    }

};

class SelectStatementParser extends StatementParser {
    constructor() {
        super(/^select\s+(.+)\s+from\s+(\w+)(?:\s+where\s+(.+)\s*)?/);
    }

    _parse(statementExec) {
        const columns = statementExec[1].split(",").map(s => s.trim());
        const tableName = statementExec[2];
        const whereStatement = statementExec[3];
        let where;
        if (whereStatement) {
            const whereArray = whereStatement.split("=").map(s => s.trim());
            where = {column: whereArray[0], value: whereArray[1]};
        }

        return {tableName, columns, where}
    }
};


class DeleteStatementParser extends StatementParser {
    constructor() {
        super(/^delete\s+from\s+(\w+)(?:\s+where\s+(.+)\s*)?/);
    }
    
    _parse(statementExec) {
        const tableName = statementExec[1];
        const whereStatement = statementExec[2];
        let where;
        if (whereStatement) {
            const whereArray = whereStatement.split("=").map(s => s.trim());
            where = {column: whereArray[0], value: whereArray[1]};
        }

        return {tableName, where}
    }
};

const Table = function(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
    this.data = [];
};

Table.prototype.insert = function(statementData) {
    const row = statementData.row;
    this.data.push(row);
};

Table.prototype.select = function(statementData) {
    const columns = statementData.columns;
    const where = statementData.where;

    const selectedData = [];
    this.data.forEach(function(row) {
        if (where === undefined || row[where.column] === where.value) {
            const resultRow = {};
            columns.forEach(columnName => resultRow[columnName] = row[columnName]);
            selectedData.push(resultRow);
        }
    });
    return selectedData;
};

Table.prototype.delete = function(statementData) {
    const where = statementData.where;
    if (where) {
        this.data = this.data.filter(function(row) {
            return (row[where.column] !== where.value);
        });
    } else {
        this.data = [];
    }
};

const Database = function(databaseName) {
    this.databaseName = databaseName;
    this.tables = {};

    const statementMap = new Map([
        ["createTable", new CreateTableStatementParser()],
        ["insert", new InsertStatementParser()],
        ["select", new SelectStatementParser()],
        ["delete", new DeleteStatementParser()]
    ]);

    this.parseStatement = function(statement) {
        for (let [command, parser] of statementMap) {
            if (parser.isValidStatement(statement)) {
                const statementData = parser.parse(statement);
                return {
                    command,
                    data: statementData
                }
            }
        }
    };
};

Database.prototype = {

    createTable: function(statementData) {
        const table = new Table(statementData.tableName, statementData.columns);
        this.tables[table.tableName] = table;
    },

    executeTableStatement: function(statementData, fn) {
        const tableName = statementData.tableName;
        const table = this.tables[tableName];
        
        if (table !== undefined) {
            return fn.call(table, statementData);
        } else {
            throw `Table "${tableName}" doens't exists`;
        }
    },

    insert: function(statementData) {
        this.executeTableStatement(statementData, Table.prototype.insert);
    },

    select: function(statementData) {
        return this.executeTableStatement(statementData, Table.prototype.select);
    },

    delete: function(statementData) {
        this.executeTableStatement(statementData, Table.prototype.delete);
    },
    
    execute: function(statement) {
        const parsedStatement = this.parseStatement(statement);
        if (parsedStatement) {
            try {
                return this[parsedStatement.command](parsedStatement.data);
            } catch (e) {
                throw new DatabaseError(statement, e);
            }
        } else {
            throw new InvalidDatabaseStatement(statement);
        }
    }
};

try {
    const database = new Database("Books"); 
    database.execute("create   table author(id number, name string,   age   number, city  string,state string, country string  ) ");
    database.execute("insert   into author ( id, name,   age) values   (1, Douglas Crockford, 62  )");
    database.execute("insert into  author (id, name, age) values (2, Linus Torvalds, 47)");
    database.execute("insert into author     (id, name, age)    values   (3, Martin Fowler, 54)   ");
    console.log(database.execute("select  name from  author "));
    console.log(database.execute("select id, name , age  from author  where id  =  1 "));
    database.execute("delete from author where id = 2");
    console.log(database.execute("select  id, name , age from  author "));
    database.execute("delete from author");
    console.log(database.execute("select  name from  author "));
    console.log(JSON.stringify(database, null, 2));
} catch (e) {
    console.log(e.toString());
}
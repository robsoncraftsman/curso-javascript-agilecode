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

const Table = function(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
    this.data = [];
};

Table.prototype.insert = function(row) {
    this.data.push(row);
};

Table.prototype.select = function(columns, where) {
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

Table.prototype.delete = function(where) {
    if (where) {
        this.data = this.data.filter(function(row) {
            return (row[where.column] !== where.value);
        });
    } else {
        this.data = [];
    }
}

const CreateStatement = function() {
    this.startStatementRegex = /^create\s+table/;
    this.statementRegex = /^create\s+table\s+(\w+)\s*\((.+)\)\s*$/;
    this.columnRegex = /^\s*(\w+)\s+(\w+)\s*$/;
};

CreateStatement.prototype.isValidStatement = function(statement) {
    return this.startStatementRegex.test(statement);
};

CreateStatement.prototype.execute = function(statement) {
    const statementMatches = this.statementRegex.test(statement);
    
    if (statementMatches) {
        const columns = {};

        const statementExec = this.statementRegex.exec(statement);

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

        return new Table(tableName, columns);
    } else {
        throw new InvalidDatabaseStatement(statement);
    }
};

const InsertStatement = function() {
    this.startStatementRegex = /^insert\s+into/;
    this.statementRegex = /^insert\s+into\s+(\w+)\s*\((.+)\)\s+values\s*\((.+)\)\s*$/;
};

InsertStatement.prototype.isValidStatement = function(statement) {
    return this.startStatementRegex.test(statement);
};

InsertStatement.prototype.execute = function(statement) {
    const statementMatches = this.statementRegex.test(statement);

    if (statementMatches) {
        const statementExec = this.statementRegex.exec(statement);

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
    } else {
        throw new InvalidDatabaseStatement(statement);
    }
};

const SelectStatement = function() {
    this.startStatementRegex = /^select/;
    this.statementRegex = /^select\s+(.+)\s+from\s+(\w+)(?:\s+where\s+(.+)\s*)?/;
};

SelectStatement.prototype.isValidStatement = function(statement) {
    return this.startStatementRegex.test(statement);
};

SelectStatement.prototype.execute = function(statement) {
    const statementMatches = this.statementRegex.test(statement);

    if (statementMatches) {
        const statementExec = this.statementRegex.exec(statement);

        const columns = statementExec[1].split(",").map(s => s.trim());
        const tableName = statementExec[2];
        const whereStatement = statementExec[3];
        let where;
        if (whereStatement) {
            const whereArray = whereStatement.split("=").map(s => s.trim());
            where = {column: whereArray[0], value: whereArray[1]};
        }

        return {tableName, columns, where}
    } else {
        throw new InvalidDatabaseStatement(statement);
    }
};

const DeleteStatement = function() {
    this.startStatementRegex = /^delete\s+from/;
    this.statementRegex = /^delete\s+from\s+(\w+)(?:\s+where\s+(.+)\s*)?/;
};

DeleteStatement.prototype.isValidStatement = function(statement) {
    return this.startStatementRegex.test(statement);
};

DeleteStatement.prototype.execute = function(statement) {
    const statementMatches = this.statementRegex.test(statement);

    if (statementMatches) {
        const statementExec = this.statementRegex.exec(statement);

        const tableName = statementExec[1];
        const whereStatement = statementExec[2];
        let where;
        if (whereStatement) {
            const whereArray = whereStatement.split("=").map(s => s.trim());
            where = {column: whereArray[0], value: whereArray[1]};
        }

        return {tableName, where}
    } else {
        throw new InvalidDatabaseStatement(statement);
    }
};

const Database = function(databaseName) {
    this.databaseName = databaseName;
    this.tables = {};

    this.createStatement = new CreateStatement();
    this.insertStatement = new InsertStatement();
    this.selectStatement = new SelectStatement();
    this.deleteStatement = new DeleteStatement();
};

Database.prototype = {
    isCreateTableStatement: function(statement) {
        return this.createStatement.isValidStatement(statement);
    },

    createTable: function(statement) {
        const table = this.createStatement.execute(statement);
        this.tables[table.tableName] = table;
    },

    isInsertStatement(statement) {
        return this.insertStatement.isValidStatement(statement);
    },

    insert(statement) {
        let dataToInsert = this.insertStatement.execute(statement);
        
        const tableName = dataToInsert.tableName;
        const table = this.tables[tableName];
        
        if (table !== undefined) {
            table.insert(dataToInsert.row);
        } else {
            throw new DatabaseError(statement, `Table "${tableName}" doens't exists`);
        }
    },

    isSelectStatement(statement) {
        return this.selectStatement.isValidStatement(statement);
    },

    select(statement) {
        const dataToSelect = this.selectStatement.execute(statement);

        const tableName = dataToSelect.tableName;
        const table = this.tables[tableName];

        if (table !== undefined) {
            return table.select(dataToSelect.columns, dataToSelect.where);
        } else {
            throw new DatabaseError(statement, `Table "${tableName}" doens't exists`);
        }
    },

    isDeleteStatement(statement) {
        return this.deleteStatement.isValidStatement(statement);
    },

    delete(statement) {
        const dataToDelete = this.deleteStatement.execute(statement);

        const tableName = dataToDelete.tableName;
        const table = this.tables[tableName];

        if (table !== undefined) {
            return table.delete(dataToDelete.where);
        } else {
            throw new DatabaseError(statement, `Table "${tableName}" doens't exists`);
        }
    },
    
    execute: function(statement) {
        if (this.isCreateTableStatement(statement)) {
            this.createTable(statement);
        } else if (this.isInsertStatement(statement)) {
            this.insert(statement);
        } else if (this.isSelectStatement(statement)) {
            return this.select(statement);
        } else if (this.isDeleteStatement(statement)) {
            this.delete(statement);
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
    console.log(database.execute("select  name from  author"));
    console.log(database.execute("select id, name , age  from author  where id  =  1 "));
    database.execute("delete from author where id = 2");
    console.log(database.execute("select  id, name , age from  author "));
    database.execute("delete from author");
    console.log(JSON.stringify(database, null, 2));
} catch (e) {
    console.log(e.toString());
}
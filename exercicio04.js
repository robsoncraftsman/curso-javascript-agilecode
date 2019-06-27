const DatabaseError = function(statement) {
    this.statement = statement;
}

DatabaseError.prototype.toString = function() {
    return `Syntax error: '${this.statement}'`;
}

const InvalidSQLStatementToCreateTable = function(statement) {
    DatabaseError.call(this, statement);
};

InvalidSQLStatementToCreateTable.prototype = Object.create(DatabaseError.prototype);
InvalidSQLStatementToCreateTable.prototype.name = "InvalidSQLStatementToCreateTable";
InvalidSQLStatementToCreateTable.prototype.constructor = InvalidSQLStatementToCreateTable;

const InvalidDatabaseStatement = function(statement) {
    DatabaseError.call(this, statement);
};

InvalidDatabaseStatement.prototype = Object.create(DatabaseError.prototype);
InvalidDatabaseStatement.prototype.name = "InvalidDatabaseStatement";
InvalidDatabaseStatement.prototype.constructor = InvalidDatabaseStatement;

const Table = function(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
    this.data = [];
};


const CreateStatement = function() {
    this.startStatementRegex = /^create\s+table/;
    this.statementRegex = /^create\s+table\s+(\w+)\s*\((.+)\)\s*$/;
    this.columnRegex = /^\s*(\w+)\s+(\w+)\s*$/;
};

CreateStatement.prototype.isCreateStatement = function(statement) {
    return this.startStatementRegex.test(statement);
};

CreateStatement.prototype.createTable = function(statement) {
    const statementMatches = this.statementRegex.test(statement);

    if (statementMatches) {
        const statementExec = this.statementRegex.exec(statement);
        
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
                throw new InvalidSQLStatementToCreateTable(statement);
            }
        }

        return new Table(tableName, columns);
    } else {
        throw new InvalidSQLStatementToCreateTable(statement);
    }
};

const Database = function(databaseName) {
    this.databaseName = databaseName;
    this.tables = {};

    this.createStatement = new CreateStatement();
};

Database.prototype = {
    createTable: function(statement) {
        const table = this.createStatement.createTable(statement);
        this.tables[table.tableName] = table;
    },

    execute: function(statement) {
        if (this.createStatement.isCreateStatement(statement)) {
            this.createTable(statement);
        } else {
            throw new InvalidDatabaseStatement(statement);
        }
    }

};

try {
    const createTableStatement = 'create   table autor(id number, name string,   age   number, city  string,state string, country string  ) ';

    const database = new Database("Books"); 
    database.execute(createTableStatement);

    console.log(JSON.stringify(database, null, 2));
} catch (e) {
    console.log(e, e.toString());
}
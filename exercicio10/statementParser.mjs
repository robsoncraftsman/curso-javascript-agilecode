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

export class CreateTableStatementParser extends StatementParser {
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

export class InsertStatementParser extends StatementParser {
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

export class SelectStatementParser extends StatementParser {
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


export class DeleteStatementParser extends StatementParser {
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
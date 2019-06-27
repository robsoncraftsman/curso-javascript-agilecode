import {DatabaseError, InvalidDatabaseStatement} from "./databaseError";
import * as Parser from "./statementParser";
import Table from "./table"; //Table é exportado como default

export const Database = function(databaseName) {
    this.databaseName = databaseName;
    this.tables = {};

    const statementMap = new Map([
        ["createTable", new Parser.CreateTableStatementParser()],
        ["insert", new Parser.InsertStatementParser()],
        ["select", new Parser.SelectStatementParser()],
        ["delete", new Parser.DeleteStatementParser()]
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
export const DatabaseError = function(statement, message) {
    this.statement = statement;
    this.message = message;
}

DatabaseError.prototype.toString = function() {
    return `${this.message}: '${this.statement}'`;
}

export const InvalidDatabaseStatement = function(statement) {
    DatabaseError.call(this, statement, "Syntax Error");
};

InvalidDatabaseStatement.prototype = Object.create(DatabaseError.prototype);
InvalidDatabaseStatement.prototype.name = "InvalidDatabaseStatement";
InvalidDatabaseStatement.prototype.constructor = InvalidDatabaseStatement;
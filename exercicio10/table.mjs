export default function Table(tableName, columns) {
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
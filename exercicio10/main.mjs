import {Database} from "./database";

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
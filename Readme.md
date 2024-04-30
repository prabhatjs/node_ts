#MongoDB Imp .

``````````````
db.createCollection('emplyoee')

``````````````

db.emp.insert({empno:10,ename:'Jhon',sal:3000});

db.emp.insertMany([{empno:20,ename:'king',sal:3000},{empno:13,ename:'Smith',sal:4000}]);

db.emp.updateOne({empno:10},{$set:{sal:40000}})

db.emp.find({}); 

db.emp.find({empno:10});
{
  _id: ObjectId('662fc05ecc83083cf530616e'),
  empno: 10,
  ename: 'Jhon',
  sal: 40000
}

db.emp.deleteOne({empno:10})

in this project i am using zod for validation

what is zod
The zod npm package is a TypeScript-first schema declaration and validation library.
It's used primarily for defining schemas for JavaScript objects and validating those objects against their schemas.

Here are some key features and functionalities of the zod package:
-------------------------------------------------------------------------------------------------------------------------------------------------------------
Type-safe schemas:=> zod allows you to define schemas using TypeScript-like syntax,
making it type-safe and ensuring that your data conforms to the defined schema at compile-time.

Runtime validation:=> Apart from TypeScript type checking, zod also provides runtime validation.
This means you can use the defined schemas to validate your data at runtime and catch errors early.

Composability:=> Schemas can be composed of other schemas, enabling you to build complex validation logic by combining simpler schemas.

Error reporting:=>zod provides detailed error messages when validation fails,
making it easier to debug and understand validation issues.

Built-in types:=> zod comes with built-in support for common JavaScript and TypeScript types such as string, number, boolean, array, object, etc.

Async validation:=> zod supports asynchronous validation, allowing you to validate data against schemas that require asynchronous operations.

Overall, zod is a powerful tool for ensuring the correctness and integrity of your data in JavaScript and TypeScript applications,
both at compile-time and runtime. 
It's particularly useful in scenarios where you need to enforce strict data validation rules and maintain type safety throughout your codebase.
-------------------------------------------------------------------------------------------------------------------------------------------------------------
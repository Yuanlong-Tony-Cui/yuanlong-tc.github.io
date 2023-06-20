---
title: NodeJS at First Sight
date: 2019-03-03 00:00:00
categories:
  - Career
tags:
  - JavaScript
  - Node.js
---

# NodeJS at First Sight

## Introduction

When first exposed to JavaScript, this set of concepts confused me a lot once upon a time, so I hope this small article will help to some extent whoever needs some clarification on this.

The code looked a little bit different from C++ and Python code when I first saw it written in [NodeJS](https://www.w3schools.com/nodejs/nodejs_intro.asp 'Node.js Introduction'), a special JavaScript runtime environment. Some of the characteristics I found it to have was those "callback functions" and a bunch of `.then()`s after function calls. It really took me a long time to figure out how JavaScript files are run and get used to the "NodeJS" logic. So here comes the concise version of explanation.

Note: To keep the code snippets shorter, the declaration of some variables would be omitted. Instead, necessary explanation will be made for clarification.

## Synchronous vs. Asynchronous Operation

Asynchronous (async) operation only initiates an operation without waiting for its completion to execute the next one.

If you are new to NodeJS, it would be straightforward to say: synchronous operation is the common way of executing code ("normal" JavaScript, C++ and Python) and asynchronous one is the "NodeJS" way of executing code("special" JavaScript).

```JavaScript
// db.collection.find() fetches a specified document from the MongoDB database:
db.collection.findOne({ id: "9527" })
.then(returnedDocument => console.log("Line One executed", returnedDocument))
.catch(err => console.log(err)); // Line One
console.log("Line Two executed"); // Line Two
```

When running the code above, you may expect to see `Line Two executed` printed out after `Line One executed`. However, it will be the other way aroud: `Line One executed` will turn out to be printed out after `Line Two executed`, which is exactly the "NodeJS" way of code execution.

In plain English, while synchronous code exexcution won't execute Line Two until Line One finishes being executed, asynchronous operation won't do the waiting.

In the example above, since the code was written in NodeJS, the type of its code execution is asynchronous. Therefore, after the compiler initiated Line One, it initiated Line Two immediately, without waiting for Line One to finish being executed.

Now, the question is: whether the execution was synchronous or asynchronous, Line One was still initiated prior to Line Two anyway. How come Line One executed the `console.log()` later than Line Two?

The answer is: it was the [`.findOne()`](https://docs.mongodb.com/manual/reference/method/db.collection.findOne/ 'db.collection.findOne -- MongoDB Manual') that delayed Line One to reach its `console.log()`.
And the reason for this delay is `.findOne()` returns a "promise", which usually takes a relatively long time.

## Promise, Then and Catch

At the end of the last section, we've learned that a "promise" is returned by `.findOne()`. If you try to replace

```JavaScript
db.collection.findOne({ id: "9527" })
.then(returnedDocument => console.log("Line One executed", returnedDocument))
.catch(err => console.log(err)); // Line One
```

with

```JavaScript
console.log(db.collection.findOne({ id: "9527" }));
```

, you will see `object Promise` or some similar terms printed out rather than the actual document you query for in the database. What does that term mean?

Basically, a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 'Promise - JavaScript | MDN') is a returned object that shows two things: the completion/failure of an async operation and the value returned by this async operation.

In order to print out the actual returned value instead of that meaningless term, `object Promise`, you need to attach a [`.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then 'Promise.prototype.then() - JavaScript | MDN') to whatever returns a promise. With the completion of the previous async operation, what `.then()` will do is receiving the promise returned by the last function as a parameter and passing that parameter to a function. It is interesting to note that, if a `.then()` returns a new promise, we need to attach another `.then()` to it to deal with that new promise. In the previous example, if we want to see what the full document is with the id equal to `"9527"`, we simply pass `returnedDocument` to a `console.log()` function.

Nevertheless, `.then()` cannot deal with errors. If `.findOne()` didn't succeed but failed, nothing will be printed out, not even an error message. In case any error occurs, we usually want to see what the error is by adding a [`.catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch 'Promise.prototype.catch() - JavaScript | MDN') at the end (with a `console.log()` in it). With the presence of `.catch()`, `.then()`(s) will pass an error down till the error is passed to whatever functions in the `.catch()`.

## Await and Async Function

In the last section, `.then()` and `.catch()` were used to solved the `object Promise` issue and print out the document queried for.

If the code on `Line One`

```JavaScript
db.collection.findOne({ id: "9527" })
.then(returnedDocument => console.log("Line One executed", returnedDocument))
.catch(err => console.log(err)); // Line One
```

is replaced with

```JavaScript
async function exampleFunction() {
const returnedDocument = await db.collection.findOne({ id: "9527" }); // Line One 1
console.log(returnedDocument); // Line One 2
}
exampleFunction();
```

, the document printed out should remain the same. Here, an [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await 'await - JavaScript | MDN') kind of breaks the rule of the current asynchronous execution and forces JavaScript to initiate `Line One 2` after `Line One 1` is completely finished, which works like synchronous execution.

The only thing that is important to note here is `await` should be used in an [`async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function 'async function - JavaScript | MDN') only, otherwise the compiler will give an error like `Error: await is only valid in async function`.

For those who feel uncomfortable with the asynchronous logic, using `await` in `async function` can be very helpful because of the synchronous environment it creates.

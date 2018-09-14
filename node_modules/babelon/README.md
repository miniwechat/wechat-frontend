# babelon

JSON templates using ES6+ object notation.

Like JSON, but really JS.

`babelon` uses `vm`, `Function`, and/or `eval`, so only use it where you trust the input.

## Install

`npm i --save babelon`

## Example

Let's say you want to mockup an JSON response, you can use `babelon` to write a template:

`> example.babelon`

```js
{
  user: {
    id: user_id, /* variables */
    name: `${faker.name.firstName()} ${faker.name.lastName()}` // templates
  },
  posts: posts.map((post) => ({ // iterators
    id: post.id
  })),
  addOne: (v) => { // functions
    let a = 1;
    return v+a;
  },
  ...misc, // object spread properties
  is_active // property shorthand
}
```

`> index.js`
```js
import babelon from 'babelon';
import faker from 'faker';

let tmpl = babelon.compile('example.babelon');

let obj = tmpl({faker, user_id: 1, posts: [{id: 1}], misc: {}, is_active: true});

// obj:
// { user: { id: 1, name: 'First Last' },
//   posts: [ { id: 1 } ],
//   addOne: [Function],
//   is_active: true }
```

## Methods

* `babelon.compileFile(file_path)`: returns callable template
* `babelon.evalFile(file_path, locals = null)`: returns rendered template using locals

* `babelon.compile(code_str)`: returns callable template
* `babelon.eval(code_str, locals = null)`: returns rendered template using locals

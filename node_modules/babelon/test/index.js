'use strict';
let assert = require('assert');

let babelon = require('../index.js');

let locals = {
  faker: {
    name: {
      firstName: function(){ return 'First'; },
      lastName: function(){ return 'Last'; }
    }
  },
  user_id: 1,
  is_active: true,
  posts: [
    {id: 1},
    {id: 2},
    {id: 3}
  ],
  misc: {
    is_active: false,
    is_banned: false
  }
};

let tmplFile = `${__dirname}/example.babelon`;

let obj = babelon.evalFile(tmplFile, locals);
assert.equal(obj.user.id, 1);
assert.equal(obj.user.name, 'First Last');
assert.equal(obj.posts.length, 3);
assert.equal(obj.is_banned, false);
assert.equal(obj.is_active, true);

obj = babelon.compileFile(tmplFile)(locals);
assert.equal(obj.user.id, 1);
assert.equal(obj.user.name, 'First Last');
assert.equal(obj.posts.length, 3);
assert.equal(obj.is_banned, false);
assert.equal(obj.is_active, true);
assert.equal(obj.addOne(1), 2);

console.log('OK')

// obj = babelon.evalFile(tmplFile, {faker: locals.faker, user_id: 1, posts: [{id: 1}], misc: {}, is_active: true});
// console.log(obj);

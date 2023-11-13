// Node.js run : ctrl + Alt + N

// www.xyz.com?author=bloggingdeveloper&a1=hello
// http://www.pdbbind.org.cn/quickpdb.php

// const params = new URLSearchParams(window.location.search);

// const paramsObj = Array.from(params.keys()).reduce(
//   (acc, val) => ({ ...acc, [val]: params.get(val) }),
//   {}
// );

const url = require('url');

const urlStr = 'http://www.pdbbind.org.cn/quickpdb.php';
const q1 = url.parse(urlStr, true);
const q2 = url.parse(urlStr);

console.log(q1)
console.log(q2)
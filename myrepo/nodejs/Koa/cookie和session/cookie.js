

// cookie是koa自带的，不需要第三方模块

const Koa = require('koa');
const Router = require('koa-router');


let server = new Koa();
server.listen(8080);


let router = new Router();


// cookie循环秘钥
server.keys = [
    'sdf7as9d8f7asd7f9sdfa9s',
    'sdfasd6fgjhgjgdgjsfgsf5',
    'nk54h3k2klj78kh89kh5kh3',
];


// 设置cookie和获取cookie的时候，都需要进行签名，保证数据的安全性
// 如果设置的时候进行签名了，获取的时候没有进行签名校验，服务器依然可以获取到cookie，因此在获取的时候，也应该加上signed:true

router.get('/', ctx => {
    // ctx.cookies.set(key, value, options)
    ctx.cookies.set('user2', 'bhz2', {
        // cookie里有属性这里都有
        signed: true,
        maxAge: 86400 * 30
    })
});

router.get('/cookie', ctx => {
    // ctx.cookies.get(key, value, options)
    // 如果设置的时候进行签名了，获取的时候没有进行签名校验，服务器依然可以获取到cookie，因此在获取的时候，也应该加上signed:true
    let cookie = ctx.cookies.get('user2', {
        signed: true
    });
    console.log(cookie);
});

server.use(router.routes());
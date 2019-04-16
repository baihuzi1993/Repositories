let fs = require('fs');



let rs = fs.createReadStream('./v.f30.mp4');
let ws = fs.createWriteStream('./new.mp4');


rs.once('open', ()=>{console.log('读入通道已开启')});
rs.once('close', ()=>{console.log('读入通道已关闭')});
ws.once('open', ()=>{console.log('写入通道已开启')});
ws.once('close', ()=>{console.log('写入通道已关闭')});

rs.on('data', (data)=>{
    console.log(data);
    ws.write(data);
});



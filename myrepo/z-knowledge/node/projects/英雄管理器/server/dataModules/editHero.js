let db = require('../database');

/**
 * 新增英雄信息
 */
module.exports = function getHero(arr) {
    return new Promise((resolve, reject) => {
        let sql = 'update heros set name = ?,gender = ?,img = ? where id = ?';
        db.query(sql, arr, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}
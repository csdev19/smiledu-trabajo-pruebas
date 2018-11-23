function getCategories() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT *
                     FROM categorias`;
        global.dbp.any(sql)
          .then(res => {
            return resolve(res);
          }).catch(err => {
            return reject(err);
        });
    });
}

module.exports = {
    getCategories
}
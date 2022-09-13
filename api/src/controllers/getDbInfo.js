const { Race, Temperament } = require('../db');

const getDbInfo = async () => {
    return await Race.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught: {
                attributes: [],
            },
        }
    })
};

module.exports = {
    getDbInfo,
}
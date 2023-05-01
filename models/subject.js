const Sequelize = require('sequelize')

class Subject extends Sequelize.Model {
    static initiate(sequelize) {
        Subject.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            voteNum: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Subject',
            tableName: 'subjects',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}

module.exports = Subject
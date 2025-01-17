const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class UserModel extends Model {

    static async init(sequelizeInstance) {
        super.init({
            id : {
                type : DataTypes.INTEGER,
                primaryKey : true,
                allowNull : false,
                autoIncrement : true,
                unique : true
            },
            username : {
                type : DataTypes.STRING,
                allowNull : false
            },
            email : {
                type : DataTypes.STRING,
                allowNull : false
            },
            password : {
                type : DataTypes.STRING,
                allowNull : false
            }
        },
        {
            hooks : {
                beforeCreate : async (user, options) => {
                    // Password hashing
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    // Replacing the user password by the hashed password
                    user.password = hashedPassword;
                }
            },
            // Table name in the database
            modelName : "User",
            sequelize : sequelizeInstance,
            freezeTableName : true
        })

        // Synchronize the class with the database
        super.sync()
    }

}

// Exporting the user model
module.exports = UserModel;

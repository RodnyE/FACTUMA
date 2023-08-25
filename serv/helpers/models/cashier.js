const CashierModel = (DataTypes) => {
    return {
        cashier_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        workers: {
            type: DataTypes.STRING,
            default: "[]"
        },
        cash: {
            type: DataTypes.INTEGER,
            default: 0
        }
    };
};

module.exports = CashierModel;
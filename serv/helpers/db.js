const config = require("../../config.js");
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const UserModel = require("./models/user.js");
const ItemModel = require("./models/item.js");
const CategoryModel = require("./models/category.js");
const CashierModel = require("./models/cashier.js");
const StockModel = require("./models/stock.js");
const HistoryModel = require("./models/history.js");
const uid = require("./uid.js");
const OrderModel = require("./models/order.js");

/**********************
 * Starting Connection *
 **********************/
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.SERV + '/db/db.sqlite',
    logging: false
});

(async () => {
    try {
        sequelize.authenticate();
    } catch (err) {
        throw new Error("" + err)
    }
})();

/*********************
 *   User Model DB   *
 *********************/
class User extends Model {
    getData() {
        const rows = ["user_id", "username", "acclevel"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

User.init(
    UserModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await User.sync();
    let admin = await User.findOne({
        where: {
            username: "admin"
        }
    });

    if (!admin) {
        admin = await User.create({
            user_id: uid.num(8),
            username: "admin",
            password: "admin"
        });
        if (admin) console.log("Cuenta de administracion creada...\n\nUser: admin\nPassword: admin\n\nPor favor cambie su contrasena para mejor proteccion en la configuracion de administracion.");
        else {
            console.log("Ocurrio un error , pongase en contacto con el administrador.");
        }
    }
})();


/*********************
 *   Item Model DB   *
 *********************/
class Item extends Model {
    getData() {
        const rows = ["item_id", "name", "category", "pic", "notes", "price"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

Item.init(
    ItemModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await Item.sync();
});


/*********************
 * Category Model DB *
 *********************/
class Category extends Model {
    getData() {
        const rows = ["name"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

Category.init(
    CategoryModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await Category.sync();
});

/*********************
 * Cashier Model DB  *
 *********************/
class Cashier extends Model {
    getData() {
        const rows = ["cashier_id", "name", "cash"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

Cashier.init(
    CashierModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await Cashier.sync();
});


/*********************
 *  Stock Model DB   *
 *********************/
class Stock extends Model {
    getData() {
        const rows = ["item_id", "quantity"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

Stock.init(
    StockModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await Stock.sync();
});

/*********************
 * History Model DB  *
 *********************/
class History extends Model {
    getData() {
        const rows = ["cashier_id", "date", "data"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

History.init(
    HistoryModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await History.sync();
});

/*********************
 *  Order Model DB   *
 *********************/
class Order extends Model {
    getData() {
        const rows = ["cashier_id", "table", "items" , "notes"];
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof (obj) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

Order.init(
    OrderModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await Order.sync();
});

module.exports = {
    User,
    Item,
    Category,
    Cashier,
    Stock,
    History,
    Op
}
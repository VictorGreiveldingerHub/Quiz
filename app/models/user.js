const { Model, Sequelize } = require('sequelize');
const dbConnection = require('../dbConnection');

// Création d'une classe par entité 
class User extends Model {
    // // Mise en place des propriétés
    // email;
    // password;
    // firstname;
    // lastname;
    
    // // Prop statique pour la factorisation
    // static tableName = "app_users";
    
    // // Mise en place du constructor
    // // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    // constructor(obj) {
    //     super(obj);
    //     this.email = obj.email;
    //     this.password = obj.password;
    //     this.firstname = obj.firstname;
    //     this.lastname = obj.lastname;
    // };
    
    getFullName() {
        return " " + this.firstname + " " + this.lastname;
    }
    
    /* Voir CoreModel
    
    // // Méthode pour afficher tous les users
    // static findAll(callback) {
    //     // Query pour récupérer tous les users de la BDD ...
    //     const query = `SELECT * FROM "app_users"`;
                
        
    //     // ... on passe la requête au client, avec un callback qu'on doit passer en argument à findAll(),
    //     dbConnection.query(query, (err, data) => {
    //         if (err) {
    //             console.log(err);
    //             // On passe l'erreur mais pas la data
    //             callback(err, null);
    //         } else {
    //             // console.log(data);
    //             // Pas d'erreur donc on renvoie la liste des résultats au callback
    //             // liste des résultats dans data.rows (==> liste d'objet)
                
    //             // Donc avant de récup les résults => on les tranforme en instance de User
    //             let allUsers = [];
                
    //             for (let prop in data.rows) {
    //                 // console.log(data.rows[prop]);
    //                 // console.log(data.rows);
    //                 const users = new User(data.rows[prop]);
    //                 // console.log(users);
    //                 allUsers.push(users);
    //             };
    //             // console.log(allUsers);
    //             callback(null, allUsers);
    //         };
    //     });
    // };
    
    // // Méthode pour récupérer le user à l'Id "x"
    // static findById(id, callback) {
    //     const query = `SELECT * FROM "app_users" WHERE "id" = $1`;
    //     const values = [id]; // Récupérer le bon Id
        
    //     dbConnection.query(query, values, (err, data) => {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             // verification que le résultat existe avant transformation
    //             if (data.rows[0]) {
    //                 // console.log(data.rows[0]);
    //                 const myUser = new User(data.rows[0]);
    //                 callback(null, myUser);
    //             } else {
    //                 callback(null, undefined);
    //             };
                
    //         };
    //     });
    // };
    
    // Méthode pour update un user
    update(callback) {
        const query = `UPDATE "app_users" SET
            "email" = $1,
            "password" = $2,
            "firstname" = $3,
            "lastname" = $4,
            "updated_at" = CURRENT_TIMESTAMP
            WHERE "id" = $5
            RETURNING id, updated_at`;
        const values = [this.email, this.password, this.firstname, this.lastname, this.id];
        
        // console.log(values);
        // // console.log(updatedInfos);
        // console.log(query);
        // console.log(this);
        
        // return;
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                const updatedInfos = data.rows[0];
                this.updated_at = updatedInfos.updated_at;
                callback(null, this);
            };
        });
    };
    
    // Méthode pour insérer un nouveau tag
    // Ici je veux créer un nouveau tag, puis l'insérer dans la BDD
    insert(callback) {
        const query = `INSERT INTO "app_users" ("name") VALUES ($1) RETURNING id, created_at`;
        const values = [this.name];
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                const returnedInfos = data.rows[0];
                console.log(data);
                // Si l'insertion se passe bien on récup dans data.rows[0] les infos qu'on a demandé
                this.id = returnedInfos.id;
                this.created_at = returnedInfos.created_at;
                callback(null, this);
            };
        });
    };
    
    // Méthode pour supprimer un tag, apres l'avoir récupérer
    delete(callback) {
        const query = `DELETE FROM "app_users" WHERE "id" = $1`;
        const values = [this.id];
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                delete data.rows[0];
            };
        });
    };
    */
};

User.init({
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    firstname: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: Sequelize.INTEGER
}, {
    sequelize: dbConnection,
    tableName: "app_users",
    createdAt: "created_at",
    updatedAt: "updated_at"
});

// On export la classe !
module.exports = User;
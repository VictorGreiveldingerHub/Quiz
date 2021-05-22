const dbConnection = require('../dbConnection');

// Création d'un coreModels pour éviter la répétition dans les classes 
class CoreModel {
    // Mise en place des propriétés
    id;
    status;
    created_at;
    updated_at;
    
    // Mise en place du constructor
    // Prend en param un objet qui contient toutes les valeurs à recopier dans l'instance
    constructor(obj) {
        this.id = obj.id;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
    
    // Mise en place de quelques Getter / Setter pour voir le fonctionnement,
    // Avant d'utiliser Sequelize qui le fera pour nous
    
    getId() {
        // Retourne seulement un id,
        return this.id;
    };
    
    setId(value) {
        // Ici je veux vérifier que id est bien un nombre entier
        if (Number.isInteger(value)) {
            // Si c'est bien un entier, je l'accepte
            this.id = value;
        } else {
            // On lève ou jeter une exception (==> une erreur qui est levée)
            throw Error("ID must be an integer value");
        };
    };
    
    // Test de this en méthode normal + statique
    showThis () { // Normal
        console.log(this);
    };
    
    static showStaticThis () { // statique
        console.log(this);
    };
    
    
    // Méthode pour afficher tous les users
    static findAll(callback) {
        // Query pour récupérer tous les users de la BDD ...
        
        // Mais pour pouvoir sépcifier la table dans laquelle aller récupérer les infos, il faut mettre une variable
        // statique dans chaque classe, lorsqu'on appelera cette methode avec "User.findAll", alors this correspondra
        // a User, et donc this.tableNAme sera la propriété tableName de User.
        // Donc rajout d'une prop statique dans TOUTES les classes !
        
        // const query = `SELECT * FROM "app_users"`;
        const query = `SELECT * FROM "${this.tableName}"`;
        
        // ... on passe la requête au client, avec un callback qu'on doit passer en argument à findAll(),
        dbConnection.query(query, (err, data) => {
            if (err) {
                console.log(err);
                // On passe l'erreur mais pas la data
                callback(err, null);
            } else {
                // console.log(data);
                // Pas d'erreur donc on renvoie la liste des résultats au callback
                // liste des résultats dans data.rows (==> liste d'objet)
                
                // Donc avant de récup les résults => on les tranforme en instance de User
                let allModels = [];
                
                for (let prop in data.rows) {
                    // console.log(data.rows[prop]);
                    // console.log(data.rows);
                    
                    // console.log(users);
                    allModels.push(new this(data.rows[prop]));
                };
                // console.log(allUsers);
                callback(null, allModels);
            };
        });
    };
    
    static findById(id, callback) {
        const query = `SELECT * FROM "${this.tableName}" WHERE "id" = $1`;
        const values = [id]; // Récupérer le bon Id
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                // verification que le résultat existe avant transformation
                if (data.rows[0]) {
                    // console.log(data.rows[0]);
                    const myInfo = new this(data.rows[0]);
                    callback(null, myInfo);
                } else {
                    callback(null, undefined);
                };
            };
        });
    };
    
    
    
    // Methode pour supprimer une instance courrante de la BDD
    delete(callback) {
        // Ici je veux retrouver le nom de la table sauf qu'on est pas dans une méthode statique...
        // Comment retrouver le nom de la table à partir de cela ?
        // avec this.constructor (la classe de l'objet)
        const query = `DELETE FROM "${this.constructor.tableName}" WHERE "id" = $1`;
        const values = [this.id];
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                delete data.rows[0];
            };
        });
    };
    
    // Insérer un nouvel utilisateur 
    insert(callback) {
        // Ici il faut créer une query et le tableau de valeur associé
        // sauf qu'ici en fonction du type de l'objet qui appelle cette méthode ... ça ne sera pas toujours
        // les mêmes propriétés ! (Question a des props != User != Level) ...
        // Donc il faut qu'on génère une requête en FONCTION des props de l'objet courant (this)
        
        const propNames = [];
        const values = [];
        const dollar = [];
        let indexDollar = 1;
        
        for (let prop in this) {
            // console.log(prop); // id, status, created / updated_at, name
            if (prop != "id" && prop != "created_at" && prop != "updated_at") { // Vu qu'on ne veut pas les insérer manuellement
                propNames.push(prop);
                values.push(this[prop]); // == les résultats
                dollar.push("$" + indexDollar);
                indexDollar++;
            }
        };
        console.log(propNames);
        console.log(values);
        console.log(dollar);
        
        const query = `INSERT INTO "${this.constructor.tableName}" (${propNames}) VALUES (${dollar}) RETURNING id, created_at, updated_at`;
        // const values = [this.name];
        console.log(query);
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                const returnedInfos = data.rows[0];
                // console.log(data);
                // Si l'insertion se passe bien on récup dans data.rows[0] les infos qu'on a demandé
                this.id = returnedInfos.id;
                this.created_at = returnedInfos.created_at;
                this.updated_at = returnedInfos.updated_at;
                callback(null, this);
            };
        });
    };
    
    update(callback) {
        const propNames = [];
        const values = [];
        let indexDollar = 1;
        
        for (let prop in this) {
            if (prop != "id" && prop != "created_at" && prop != "updated_at") {
                let string = ` "${prop}" = $${indexDollar}`;
                indexDollar++;
                // console.log(string);
                propNames.push(string);
                values.push(this[prop]);
            };
        };
        
        propNames.push(` "updated_at" = CURRENT_TIMESTAMP`);
        
        // console.log(propNames);
        // console.log(values);
        // return;
        
        // Comme le dernier dollar va servir a spécifier l'id de l'objet à update, je le rajoute dans le tableau de valeur
        values.push(this.id);
        
        const query = `UPDATE "${this.constructor.tableName}" SET ${propNames} WHERE "id" = $${indexDollar} RETURNING id, created_at, updated_at`;
        
        // console.log(query);
        // return;
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                const updatedInfos = data.rows[0];
                this.id = updatedInfos.id;
                this.created_at = updatedInfos.updated_at;
                this.updated_at = updatedInfos.updated_at;
                callback(null, this);
            };
        });
    };
    
    // Méthode pour soit créer un nouvel élément soit l'update dans la BDD
    save () {
        // SI l'id existe => update
        if (this.id) {
            this.update((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        } else {
            this.insert((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        };
    };
    
    // Méthode pour trouver des instances en fonction de paramètres non défini à l'avance
    static findBy (params, callback) {
        let arrayOfConditions = ["1 = 1"];
        let indexDollar = 1;
        let values = [];
        
        for (let prop in params) {
            let condition = `${prop} = $${indexDollar}`;
            arrayOfConditions.push(condition);
            values.push(params[prop]);
            indexDollar++;
        };
        
        const query = `SELECT * FROM "${this.tableName}" WHERE ${arrayOfConditions.join(" AND ")}`;
        
        dbConnection.query(query, values, (err, data) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                let allModels = [];
                
                for (let prop in data.rows) {
                    allModels.push(new this(data.rows[prop]));
                };
                callback(null, allModels);
            };
        });
    };
};

// On export la classe !
module.exports = CoreModel;
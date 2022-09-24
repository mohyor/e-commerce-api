class Database {
  #model;

  constructor(model) {
    this.#model = model;
  }

  async exist(query) {
    let exist = await this.#model.find(query).exec();

    return exist.length ? true : false;
  }

  async buildClause(data) {
    let build = [];

    for (const key in data) {
      build.push({ [key]: data[key] });
    }

    return build;
  }

  async save(data) {
    let s = await new this.#model(data).save();

    return s;
  }
  
  // - filters [?sort='desc'&limit=5&name='phone']
  async queryFilter(query) {
    let entity = await this.#model.find(query).sort({ name: -1 }).limit(5);
    return entity
  }
}

module.exports = Database;

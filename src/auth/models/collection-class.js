'use strict';

class collection {
    constructor(model) {
        this.model = model;
    }

    async createRecord(obj) {
    try {
        let newRecord= await this.model.create(obj);
        return newRecord;

        // return await this.model.create(obj);
    } catch (e) {
        console.error('error in creating a new record for model: ', this.model.name);
    }
}
async readRecord(id) {
    try {
        if (id) {
            return await this.model.findOne({ where: { id: id } })
        } else {
            return await this.model.findAll();
        }
    } catch (e) {
        console.error('error in reading record(s) for model: ', this.model.name);
    }
}
async deleteRecord(pid){
    try {
        let deletedRecord= await this.model.destroy({ where: { id: pid } });
        return deletedRecord;

        
    } catch (e) {
        console.error('error in creating a new record for model: ', this.model.name);
    }
}
async updateRecored(obj,pid){
    try {
        let updatedRecord= await this.model.update(obj,{returning: true,where:{id:pid}});
        return updatedRecord;

        
    } catch (e) {
        console.error('error in updating record for model: ', this.model.name);
    }
}
}

module.exports =collection;
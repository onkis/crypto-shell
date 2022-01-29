exports = class User{
	
  constructor(query){
    this.query = query;
  }
  
  async getUser(id){
    let user = await this.query(`
      Select * from "Users" Where id = ${id} limit 1;
      `);
      
    )
  }
}
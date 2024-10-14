// models/todo.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return  await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");
      
      const overdue = await Todo.overdue();
      const dueToday = await Todo.dueToday();
      const dueLater = await Todo.dueLater();

      console.log("Overdue");
      // FILL IN HERE
      overdue.forEach(todo => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      dueToday.forEach(todo => {
        console.log(todo.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      //FILL IN HERE
      dueLater.forEach(todo => {
        console.log(todo.displayableString());
      });
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today = new Date().toISOString().split('T')[0];
      const all = await Todo.findAll({
        where: {
          completed: false,
        }
      })
      return all.filter((todo) => todo.dueDate < today);
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE TODAY
      const today = new Date().toISOString().split('T')[0];
      const all = await Todo.findAll()
      return all.filter((todo) => todo.dueDate === today);
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = new Date().toISOString().split('T')[0];
      const all  = await Todo.findAll();
      return all.filter(todo => todo.dueDate > today);
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    
    }
    
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};

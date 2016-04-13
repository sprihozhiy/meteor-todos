Meteor.methods({
  addTodo: function(text){
    if (!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    } else {
      TaskList.insert({
        task: text,
        createdAt: new Date(),
        userId: Meteor.userId(),
        author: Meteor.user().username
      });
    }
  },
  deleteTodo: function(todoId){
    var todo = TaskList.findOne(todoId);
    if (todo.userId !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    } else {
      TaskList.remove(todoId);
    }
  },
  toggleCheck: function(todoId, isChecked){
    var todo = TaskList.findOne(todoId);
    if (todo.userId !== Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    } else {
      TaskList.update(todoId, {$set: {checked: isChecked}});
    }
  },
});

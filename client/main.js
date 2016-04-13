// Client
Meteor.subscribe('tasklist');

Template.TaskList.helpers({
  taskList: function(){
    return TaskList.find();
  }
});

Template.body.events({
  'submit .addtask': function(event){
    event.preventDefault();

    var target = event.target;
    var text = target.text.value;

    Meteor.call('addTodo', text);

    // TaskList.insert({
    //   task: text,
    //   createdAt: new Date(),
    //   userId: Meteor.userId(),
    //   author: Meteor.user().username,
    // });

    target.text.value = '';
  },
  'click .delete': function(){
    Meteor.call('deleteTodo', this._id);
    //  TaskList.remove(this._id);
  },
  'click .toggle-checked': function(){
    Meteor.call('toggleCheck', this._id, !this.checked);
    // TaskList.update(this._id, {$set: {checked: ! this.checked}});
  }
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

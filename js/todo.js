$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

var Todo = Backbone.Model.extend({
	defaults: function() {
		return {
			title: 'empty todo...',
			completed: false
		};
	},

	initialize: function(){
		if(!this.get('title')){
			this.set({'title': this.defaults().title, 'completed': false});
		}
	},

	toggle: function(){
		if (this.get('completed')){
			this.set({'completed':false});
		}else{
			this.set({'completed':true});
		}
	}
});

var TodoList = Backbone.Firebase.Collection.extend({
	model: Todo,
	firebase: '',

	initialize: function(){
		var uid = localStorage.getItem('btd') || new Date().getTime();
		localStorage.setItem('btd', uid);
		this.firebase = new Firebase("https://<placeholder>.firebaseio.com/" + uid);
	}
}); 


var TodoListView = Backbone.View.extend({
	el: '#todo-list',

	initialize: function(){
		this.listenTo(this.collection, 'add change destroy remove', this.render);
	},
	render: function(){
		var template = _.template($('#todo-entry-template').html(), {tasks: this.collection.models});
		this.$el.html(template);
	},

	removeTask: function(ev){
		var modelId =  $(ev.currentTarget).data('id');
		var model = this.collection.get(modelId);
		this.collection.remove(model);
		this.render();
	},

	doneTask: function(ev){
		var modelId = $(ev.currentTarget).data('id');
		task = this.collection.get(modelId);
		task.toggle();
	},

	events:{
		'click .button-delete' : 'removeTask',
		'click .check-complete' : 'doneTask'
	}

});


var Router = Backbone.Router.extend({
	routes: {
		'' : 'home'
	}
});

var todoList = new TodoList();
var todoListView = new TodoListView({collection: todoList});	

var router = new Router();
router.on('route:home', function(){
	todoListView.render();
	
});


Backbone.history.start();

$(function(){

	var addTask = function(){
		if ($('.task-details').val()){
			taskTitle = $('.task-details').val();
			var task = new Todo({title: taskTitle });
			todoList.add(task);
			$('.task-details').val("");
		}
	};

	var addOnEnter = function(e){
		if (e.keyCode == 13){
			if ($('.task-details').val()){
				taskTitle = $('.task-details').val();
				var task = new Todo({title: taskTitle });
				todoList.add(task);
				$('.task-details').val("");
			}
		}
	}

	$('#add-todo-button').on('click', addTask);
	$('.task-details').keypress(addOnEnter);
});

var express = require('express');
var port = 8080;
var app = express();

var Course_List = [
	{name:'English',id:0},
	{name:'Math',id:1},
	{name:'History',id:2},
	{name:'IT',id:3}
];
var course_count = Course_List.length;

var Student_List = [
	{id:1,name:'Student A',course:[]},
	{id:2,name:'Student B',course:[]},
	{id:3,name:'Student C',course:[]},
	{id:4,name:'Student D',course:[]}
];

app.use(express.static('web'));

app.get('/', function (req, res) {
    res.sendfile('web/index.html');
});

app.get('/courses',function(req, res){
	res.send(Course_List);
});

app.get('/course/add',function (req, res) {
	var _name = req.param('name');
	var _i = Course_List.find(function(course){
		return course.name === _name;
	});

	if(_i > -1){
		res.send('error');
	}else{
		course_count++;
		Course_List.push({name:_name,id:course_count});
		res.send('success');
	}
});

app.get('/course/delete', function(req, res) {
	var _id = req.param('id');
	var _i = Course_List.find(function(course){
		return course.id === _id;
	});
	if(_i > -1){
		Course_List.splice(_i, 1);
		res.send('success');
	}else{
		res.send('error')
	}
});

app.get('/course/edit', function (req, res) {
	var  _id = req.param('id');
	var _name = req.param('name');
	var _i = Course_List.find(function(course){
		return course.id === _id;
	});
	if(_i > -1){
		Course_List.splice(_i, 1);
		res.send('success');
	}else{
		res.send('error')
	}
});
app.get('/course/search', function (req, res) {
	var  _s = req.param('s').toLocaleLowerCase();
	var _arr = [];
	for(var i=0; i < Course_List.length; i++){
		if(Course_List[i].name.toLocaleLowerCase().includes(_s)){
			_arr.push(Course_List[i]);
		}
	}
	res.send(_arr)
});

app.get('/studnets',function(req, res){
	res.send(Student_List);
});

app.get('/student/enroll_course', function (req, res) {
    var _id = req.param('id');
    var _courses = req.param('course_list');
	var _i = Course_List.find(function(course){
		return course.id === _id;
	});
	if(_i > -1){
		Student_List[_i].course = _courses;
		res.send('success')
	}else{
		res.send('error')
	}
});

app.listen(port, function () {
    console.log('app is listening at port ', port);
});
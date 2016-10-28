// var app = angular.module('courseWeb', []);

$(function(){
	// $.get('/courses',function(res){
	// 	console.log(res)
	// });

	$.get('/course/add',{name:'haha'},function(res){
		$.get('/courses',function(res){
			console.log('courses ： ',res)
		});
	});

	$.get('/course/search',{s:'e'},function(res){
		console.log('Search Result ：',res)
	});

	$.get('/studnets',function(res){
		console.log(res)
	});


});
// var app = angular.module('courseWeb', []);

$(function() {
    $.get('/courses', function(res) {
        console.log(res)
    });

    // $.get('/course/add',{name:'haha'},function(res){
    // 	$.get('/courses',function(res){
    // 		console.log('courses ： ',res)
    // 	});
    // });
    //
    // $.get('/course/search',{'s':'a'},function(res){
    // 	console.log('Search Result ：',res)
    // });
    //
    // //
    // $.get('/studnets',function(res){
    // 	console.log('获取所有学生 ',res)
    // });

    //
    // $.get('/course/delete/0', function(res) {
    //     console.log('删除课程 ', res);
    //     $.get('/courses', function(res) {
    //         console.log(res)
    //     });
    // });

    // $.get('/course/edit',{id:1,name:Date()},function(res){
    // 	console.log(' 编辑结果 ', res);
    // 	$.get('/courses', function(res) {
    //       console.log(res)
    //   });
    // });

    $.get('/studnets', function(res) {
        console.log(' studnets is ', res);
    });

    $.get('/student/enroll_course', {
        id: 1,
        courses: [1, 2]
    }, function(res) {
        console.log(' enroll course is ', res);
        $.get('/studnets', function(res) {
            console.log(' studnets is ', res);
        });
    });
});

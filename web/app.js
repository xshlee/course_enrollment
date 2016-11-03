var students, courses;
$.when($.getJSON('/courses'), $.getJSON('/studnets')).done(function(res1, res2) {
    $(function() {
        var course_vm = new Vue({
            el: '#course_view',
            data: {
                courses: res1[0],
                students:res2[0],
                s: '',
                add_course:'',
                show_edit:false,
                show_edit_student:false,
                edit_course:'',
                cur_course:'',
                cur_index:0,
                selected:'',
                student_index:''
            },
            methods: {
                add: function() {
                    var self = this;
                    $.get('/course/add',{name:this.add_course},function(res){
                        if(res === 'success'){
                            $.get('/courses',function(res){
                                self.courses = res;
                        	});
                        }else{
                            alert(res);
                        }
                    });
                },
                edit:function(index){
                    this.show_edit = true;
                    this.cur_index = index;
                    this.edit_course = this.courses[this.cur_index].name;
                },
                edited:function(){
                    var self = this;
                    $.get('/course/edit',{id:this.courses[this.cur_index].id,name:this.edit_course},function(res){
                    	if(res === 'error'){
                            alert(res);
                            return;
                        }
                        self.show_edit = false;
                        self.edit_course = '';
                    	$.get('/courses', function(res) {
                          self.courses = res;
                      });
                    });
                },
                on_delete:function(index){
                    var self = this;
                    if(window.confirm("Are you sure?")){
                        $.get('/course/delete/'+this.courses[index].id, function(res) {
                            $.get('/courses', function(res) {
                                if(res != 'error'){
                                    self.courses = res;
                                }else{
                                    alert('error');
                                }
                            });
                        });
                    }
                },
                filter_course:function(ces){
                    var _s = this.s;
                    return ces.filter(function(c){
                        return c.name.toLocaleLowerCase().includes(_s.toLocaleLowerCase());
                    });
                },
                edit_student:function(index){
                    this.student_index = index;
                    this.show_edit_student = true;
                },
                enrollment:function(){
                    this.students[this.student_index].course = this.selected;
                    this.show_edit_student = false;
                    var self = this;

                    $.get('/student/enroll_course', {
                        id: this.students[this.student_index].id,
                        courses: this.selected
                    }, function(res) {
                        $.get('/studnets', function(res) {
                            self.students = res;
                        });
                    });
                }
            }
        });
    });
});

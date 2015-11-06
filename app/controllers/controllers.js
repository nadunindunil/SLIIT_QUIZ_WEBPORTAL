/**
 * Created by NADUN on 8/13/2015.
 */


app.controller('courseCtrl', function($scope){

    $scope.c1 = [{title : 'Mathematics', avg : '66.78'}, {title:'Science' , avg : '89.00'}];

});



app.controller('QuizCtrl', function($scope){

    //$scope.QuizList = [];
    var list1 = [];

    socket.emit('allQuiz',{qid : 35});



    socket.on('showQuiz', function(msg){
        $scope.QuizList = msg;
        console.log(msg);
        console.log($scope.QuizList);
        $scope.$apply();
    });




    $scope.addQuiz = function () {
        var array = {QuizID:$scope.q.id, Name:$scope.q.Name, Time :$scope.q.Time, CourseID: $scope.q.Course,
            key : ['Mathematics','Level2'] };
        $scope.QuizList.push(array);


        var quiz = {
            id : $scope.q.id,
            name : $scope.q.Name,
            time : $scope.q.Time,
            course: $scope.q.Course,
            key : ['Mathematics','Level2']
        };
        socket.emit('addQuiz', quiz);

        $scope.q.Name = "";
        $scope.q.Time = null;
        $scope.q.course = "";
        $scope.q.id = null;
        //$scope.q.key = null;
    };

    $scope.deleteQuiz = function(id){

        socket.emit('deleteQuiz',{qid : id});

        //for (var g = 0 ; g < QuizList.length ; g++){
        //    if (QuizList[g].QuizID == id){
        //        QuizList.remove(g);
        //    }
        //}

        socket.emit('allQuiz',{qid : 35});



        socket.on('showQuiz', function(msg){
            $scope.QuizList = msg;
            console.log(msg);
            console.log($scope.QuizList);
            $scope.$apply();
        });

    };



});



app.controller('MemberCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams, $http , $rootScope ) {


        $scope.QuizID = $routeParams.quizId;


        socket.emit('getQuiz',{ qid : $scope.QuizID });

        socket.on('showQuiz', function(msg){
            $scope.questions = msg  ;
            console.log(msg);
            $scope.$apply();


        });


        $scope.options = [{text:"",id:0},{text:"",id:1}];
        $scope.answer = {text:""};

        $scope.addOption = function(){
            $scope.options.push({text:"",id:$scope.options.length});
        };

        //$scope.questions = [];


        $scope.addQuestion = function()
        {
            var options = [];

            for(var i=0;i<$scope.options.length;i++)
                options.push($scope.options[i].text);

            var question1 = {Q:$scope.question,O:options,A:$scope.answer.text};

            var newObject = JSON.parse(JSON.stringify(question1));
            $scope.questions.Questions.push(newObject);


            var questionToSend = {};
            questionToSend.qid = $scope.QuizID;
            questionToSend.q = $scope.question;
            questionToSend.o = options;
            questionToSend.a = $scope.answer.text;
            socket.emit('addQues',questionToSend);

            //console.show(newObject);
            $scope.question = "";
            $scope.options = [{text:"",id:0},{text:"",id:1}];
            $scope.answer.text = "";
        };






        $scope.submit = function(){

            console.log("Nadun1");
            var sample = {
                id : 25,
                name : 'Mathz'
            };

            socket.emit('addQuiz', sample);
            console.log("Nadun");

        };





    }]
);


app.controller('MemberCtrl2', ['$scope', '$http',
        function($scope, $http) {



            $scope.MembersList2=null;
            //console.log($routeParams);

            $scope.mypromise12 = $http.get('http://104.236.206.83:3000/users').success(function(data) {
                $scope.MembersList2 = data;
            });


        }]


);





app.controller('MemberProfileCtrl', ['$scope', '$routeParams', '$http',
        function($scope, $routeParams, $http) {



            $scope.ProfileContent=null;
            $scope.Transactions = null;
            //console.log($routeParams);
            $scope.NIC = $routeParams.groupId;
            $scope.mypromise3 = $http.get('http://104.236.206.83:3000/find/' + $routeParams.NIC ).success(function(data) {
                $scope.ProfileContent = data;
                $scope.Transactions = data.Trans;
                console.log(data);
            });



        }]


);

app.controller('d1Ctrl', ['$scope', '$http',
        function($scope, $http) {

        $scope.top = [{title : 'Graph Theory', name : 'Lakmal Meegahapola', score : 99},
            {title : 'Mathematics', name : 'Dinuka Salvathura', score : 97}];




        }]


);


app.controller('NotificationsCtrl', ['$scope', '$http',
        function($scope, $http) {



            $scope.NotificationsList= [{}];


        }]


);

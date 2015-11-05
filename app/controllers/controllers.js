/**
 * Created by NADUN on 8/13/2015.
 */



app.controller('GroupCtrl', function($scope,$http,$rootScope){

    $scope.QuizList = [];

    $scope.addQuiz = function () {
        var array = {title:$scope.q.Title,id:$scope.QuizList.length};
        $scope.QuizList.push(array);
        $scope.q.Title = "";
    }

});



app.controller('MemberCtrl', ['$scope', '$routeParams', '$http', '$rootScope',
    function($scope, $routeParams, $http , $rootScope ) {


        $scope.options = [{text:"",id:0},{text:"",id:1}];
        $scope.answer = {text:""};

        $scope.addOption = function(){
            $scope.options.push({text:"",id:$scope.options.length});
        };

        $scope.questions = [];
        $scope.addQuestion = function()
        {
            var question1 = {text:$scope.question,options:$scope.options,answer:$scope.answer.text};
            var newObject = JSON.parse(JSON.stringify(question1));
            $scope.questions.push(newObject);
            //console.show(newObject);
            $scope.question = "";
            $scope.options = [{text:"",id:0},{text:"",id:1}];
            $scope.answer.text = "";
        };



        //console.log($routeParams);
        $scope.GroupID = $routeParams.groupId;

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

app.controller('TransCtrl', ['$scope', '$http',
        function($scope, $http) {

            //var x = document.getElementById("nat").defaultValue;

            //var idz = $scope.NatIdentity;
            var amountz = null;
            var dueDatez = null;
            var TDate = null;
            var CSE  = null;
            var idz = null;
            console.log(idz);

            //$scope.trans = function (idz,amountz,dueDatez,TDate,CSE) {
            //    $http.post('http://104.236.206.83:3000/transaction',{
            //        id :idz,
            //        amount : amountz,
            //        due: dueDatez,
            //        date: TDate,
            //        code:CSE
            //
            //    });
            //    console.log(idz,amountz,dueDatez,TDate,CSE);
            //
            //    $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            //        $scope.MembersList = data;
            //        list = data;
            //        console.log(data);
            //        init2();
            //    });
            //
            //
            //
            //};

            $scope.setNIC =function(val){

                $scope.NatIdentity= val;

            };




        }]


);


/*
app.controller('MemberCtrl', ['$scope', 'membersFact', function($scope, membersFact)
{
    $scope.MembersList = membersFact.GetData();

}]);
*/


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

app.controller('DueCtrl', ['$scope', '$http',
        function($scope, $http) {



            $scope.DueList=null;
            //console.log($routeParams);

            $scope.mypromisedue = $http.get('http://104.236.206.83:3000/recent').success(function(data) {
                $scope.DueList = data;
            });


        }]


);


app.controller('NotificationsCtrl', ['$scope', '$http',
        function($scope, $http) {



            $scope.NotificationsList=null;
            //console.log($routeParams);

            $scope.mypromisedue = $http.get('http://104.236.206.83:3000/getNotifi').success(function(data) {
                $scope.NotificationsList = data;
            });
            //console.log(NotificationsList);


        }]


);

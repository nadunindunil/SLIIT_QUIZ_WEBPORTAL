/**
 * Created by NADUN on 8/13/2015.
 */



app.controller('GroupCtrl', function($scope,$http,$rootScope){

    $rootScope.area = null;
    $rootScope.PID = null;
    $scope.listofGroups= null;
    var groupList = null;

    //$scope.mypromise2 =
        $http.get('http://104.236.206.83:3000/group.summary')
        .success(function(data) {
            console.log(data);
            $scope.listofGroups = data;
            var groupList = $scope.listofGroups;
        });

    //);




    $scope.insertQuiz = function(){
        // quiz function is  partially done - Nadun
        var Balance = $scope.Balance;
        var ID = $scope.id;
        var product = $scope.PID;
        var title = $scope.Title;

        var NextBal = Balance/Number;
        var Area = $scope.area.charAt(0).toUpperCase() + $scope.area.substr(1).toLowerCase();
        var pre = Area.substring(0, 3);
        var pre2 = pre.toUpperCase();
        ID = pre2+ ID;
        $rootScope.area = Area;
        $rootScope.PID = product;
        $rootScope.balTOmem = NextBal;

        console.log(title);

        // send notifications needed
        var x= 0;
        for( var i=0 ; i < $scope.listofGroups.length ; i++ ){
            console.log("in loop");
            if ($scope.listofGroups[i]._id == ID){
                alert(" Quiz name " + title + " Exist!");
                x=1;
                console.log("loop ends");
                break;

            }

        }

        if (x == 0){

            $http.post('http://104.236.206.83:3000/createNotifi',{ info: "Quiz " + title
            +" added!"});


            //groupService.insertGroup(Balance,Area,ID,number);
            $scope.listofGroups.push({ _id : ID ,
                number : Number ,
                balance: Balance,
                area: Area} );
        }


    };



    $scope.deleteGroup = function(Id){

        $scope.mypromiseDGroups = $http.get('http://104.236.206.83:3000/deletegroup/' + Id ).success(function(data) {
            $scope.listofGroups = data;
            console.log(data);
            console.log("success group delete");


        });


        $scope.mypromise = $http.get('hhttp://104.236.206.83:3000/group.summary').success(function(data) {
            $scope.listofGroups = data;

            console.log(data);
            init2();
        });

        $http.post('http://104.236.206.83:3000/createNotifi',{ info: "Group "+ Id + " Deleted " });


    }
});

/*
app.controller('GroupCtrl', ['$scope', 'groupsFact', function($scope, groupsFact)
{
    $scope.listofGroups = groupsFact.GetData();


}]);
*/


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
        $scope.GroupID = $routeParams.groupId





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

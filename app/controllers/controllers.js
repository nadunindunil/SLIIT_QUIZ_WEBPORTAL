/**
 * Created by NADUN on 8/13/2015.
 */



app.controller('GroupCtrl', function($scope,$http,$rootScope){

    $rootScope.area = null;
    $rootScope.PID = null;
    $scope.listofGroups= null;
    var groupList = null;

    $scope.mypromise2 = $http.get('http://104.236.206.83:3000/group.summary')
        .success(function(data) {
            console.log(data);
            $scope.listofGroups = data;
            var groupList = $scope.listofGroups;
        }

    );




    $scope.insertGroup = function(){

        var Balance = $scope.Balance;
        var ID = $scope.id;
        var product = $scope.PID;
        var Number = $scope.memNO;

        var NextBal = Balance/Number;
        var Area = $scope.area.charAt(0).toUpperCase() + $scope.area.substr(1).toLowerCase();
        var pre = Area.substring(0, 3);
        var pre2 = pre.toUpperCase();
        ID = pre2+ ID;
        $rootScope.area = Area;
        $rootScope.PID = product;
        $rootScope.balTOmem = NextBal;

        console.log(Number,Area,Balance,product,NextBal);

        // send notifications needed
        var x= 0;
        for( var i=0 ; i < $scope.listofGroups.length ; i++ ){
            console.log("in loop");
            if ($scope.listofGroups[i]._id == ID){
                alert(" Group " + ID + " Exist!");
                x=1;
                console.log("loop ends");
                break;

            }

        }

        if (x == 0){

            $http.post('http://104.236.206.83:3000/createNotifi',{ info: "Group " + ID
            +" added to Database with " + Balance + " number of members: " + Number});


            //groupService.insertGroup(Balance,Area,ID,number);
            $scope.listofGroups.push({ _id : ID ,
                number : Number ,
                balance: Balance,
                area: Area} );
        }


    };

    /*
    $scope.addGroup = function(balance,NoMembers,Area,ID){

        $http.post();

    };
    */

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





        $scope.MembersList=null;
        var list = null;
        var fil = null;
        var Area = null;
        var balance= null;

        //console.log($routeParams);
        $scope.GroupID = $routeParams.groupId;
        $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            $scope.MembersList = data;
            list = data;
            console.log(data);
            init2();
        });



        $scope.reset = function(){
            $scope.firstName = null;
            $scope.lastName = null;
            $scope.DDate = null;
            $scope.nic = null;
            $scope.Balance = null;
            $scope.area = null;
            $scope.addr = null;
            $scope.telephone = null;

        };



        function init2(){


            if (list.length != 0){
                console.log("nad");
                 fil = list[0].ProductID;
                 $scope.area = list[0].Area;
                Area = $scope.area;
                balance = list[0].Balance;
                $scope.Balance = balance;
            }
            else{
                console.log("in else");
                 fil = $rootScope.PID;
                $scope.area = $rootScope.area;
                Area = $scope.area;
                balance = $rootScope.balTOmem;
                $scope.Balance = balance;

            }
            console.log(balance);



        }

        //input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();

        $scope.addMember = function(){
            var FName  = $scope.firstName.charAt(0).toUpperCase() + $scope.firstName.substr(1).toLowerCase() ;
            var LName  = $scope.lastName.charAt(0).toUpperCase() + $scope.lastName.substr(1).toLowerCase();
            var ddate  = $scope.DDate;
            var  Nic   = $scope.nic ;

            //var Area   = $scope.area.charAt(0).toUpperCase() + $scope.area.substr(1).toLowerCase();
            var gid =    $scope.GroupID;
            var Addr =   $scope.address.charAt(0).toUpperCase() + $scope.address.substr(1).toLowerCase();
            var teleph = $scope.telephone;


            console.log(Addr);

            $http.post('http://104.236.206.83:3000/createNotifi',{ info: "Member "+ FName+" "+LName + " added to Group " + $scope.GroupID });

            console.log("after post noti");

            $http.post('http://104.236.206.83:3000/adduser',{ id : Nic ,
                first : FName ,
                last: LName,
                area: Area,
                amount : balance,
                date : ddate,
                gid : gid,
                address :Addr,
                tel : teleph,
                product : fil
            });

            $scope.MembersList.push({NIC : Nic ,
                FirstName : FName ,
                LastName : LName,
                Area: Area,
                Balance : balance,
                DueDate : ddate


        });
            // send notifications needed

            //$scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
            //    $scope.MembersList = data;
            //    list = data;
            //    console.log(data);
            //    init2();
            //});



        };

        $scope.deleteMember=function(Id){

            var user = null;

            //for (var i = $scope.MembersList.length - 1; i >= 0; i--) {
            //    console.log($scope.MembersList[i].NIC);
            //    if ($scope.MembersList[i].NIC === Id) {
            //        //$scope.MembersList.splice(i, 1);
            //        console.log("success in local",MembersList[i].FirstName);
            //        break;
            //    }
            //}
            $http.get('http://104.236.206.83:3000/find/' + Id ).success(function(data) {
                //user = data;
                console.log(data.FirstName,data.LastName);
                $http.post('http://104.236.206.83:3000/createNotifi',{ info: "Member "+ data.FirstName +" " + data.LastName + " deleted from Group " + $scope.GroupID });

            });

            // send notifications needed

            $scope.mypromiseDmember = $http.get('http://104.236.206.83:3000/delete/' + Id ).success(function(data) {
                $scope.MembersList = data;
                console.log(data);
                console.log("success");


            });

            $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
                $scope.MembersList = data;
                list = data;
                console.log(data);
                init2();
            });


        };


        var amountz = null;
        var dueDatez = null;
        var TDate = null;
        var CSE  = null;
        var idz = null;
        console.log(idz);


        $scope.trans = function (idz,amountz,dueDatez,TDate,CSE) {

            $http.get('http://104.236.206.83:3000/find/' +idz ).success(function(data) {
                $scope.Member = data;
                list = data;
                console.log(data);

                var y= 0;
                var c =0;


                if ($scope.Member.Balance < amountz || amountz < 1 ){


                    alert("enter valid amount!");
                }
                else if (dueDatez < TDate){

                    alert("Due Date must be greater than Ttoday's date!");


                }
                else{

                    console.log("loop ends");
                    $http.post('http://104.236.206.83:3000/transaction',{
                        id :idz,
                        amount : amountz,
                        due: dueDatez,
                        date: TDate,
                        code:CSE

                    });
                    console.log("pre");


                    console.log(idz,amountz,dueDatez,TDate,CSE);


                    // send notifications needed

                    $http.get('http://104.236.206.83:3000/find/' + idz ).success(function(data) {
                        //user = data;
                        console.log(data.FirstName,data.LastName);
                        $http.post('http://104.236.206.83:3000/createNotifi',{ info: "Member "+ data.FirstName +" " + data.LastName +" in "+ data.Group + " paid Rs." + amountz +".00"});

                    });

                    getList();


                    $scope.NatIdentity = null;
                    $scope.Bal = null;
                    $scope.DuDate = null;
                    $scope.toDate = null;
                    $scope.offName = null;
                }






            });









        };


        $scope.getList = function(){
            $scope.MembersList=null;

            $scope.mypromise = $http.get('http://104.236.206.83:3000/groupinfo/' + $routeParams.groupId ).success(function(data) {
                $scope.MembersList = data;
                list = data;
                console.log(data);
                init2();
            });
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

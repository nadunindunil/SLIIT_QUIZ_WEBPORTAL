/**
 * Created by NADUN on 8/14/2015.
 */

app.factory('groupsFact', function ($q, $http) {
    var listofGroups = null;

    function LoadData() {
        var defer = $q.defer();
        $http.get('http://104.236.206.83:3000/group.summary').success(function (data) {
            listofGroups = data;
            defer.resolve();
        });
        return defer.promise;
    }

    return {
        GetData: function () { return listofGroups ; },
        LoadData:LoadData
    }
});


app.factory('membersFact',['$routeParams','$http','$q',function ($q, $http, $routeParams) {
    var MembersList = null;

    function LoadData() {
        var defer = $q.defer();
        $http.get('http://104.236.206.83:3000/groupinfo/'+ $routeParams.groupId).success(function (data) {
            MembersList = data;
            defer.resolve();
        });
        return defer.promise;
    }

    return {
        GetData: function () { return MembersList ; },
        LoadData:LoadData
    }

}]);

app.service('groupService',function (){

    this.insertGroup = function(Balance, Area , ID , number){

        listofGroups.push({
            _id: ID,
            number: number,
            balance: Balance

        });

        $scope.services.push.apply($scope.services, data.services);
    };

    this.getGroups = function () {
        return listofGroups;
    };
})
var app = angular.module("dcos", []);
app.controller("dcos", function($scope,$interval,$q,$http) {

    $scope.items = []
    $scope.user="";
    $scope.text="";

    $scope.sendItem = function(){
        data = {
            'user' : $scope.user,
            'text' : $scope.text
        }
        console.log("sending...")
        console.log($scope.user + $scope.text);
        $http({
            method : 'POST',
            //url :  'http://dcosagentkgwaodciyfoem.eastus.cloudapp.azure.com/api/save',
            url :  'http://containers.byprice.com/api/save',
            data : data
        }).then(function(result){
            $scope.user = "";
            $scope.text = "";
        },function(reason){
            console.error(reason)
        });
    }

    // Consulta periodica
    $scope.getNewItems = function(){
        // fecha del último post
        console.log($scope.items)
        if($scope.items.length <= 0){
            last_date = '2016-01-01';
        }else{
            last_date = $scope.items[0].date
        }
        var qry = "?q="+last_date
        //$http.get('http://dcosagentkgwaodciyfoem.eastus.cloudapp.azure.com/api/fetch' + qry )
        $http.get('http://container.byprice.com/api/fetch' + qry )
        .success(function(result){
            if(result.items.length > 0)
                result.items.reverse()
                for(var i in result.items)
                    $scope.items.unshift(result.items[i])

        })
        .error(function(data, status){
            console.error(status)
        });
    }

    $interval($scope.getNewItems ,500)


});

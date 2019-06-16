// poi controller
// angular.module("myApp")
// .controller("poiController", function ($scope) {
//     self = this;
//     self.cities = {
//         1: {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"},
//         2: {name:"Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg"},
//         3: {name:"London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg"}
//     }
// });
angular.module("myApp").controller("poiController", function ($scope, $http, $window, $rootScope) {
    $scope.orderByField = 'CategoryName';
    $scope.reverseSort = false;
    $rootScope.FavPOIs = [];
    $http({
        method : "GET",
        url : "http://localhost:3000/poi/GetAllPOI"
    }).then(function success(response){
        $scope.allPOIs=response.data;
    }, function myError(response){
        
    });

    $scope.showSingle=function(singlePOI){
        $rootScope.SinglepoinumberOfViews=singlePOI.numberOfViews;
        $rootScope.SinglepoiDescription=singlePOI.poiDescription;
        $rootScope.Singlepoirank=singlePOI.rank;
        $rootScope.SinglepoiID=singlePOI.poiID;
        $rootScope.SinglepoiName=singlePOI.name;
        $rootScope.SinglepoiCategoryName=singlePOI.CategoryName;
        $rootScope.SinglepoiImage=singlePOI.poiImage;
        $window.location.href = "#!/singlePOIWindow";
    }

    $scope.addPOI = function(item)
        {
            $scope.booleani=true;
            angular.forEach($rootScope.FavPOIs, function(value) {
                    if(value.name==item.name)
                        $scope.booleani=false;
            })
            if($scope.booleani==true){
                $rootScope.FavPOIs.push(item);
            }
        }
    
        $scope.deletePOI = function(item)
        {
            $scope.booleani=true;
            $scope.temp=[];
            angular.forEach($rootScope.FavPOIs, function(value) {
                    if(value.name!=item.name){
                        $scope.temp.push(value);
                    }
            })
            $rootScope.FavPOIs=$scope.temp;
        }

        $scope.isLoggedIn = function()
        {
            return false;
        }
        
});
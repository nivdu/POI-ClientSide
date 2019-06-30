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
    $scope.allPOIs = [];
    $scope.updates = [];
    $scope.categories = [];
    var arr = $window.sessionStorage.getItem("favoritesPOI"); 
    $scope.FavPOIs = arr?JSON.parse(arr):[];
    $scope.numOfSaved = $scope.FavPOIs.length;

    $http({
        method : "GET",
        url : "http://localhost:3000/poi/GetAllPOI"
    }).then(function success(response){
        $scope.allPOIs=response.data;
        $scope.updates = response.data;
    }, function myError(response){
        $scope.error = response.data;
    });

    //add GetCategory To server
    $http({
        method : "GET",
        url : "http://localhost:3000/categories/GetAllCategories"
    }).then(function success(response){
        $scope.categories=response.data;
    }, function myError(response){
        $scope.error = response.data;//todo change
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

    $scope.updatePoi = function(){
        $scope.updates = [];
        angular.forEach($scope.allPOIs, function(value){
            if(value.name.match($scope.searchPOI) && ( value.CategoryName.match($scope.selectCategory) 
            || $scope.selectCategory.match("Show All"))){
                $scope.updates.push(value);
            }
        })
        //ifshow err
        if($scope.updates.length == 0){
            $scope.savingAlert = "There is no points of interest matching your search."
        }
        else{
            $scope.savingAlert = "";
        }
    }
    

    $scope.addPOI = function(item)
    {
        $scope.booleani=true;
        var arr = $window.sessionStorage.getItem("favoritesPOI"); 
        $scope.FavPOIs = arr?JSON.parse(arr):[];
        angular.forEach($scope.FavPOIs, function(value) {
                if(value.name==item.name)
                    $scope.booleani=false;
        })
        if($scope.booleani==true){
            item.indexPoi = $scope.FavPOIs.length+1;
            $scope.FavPOIs.push(item);
            $window.sessionStorage.removeItem("favoritesPOI"); 
            $window.sessionStorage.setItem("favoritesPOI",JSON.stringify($scope.FavPOIs));
            $scope.numOfSaved = $scope.FavPOIs.length;
        }
    }

    $scope.deletePOI = function(item)
    {
        $scope.booleani=true;
        $scope.temp=[];
        var arr = $window.sessionStorage.getItem("favoritesPOI"); 
        $scope.FavPOIs = arr?JSON.parse(arr):[];
        angular.forEach($scope.FavPOIs, function(value) {
                if(value.name!=item.name){
                    $scope.temp.push(value);
                }
        })
        // $rootScope.FavPOIs=$scope.temp;
        $window.sessionStorage.removeItem("favoritesPOI"); 
        $window.sessionStorage.setItem("favoritesPOI",JSON.stringify($scope.temp));
        $scope.numOfSaved = $scope.FavPOIs.length;
    }

    $scope.isLoggedIn = function()
    {
        if($rootScope.currUser!="guest"){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.SaveFavoritePoi = function(){
        var arr = $window.sessionStorage.getItem("favoritesPOI"); 
        $scope.FavPOIs = arr?JSON.parse(arr):[];
        
        var poiIDs = [];
        
        for(var i in $scope.FavPOIs) {    
        
            var item = $scope.FavPOIs[i];   
            
            poiIDs.push({ 
                "poiId" : parseInt(item.poiID),
                "indexPoi"  : parseInt(item.indexPoi)
            });
        }

        $http({
            method : "POST",
            url : "http://localhost:3000/private/poi/SavePOIForUser",
            headers : {
                'x-auth-token': $rootScope.token
            },
            data:{poiIDs}
        }).then(function success(response){
            $scope.savingAlert = response.data;
        }, function myError(response){
            $scope.savingAlert = response.statusText;
        }); 
    }

});

angular.module("myApp").controller("favoritesPOICtrl", function ($scope,$filter, $http, $window, $rootScope) {
    $scope.orderByField = 'CategoryName';
    $scope.reverseSort = false;
    $scope.indexOfFav = 0;

    var arr = $window.sessionStorage.getItem("favoritesPOI"); 
    $scope.favors = arr?JSON.parse(arr):[];

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
        var count = 1;
        for (let index = 0; index < $scope.temp.length; index++) {
            $scope.temp[index].indexPoi = count;
            count++;
        }
        // $rootScope.FavPOIs=$scope.temp;
        $window.sessionStorage.removeItem("favoritesPOI"); 
        $window.sessionStorage.setItem("favoritesPOI",JSON.stringify($scope.temp));
        $scope.favors = $scope.temp;
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

    $scope.poiDownIndexUp = function(currpoi){
        var arr = $window.sessionStorage.getItem("favoritesPOI"); 
        $scope.FavPOIs = arr?JSON.parse(arr):[];
        if(currpoi.indexPoi < $scope.FavPOIs.length){
            var poiChangeDown = $filter('filter')($scope.FavPOIs, {'indexPoi':(currpoi.indexPoi+1)});
            poiChangeDown[0].indexPoi = poiChangeDown[0].indexPoi - 1;
            currpoi.indexPoi = currpoi.indexPoi + 1;
            $scope.temp = [];
            angular.forEach($scope.FavPOIs, function(value){
                if(value.poiID == currpoi.poiID){
                    $scope.temp.push(currpoi);
                }
                else if(value.poiID == poiChangeDown[0].poiID){
                    $scope.temp.push(value);
                }
                else{
                    $scope.temp.push(value);
                }
            }) 
            $window.sessionStorage.removeItem("favoritesPOI"); 
            $window.sessionStorage.setItem("favoritesPOI",JSON.stringify($scope.temp));
            $scope.favors = $scope.temp;
        }
    }

    $scope.poiUpIndexDown = function(currpoi){
        var arr = $window.sessionStorage.getItem("favoritesPOI"); 
        $scope.FavPOIs = arr?JSON.parse(arr):[];
        if(currpoi.indexPoi > 0){
            var poiChangeDown = $filter('filter')($scope.FavPOIs, {'indexPoi':(currpoi.indexPoi-1)});
            poiChangeDown[0].indexPoi = poiChangeDown[0].indexPoi + 1;
            currpoi.indexPoi = currpoi.indexPoi - 1;
            $scope.temp = [];
            angular.forEach($scope.FavPOIs, function(value){
                if(value.poiID == currpoi.poiID){
                    $scope.temp.push(currpoi);
                }
                else if(value.poiID == poiChangeDown[0].poiID){
                    $scope.temp.push(value);
                }
                else{
                    $scope.temp.push(value);
                }
            }) 
            $window.sessionStorage.removeItem("favoritesPOI"); 
            $window.sessionStorage.setItem("favoritesPOI",JSON.stringify($scope.temp));
            $scope.favors = $scope.temp;
        }
    }

    $scope.passPoiIDReview = function (event) {
        $scope.poiIDOfReview = event.target.id;
    }

    $scope.sendReview = function(){
        $http({
            method : "POST",
            url : "http://localhost:3000/private/poi/SaveReviewOfPOI",
            headers : {
                'x-auth-token': $rootScope.token
            },
            data:{ poiID: $scope.poiIDOfReview, rank: $scope.selectRank, description: $scope.reviewContent}
        }).then(function success(response){
            $scope.savingAlert = response.data;
        }, function myError(response){
            $scope.savingAlert = response.data;
        }); 
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

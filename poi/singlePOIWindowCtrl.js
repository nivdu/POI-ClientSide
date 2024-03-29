angular.module("myApp").controller("singlePOIWindowCtrl", function ($scope, $window, $http, $rootScope) {
    // navPOI.get('/GetPOIDetails/:poiID', function(req,res){
    $http({
        method : "GET",
        url : "http://localhost:3000/poi/GetPOIDetails/" + $rootScope.SinglepoiID
    }).then(function success(response){
        $scope.item = response.data.poiDetalis[0];
        $rootScope.SinglepoinumberOfViews=response.data.poiDetalis[0].numberOfViews;
        $rootScope.SinglepoiDescription=response.data.poiDetalis[0].poiDescription;
        $rootScope.Singlepoirank=response.data.poiDetalis[0].rank;
        $rootScope.SinglepoiID=response.data.poiDetalis[0].poiID;
        $rootScope.SinglepoiName=response.data.poiDetalis[0].name;
        $rootScope.SinglepoiCategoryName=response.data.poiDetalis[0].CategoryName;
        $rootScope.SinglepoiImage=response.data.poiDetalis[0].poiImage;
        if(response.data.poiLastReviews.length>=1){
            $rootScope.SinglepoiReview1 = response.data.poiLastReviews[0];
            $scope.review1 = true;
        }
        if(response.data.poiLastReviews.length>=2){
            $scope.review2 = true;
            $rootScope.SinglepoiReview2 = response.data.poiLastReviews[1];
        }
            
    }, function myError(response){
        //todo - add error
    });

    $scope.addPOI = function()
    {
        $scope.booleani=true;
        var arr = $window.sessionStorage.getItem("favoritesPOI"); 
        $scope.FavPOIs = arr?JSON.parse(arr):[];
        angular.forEach($scope.FavPOIs, function(value) {
                if(value.name == $scope.item.name)
                    $scope.booleani=false;
        })
        if($scope.booleani==true){
            $scope.item.indexPoi = $scope.FavPOIs.length+1;
            $scope.FavPOIs.push($scope.item);
            $window.sessionStorage.removeItem("favoritesPOI"); 
            $window.sessionStorage.setItem("favoritesPOI",JSON.stringify($scope.FavPOIs));
        }
    }

    $scope.deletePOI = function(item)
    {
        $scope.booleani=true;
        $scope.temp=[];
        var arr = $window.sessionStorage.getItem("favoritesPOI"); 
        $scope.FavPOIs = arr?JSON.parse(arr):[];
        angular.forEach($scope.FavPOIs, function(value) {
                if(value.name!=$scope.item.name){
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


// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

//     $scope.initAutocomplete = function() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: -33.8688, lng: 151.2195},
//         zoom: 13,
//         mapTypeId: 'roadmap'
//     });
  
//     // Create the search box and link it to the UI element.
//     var input = document.getElementById('pac-input');
//     var searchBox = new google.maps.places.SearchBox(input);
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener('bounds_changed', function() {
//       searchBox.setBounds(map.getBounds());
//     });
  
//     var markers = [];
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener('places_changed', function() {
//       var places = searchBox.getPlaces();
  
//       if (places.length == 0) {
//         return;
//       }
  
//       // Clear out the old markers.
//       markers.forEach(function(marker) {
//         marker.setMap(null);
//       });
//       markers = [];
  
//       // For each place, get the icon, name and location.
//       var bounds = new google.maps.LatLngBounds();
//       places.forEach(function(place) {
//         if (!place.geometry) {
//           console.log("Returned place contains no geometry");
//           return;
//         }
//         var icon = {
//           url: place.icon,
//           size: new google.maps.Size(71, 71),
//           origin: new google.maps.Point(0, 0),
//           anchor: new google.maps.Point(17, 34),
//           scaledSize: new google.maps.Size(25, 25)
//         };
  
//         // Create a marker for each place.
//         markers.push(new google.maps.Marker({
//           map: map,
//           icon: icon,
//           title: place.name,
//           position: place.geometry.location
//         }));
  
//         if (place.geometry.viewport) {
//           // Only geocodes have viewport.
//           bounds.union(place.geometry.viewport);
//         } else {
//           bounds.extend(place.geometry.location);
//         }
//       });
//       map.fitBounds(bounds);
//     });
//   }
    // $http({
    //     method : "GET",
    //     url : "http://localhost:3000/poi/GetAllPOI"
    // }).then(function success(response){
    //     $scope.allPOIs=response.data;
    // }, function myError(response){
        
    // });
});


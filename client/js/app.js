var app = angular.module('childrensFund', ['ui.router', 'ngCookies'])

app.config(function($stateProvider, $locationProvider){

  $stateProvider
    // Command + K, Command + 3 to make this intelligible
    //################## Public ROUTES #####################
    .state('home', {
      url: '/',
      templateUrl: '/templates/public/home.html '
    })
    .state('cart', {
      url: '/cart',
      templateUrl: '/templates/public/cart.html'
    })
    .state('children', {
      url: '/childrens',
      templateUrl: '/templates/public/children.html'
    })
    .state('child', {
      url: '/child',
      templateUrl: '/templates/public/child.html'
    })
    //################## Donor ROUTES #####################
    .state('donors', {
      abstract: true,
      template: '<ui-view/>',
      data: { userType: 'donors' }
    })
      .state('donors.account', {
        url: '/account',
        templateUrl: '/templates/donors/account.html'
      })
      .state('donors.signup', {
        url: '/signup',
        templateUrl: '/templates/authentication/signupView.html',
        controller: 'authController'
      })
      .state('donors.signin', {
        url: '/signin',
        templateUrl: '/templates/authentication/signinView.html',
        controller: 'authController'
      })
      .state('donors.sendReset', {
        url: '/send_reset',
        templateUrl: '/templates/authentication/sendResetView.html',
        controller: 'authController'
      })
      .state('donors.resetPassword', {
        url: '/reset_password',
        templateUrl: '/templates/authentication/passwordResetView.html',
        controller: 'authController'
      })
    //################## Worker ROUTES #####################
    .state('workers', {
      abstract: true,
      template: '<ui-view/>',
      data: { userType: 'workers' }
    })
      .state('workers.account', {
        url: '/workers/account',
        templateUrl: '/templates/workers/account.html',
        controller: 'authController'
      })
      .state('workers.signin', {
        url: '/workers/signin',
        templateUrl: '/templates/authentication/signinView.html',
        controller: 'authController'
      })
      .state('workers.sendReset', {
        url: '/workers/send_reset',
        templateUrl: '/templates/authentication/sendResetView.html',
        controller: 'authController'
      })
      .state('workers.resetPassword', {
        url: '/workers/reset_password',
        templateUrl: '/templates/authentication/resetPasswordView.html',
        controller: 'authController'
      })
    //################## Admin ROUTES #####################
    .state('admin', {
      abstract: true,
      template: '<ui-view/>',
      data: { userType: 'admin' }
    })
      .state('admin.account', {
        url: '/admin/account',
        templateUrl: '/templates/admin/account.html',
        controller: 'authController'
      })
      .state('admin.signin', {
        url: '/admin/signin',
        templateUrl: '/templates/authentication/signinView.html',
        controller: 'authController'
      })
      .state('admin.sendReset', {
        url: '/admin/send_reset',
        templateUrl: '/templates/authentication/sendResetView.html',
        controller: 'authController'
      })
      .state('admin.resetPassword', {
        url: '/admin/reset_password',
        templateUrl: '/templates/authentication/sendResetView.html',
        controller: 'authController'
      })

})

app.controller('appCtrl', function($state, $scope, $rootScope){
  $rootScope.$on('$stateChangeStart', function(){
    console.log('state change detected');
  })
})

// ui-router configuration
// app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.otherwise('/');

//   $stateProvider
//   // root view is for donors
//   .state('/', {
//     url: '/',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html'},
//       firstView: { templateUrl: 'templates/userViews/donorView.html', controller: 'inputController' },
//       secondView: { templateUrl: 'templates/userViews/donorChildrenFeedView.html', controller: 'inputController' }
//     }
//   })

//   // view for workers (nav bar, input field and list of children)
//   .state('workersPortal', {
//     url: '/workers',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html'},
//       firstView: { templateUrl: 'templates/userViews/workerView.html', controller: 'inputController' },
//       secondView: { templateUrl: 'templates/userViews/workerChildrenFeedView.html', controller: 'inputController' }
//     }
//   })

//   // view for workers to create a new child tag
//   .state('createTag', {
//     url: '/create',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html'},
//       firstView: { templateUrl: 'templates/userViews/workerChildInputView.html', controller: 'inputController' }
//     }
//   })

//   //Authentication Handlers
//   .state('signup', {
//     url: '/{userType:donors|workers|admin}/signup',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html' },
//       firstView: { templateUrl: 'templates/authentication/signupView.html', controller: 'authController' }
//     }
//   })

//   .state('signin', {
//     url: '/{userType:donors|workers|admin}/signin',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html' },
//       firstView: { templateUrl: 'templates/authentication/signinView.html', controller: 'authController' }
//     }
//   })

//   .state('signout', {
//     url: '/{userType:donors|workers|admin}/signout',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html' },
//       firstView: { templateUrl: 'templates/authentication/signoutView.html', controller: 'authController' }
//     }
//   })

//   .state('sendReset', {
//     url: '/{userType:donors|workers|admin}/send_reset',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html' },
//       firstView: { templateUrl: 'templates/authentication/sendResetView.html', controller: 'authController' }
//     }
//   })

//   .state('resetPassword', {
//     url: '/{userType:donors|workers|admin}/reset_password/:resetToken',
//     views: {
//       navMenuView: { templateUrl: '/templates/developerViews/navMenu.html' },
//       firstView: { templateUrl: 'templates/authentication/resetView.html', controller: 'authController' }
//     }
//   })
//   //End Authentication Handlers

// }])

.controller('inputController', ['$scope', 'restful', 'protect', function ($scope, restful, protect) {

  $scope.tempChildItemObj = {
    item: undefined, 
    status: undefined, 
    price: undefined, 
    paymentDate: undefined, 
    hsaReceivedDate: undefined, 
    childReceivedDate: undefined
  };

  // sets basic template for creating new child tags
  $scope.tempChildObj = {
    request: {
      // had to use extend otherwise all item field populate simultaneously 
      items: [_.extend({},$scope.tempChildItemObj), _.extend({},$scope.tempChildItemObj), _.extend({},$scope.tempChildItemObj)] 
    }
  };

  $scope.post = function () {
    // $scope.tempChildObj.worker.accountID = get signed-in worker's account ID here
    $scope.tempChildObj.request.createdAt = new Date();
    restful.createChild($scope.tempChildObj).then(function (promise) {
      if (promise) {
        return $scope.get();
      }
    });
  };

  $scope.get = function () {
    restful.getChildren().then(function (promise) {
      if (promise) {
        // sets $scope.children as received server data
        $scope.children = promise.data;
      }
    });
  };

  $scope.pledge = function (childObj, index) {
    // for a given child's item, sets pledged to true
    childObj.request.items[index].status = 'pledged';

    // then POSTs it to the server
    restful.updateChild(childObj).then(function (promise) {
      if (promise) {

        //after POST is completed, GETs updated data
          //necessary to updated Pledge/Pledged! buttons
        $scope.get();
      }
    });
  }

}])

//Authentication logic
.controller('authController', ['$scope', '$http', '$state', function($scope, $http, $state){
  $scope.signup = function(){
    if($scope.password === $scope.passwordConfirmation){
      $http({
        method: 'POST',
        url: '/auth/signup',
        data: {
          userType: $state.current.data.userType,
          email: $scope.email,
          password: $scope.password
        }
      }).success(function(data, status){
        console.log('User Created!');
      }).error(function(data, status){
        console.log('User Not Created: Server Error');
      })
    }
  };

  $scope.signin = function(){
    if($scope.password){
      $http({
        method: 'POST',
        url: '/auth/signin',
        data: {
          userType: $stateParams.userType,
          email: $scope.email,
          password: $scope.password
        }
      }).success(function(data, status){
        console.log('User signed in');
      }).error(function(data, status){
        console.log('User not signed in: Server Error');
      });
    }
  }

  $scope.signout = function(){
    $http({
      method: 'POST',
      url: '/auth/signout'
    }).success(function(data, status){
      console.log('User signed out');
    }).error(function(data, status){
      console.log('User not signed out: Server Error');
    });
  }

  $scope.signedIn = function(){
    $http({
      method: 'POST',
      url: '/auth/signedIn',
      data: {
        userType: $state.current.data.userType,
      }
    }).success(function(data, status){
    }).error(function(data, status){
    });
  }

  $scope.sendReset = function(){
    $http({
      method: 'POST',
      url: '/auth/sendReset',
      data: {
        userType: $state.current.data.userType,
        email: $scope.email
      }
    }).success(function(data, status){
      console.log('Reset token sent');
    }).error(function(data, status){
      console.log('Reset token not sent: Server Error');
    });
  }

  $scope.resetPassword = function(){
    $http({
      method: 'POST',
      url: 'auth/resetPassword',
      data: {
        userType: $state.current.data.userType,
        password: $scope.password,
        resetToken: $stateParams.resetToken
      }
    }).success(function(data, status){
      console.log('Password successfully reset');
    }).error(function(data, status){
      console.log('Password not reset: Server Error');
    });
  }

}])

// GET/POST logic
.factory('restful', ['$http', function ($http) {
  return {
    createChild: function (childObj) {
      return $http({
        method: 'POST',
        url: '/children',
        data: childObj
      }).success(function (data, status) {
        console.log('(Create) POST Success! ', data);
        return data;
      }).error(function (data, status) {
        console.log('(Create) POST Error! ', data, status);
      });
    },

    updateChild: function (childObj) {
      return $http({
        method: 'POST',
        url: '/children',
        data: childObj
      }).success(function (data, status) {        
        console.log('(Update) POST Success! ', data);
        return data;
      }).error(function (data, status) {
        console.log('(Update) POST Error! ', data, status);
      });
    },

    getChildren: function () {
      return $http({
        method: 'GET',
        url: '/children'
      }).success(function (data, status) {
        console.log('GET Success! ', data);
        return data;
      }).error(function (data, status) {
        console.log('GET Error! ', data, status);
      });
    }
  }
}])



/*

temporary object
{
  child: {
    firstName: 'Amar',
    lastName: 'Patel',
    phone: '19166008929',
    gender: 'male',
    dob: 'my birthday',
    age: 24,
    location: 'San Francisco',
    CFID: '00001A',
    programArea: 'somewhere',
    bio: 'Amar hails from a heritage of awesome and bad-assery.'
  },

  request: {
    createdAt: 'dateString',
    items: [
      {
        item: 'bike', 
        status: null, 
        price: null, 
        paymentDate: 'somedate',
        hsaReceivedDate: 'somedate',
        childReceivedDate: 'somedate'
      },
      {
        item: 'helmet', 
        status: null, 
        price: null, 
        paymentDate: 'somedate',
        hsaReceivedDate: 'somedate',
        childReceivedDate: 'somedate'
      },
      {
        item: 'babes', 
        status: null, 
        price: null, 
        paymentDate: 'somedate',
        hsaReceivedDate: 'somedate',
        childReceivedDate: 'somedate'
      }
    ]
  },

  worker: {
    accountID: 'string',
    firstName: 'Wayland',
    lastName: 'Gangsta-fresh',
    phone: '12903812124',
    email: 'someemail',
    department: 'someDept',
    supervisorFirstName: 'Marcus',
    supervisorLastName: 'Phillips',
    coordinatorFirstName: 'Tony',
    coordinatorLastName 'Phillips'
  },

  donor: {
    firstName: 'amar',
    lastName: 'patel',
    phone: '9166008929',
    email: 'someemail',
    address1: '1221 1st ave.',
    address2: 'apt se1801',
    city: 'seattle',
    state: 'washington',
    zip: '98101'
  }
};

*/


// This module when invoked will see if the user is signed in and authorized to view the page. It returns a promise
/* Valid parameters for protect = 'workers', 'donors', 'admin'
  protect('donors').success(function(status){
    if(status === false){
      //User is not authorized, redirect to signin page
    } else {
      //User is authorized, serve normal page
    }
  });

*/
.factory('sessionCache', function(){
  var cache = {};
  var sessionCacheService = {};
  sessionCacheService.updateSessionToken = function(sessionToken){
    cache.sessionToken = sessionToken;
  };

  sessionCacheService.updateUserType = function(userType){
    cache.userType = userType;
  };

  sessionCacheService.retrieveSessionToken = function(){
    return cache.sessionToken;
  };

  sessionCacheService.retrieveUserType = function(){
    return cache.userType;
  };
  return sessionCacheService;
})

.factory('protect', ['$cookies', '$q', '$http', 'sessionCache', function($cookies, $q, $http, sessionCache){
  var cookieSessionToken = $cookies.sessionToken;
  var cookieUserType = $cookies.type;
 
  //pageType needs to be 'donors' || 'workers' || 'admin'
  return function(pageType){
    console.log('################ Page is protected, checking login status ################');
    var deferred = $q.defer();
    if(!cookieSessionToken || !cookieUserType || cookieSessionToken === 'j:null' || cookieUserType === 'j:null'){
      console.log('Session token is null');
      deferred.resolve(false);
    } else if (sessionCache.retrieveSessionToken() === cookieSessionToken && sessionCache.retrieveUserType() === cookieUserType && cookieUserType === pageType) {
      console.log('Cached credentials');
      deferred.resolve(true);
    } else {
      console.log('Client has sessionId cookie, but no sessionId is cached in Angular. Awaiting server verification');
      $http({
        method: 'POST',
        url: '/auth/signedIn',
        data: {
          userType: pageType,
        }
      }).success(function(data, status){
        if(data.signedIn){
          console.log('Client authorized');
          sessionCache.updateSessionToken(cookieSessionToken);
          sessionCache.updateUserType(cookieUserType);
          deferred.resolve(true);
        } else {
          console.log('Client unauthorized');
          deferred.resolve(false);
        }
      }).error(function(){
        console.log('Server error: Preventing client access regardless');
        deferred.reject('There was a server error');
      });
    }
    return deferred.promise;
  }

}])

// verifies worker views
.directive('workerVerify', ['protect', '$location', function (protect, $location) {
  return {
    restrict: 'A',
    link: function (scope) {
      protect('workers').then(function (isWorker) {
        if (isWorker === false) {
          console.log('workerVerify changed path to /workers/signin');
          $location.path('/workers/signin');
        } else {
          scope.get();
          console.log('workerVerify allowed access');
        }
      })
    }
  }
}])

// verifies donor views
.directive('donorVerify', ['protect', '$location', function (protect, $location) {
  return {
    restrict: 'A',
    link: function (scope) {
      protect('donors').then(function (isWorker) {
        if (isWorker === false) {
          console.log('donorVerify changed path to /donors/signin');
          $location.path('/donors/signin');
        } else {
          scope.get();
          console.log('donorVerify allowed access');
        }
      })
    }
  }
}])

// verifies admin views
.directive('adminVerify', ['protect', '$location', function (protect, $location) {
  return {
    restrict: 'A',
    link: function (scope) {
      protect('admin').then(function (isWorker) {
        if (isWorker === false) {
          console.log('donorVerify changed path to /admin/signin');
          $location.path('/admin/signin');
        } else {
          console.log('donorVerify allowed access');
        }
      })
    }
  }
}])










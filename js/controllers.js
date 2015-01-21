angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.factory('CalendarService', function($q) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  var eventos =[
    {id: 123,title: 'All Day Event',start: new Date(y, m, 1),url: '#/event'},
    {id: 124,title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2),url: '#/event'},
    {id: 125,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false,url: '#/event'},
    {id: 126,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false,url: '#/event'},
    {id: 127,title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false,url: '#/event'},
    {id: 128,title: 'Test event',start: new Date(y, m, 28),end: new Date(y, m, 29),url: '#/event'}
  ];

  return{
    all: function() {
      var deferredEventos = $q.defer();
      deferredEventos.resolve(eventos);
      return deferredEventos.promise;
    },
  }
    
})

.controller('PlaylistsCtrl', function($scope, CalendarService) {

  /* alert on eventClick */
  $scope.dayClick = function( date, jsEvent, view ){
    console.log(date.format() + ' was clicked ');
    $scope.selectedDay = date.format();
    $('.calendar').find(".activeDay").removeClass("activeDay");
    $(this).addClass("activeDay");
    $scope.calendar.fullCalendar( 'gotoDate', date )
  }; 

  $scope.renderDay = function(date, cell) {
    if (date.date()===10){
      cell.css("background-color", "red");
    }
  };

  $scope.resizeCalendar = function(view, element) {
    if(view.name === 'agendaWeek' || view.name === 'agendaDay') {
        // if height is too big for these views, then scrollbars will be hidden
        view.setHeight(9999);
        $scope.monthView = false;
        $scope.eventSources = [$scope.events];
    }
    else {
      $scope.monthView = true;
      $scope.eventSources = [];
    }
  };
    $scope.uiConfig = {
      calendar:{
        //height: 200,
        //contentHeight: 'auto',
        //height: 'auto',
        firstDay: 1,
        editable: true,
        header:{
          left: '',
          center: 'title',
          right: 'today'
        },
        dayClick: $scope.dayClick,
        dayRender: $scope.renderDay,
        viewRender: $scope.resizeCalendar
      }
    };

    $scope.calendar = $("#calendar1");

    $scope.events=[];
    $scope.eventSources=[$scope.events];
    
    /*CalendarService.all().then(function(events){
      angular.forEach(events,function(event){
        $scope.events.push(event);
      });
    });*/
  $scope.next = function() {
    $scope.calendar.fullCalendar('next');
    /*try {
      $scope.$$childTail.eventCalendar.fullCalendar('next');
    }
    catch (err) {
      console.log(err.message);
    }*/
  };
  
  $scope.previous = function() {
    $scope.calendar.fullCalendar('prev');
    /*try {
      $scope.$$childTail.eventCalendar.fullCalendar('prev');
    }
    catch (err) {
      console.log(err.message);
    }*/
  };

  /* Change View */
  $scope.changeView = function(view,calendar) {
    $scope.calendar.fullCalendar('changeView',view);
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

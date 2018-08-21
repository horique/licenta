app.controller('NavbarController', function($scope) {
  // set administrator role managage page dropdown
  $scope.pages = [
    {
      name: 'Equipment Category',
      url: '#!/equipment_category'
    },
    {
      name: 'Equipment',
      url: '#!/equipment'
    },
    {
      name: 'Personnel Category',
      url: '#!/personnel_category'
    },
    {
      name: 'Personnel',
      url: '#!/personnel'
    },
    {
      name: 'Users',
      url: '#!/users'
    },
    {
      name: 'Roles',
      url: '#!/roles'
    },
    {
      name: 'User Roles',
      url: '#!/user_roles'
    },
    {
      name: 'Room',
      url: '#!/room'
    },
    {
      name: 'Room Equipments',
      url: '#!/room_equipments'
    },
    {
      name: 'Room Subjects',
      url: '#!/room_subjects'
    },
    {
      name: 'Room Type',
      url: '#!/room_type'
    }
    ,
    {
      name: 'Status Log',
      url: '#!/status_log'
    }
  ];
});

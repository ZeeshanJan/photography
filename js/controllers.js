function CtrlSnapList($scope, SnapService) {
    var snapsListPromise = SnapService.getAllSnaps();
    snapsListPromise.then(function (result) {
        $scope.snapsList = result;
    });
}
function CtrlAdmin($scope, SnapService) {
    $scope.service = SnapService

    $scope.$watch('service.isLogged', function () {
        console.log('hey, SnapService.isLogged has changed!', SnapService.isLogged);
    });

    $scope.login = function () {
        var loginPromise = SnapService.loginUser($scope.user, $scope.pass);
        loginPromise.then(function (result) {
            SnapService.isLogged = result;
        });
    }

    $scope.logout = function () {
        if (!SnapService.logoutUser()) {
            SnapService.isLogged = false;
        }
    }

    var albumPromise = SnapService.fetchAllAlbums();
    albumPromise.then(function (result) {
        console.log("Results: ", result)
        $scope.albums = result;
        $scope.selectAlbum = $scope.albums[0];
    });
}

/* Start File Upload Controller */
function TestController ($scope, $fileUploader) {
    // Creates a uploader
    var uploader = $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: 'phpinc/upload.php'
    });
    // ADDING FILTERS

    // Images only
    uploader.filters.push(function (item) {
        var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
        type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    });


    // REGISTER HANDLERS

    uploader.bind('afteraddingfile', function (event, item) {
        console.info('After adding a file', item);
    });

    uploader.bind('afteraddingall', function (event, items) {
        console.info('After adding all files', items);
    });

    uploader.bind('beforeupload', function (event, item) {
        console.info('Before upload', item);
    });

    uploader.bind('progress', function (event, item, progress) {
        console.info('Progress: ' + progress, item);
    });

    uploader.bind('success', function (event, xhr, item, response) {
        console.info('Success', xhr, item, response);
    });

    uploader.bind('cancel', function (event, xhr, item) {
        console.info('Cancel', xhr, item);
    });

    uploader.bind('error', function (event, xhr, item, response) {
        console.info('Error', xhr, item, response);
    });

    uploader.bind('complete', function (event, xhr, item, response) {
        console.info('Complete', xhr, item, response);
    });

    uploader.bind('progressall', function (event, progress) {
        console.info('Total progress: ' + progress);
    });

    uploader.bind('completeall', function (event, items) {
        console.info('Complete all', items);
    });
}
/* End - File Upload Controller */
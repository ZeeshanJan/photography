<?php
require('db.php');
require('dbfunctions.php');

if(isset($_GET['req'])) {

    $req = $_GET['req'];
    if(isset($_GET['user'])) {
        $cred['user'] = $_GET['user'];
        $cred['pass'] = $_GET['pass'];
    }

    switch($req) {
        case 'getallsnaps':
            getAllSnaps();
            break;
        case 'login':
            loginUser($cred);
            break;
        case 'logout':
            logoutUser();
            break;
        case 'getallalbums':
            getAllAlbums();
            break;
        default:
          //code to be executed if n is different from all labels;
    }
}

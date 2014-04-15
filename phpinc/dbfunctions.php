<?php

function getAllSnaps() {
    global $dbh;
    $sql = "SELECT * FROM tblsnap";
    $stmt = $dbh->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
}

function loginUser($us) {
     global $dbh;
     $stmt = $dbh->prepare("SELECT * FROM user WHERE username = :user_name AND password = :user_pass");

     $stmt->bindParam(':user_name', $us['user'], PDO::PARAM_STR);
     $stmt->bindParam(':user_pass', $us['pass'], PDO::PARAM_STR);
     $stmt->execute();
     $result = $stmt->fetch(PDO::FETCH_ASSOC);
     $total = $stmt->rowCount();
     if($total==1) {
         /*$_SESSION["userName"] = $us['user'];
         $_SESSION["userLoggedIn"] = true;
         $_SESSION["userID"] = $result['ID'];
         $_SESSION["timeout"] = time();*/
         echo true;
     }
     echo false;
 }

function getAllAlbums() {
     global $dbh;
     $stmt = $dbh->prepare("SELECT * FROM tblalbum");
     $stmt->execute();
     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
     echo json_encode($result);

}

function logoutUser() {
        $_SESSION["userName"] = null;
        $_SESSION["userLoggedIn"] = false;
        $_SESSION["userID"] = null;
        $_SESSION["timeout"] = time();

        echo $_SESSION["userLoggedIn"];
}
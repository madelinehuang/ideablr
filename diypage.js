//Fade in animation for comments
$(".commentInside").hide();
$(".commentInside:hidden").each(function(key, value)
{
    $(value).delay(key * 500).fadeIn(750);
});

function  commentOnPage()
{
    var loggedUser = $("#namer").text(); //username of the person logged in
    var article = $("#articletitle").text(); //article title of current page
    var newArticleComment = $("#insertComment").val();
        //Get date posted comment
        var date = new Date(); 
        var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var time = date.toLocaleTimeString();
        var q = time.lastIndexOf(":");
        time = time.substring(0,q) + time.substring(q+3);
        var date = m_names[date.getMonth()] + "  " + date.getDate() + ", " + (date.getFullYear())  + " at " + time;
        //AJAX to carry data to php file
		$.ajax({
            type: "POST",
            url: "articlecommentDB.php",
            data: {logUser: loggedUser, articleTitle: article, datePosted: date, newArtComment: newArticleComment},
            success: function(data) { window.location.href="diypage.php?article=" + article;}
            });
}

function deletePost()
{
        var curArt = $("#articletitle").text(); 
        if (confirm("You're about to delete the post " + curArt) == true) 
        {
                $.ajax({
                    type: "POST",
                    url: "deletepost.php",
                    data: {currentArticle: curArt},
                    success: function(redirect) {window.location.href="articledeleted.php";}
                    });
        } 
        else //Don't delete
        {}
}

function editPost()
{
        window.location.href="uploadform.php?edit=" + $("#articletitle").text();
}

function deleteComment(comment)
{
        var curArt = $("#articletitle").text(); 
        var loggedUser = $("#namer").text(); 
        var toDelete = comment;
        if (confirm("You're about to delete your comment - '" + toDelete + "' Confirm?") == true) 
        {
                $.ajax({
                    type: "POST",
                    url: "deletecommentDB.php",
                    data: {currentArticle: curArt, logUser: loggedUser, comToDelete: toDelete},
                    success: function(data) {location.reload();}
                    });
        } 
        else //Don't delete
        {}
}

function addFavorite()
{
        var curArt = $("#articletitle").text(); 
        var loggedUser = $("#namer").text(); 
        //Get date posted comment
        var date = new Date(); 
        var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var time = date.toLocaleTimeString();
        var q = time.lastIndexOf(":");
        time = time.substring(0,q) + time.substring(q+3);
        var date = m_names[date.getMonth()] + "  " + date.getDate() + ", " + (date.getFullYear())  + " at " + time;
        
        $.ajax({
                    type: "POST",
                    url: "addfavoriteDB.php",
                    data: {currentArticle: curArt, datePosted: date, logUser: loggedUser},
                    success: function(data){$("#favoriteButton").attr("onclick","deleteFavorite()"); $("#favoritetext").text("Favorited!");}
        });
}

function deleteFavorite()
{
        var curArt = $("#articletitle").text(); 
        var loggedUser = $("#namer").text(); 
        
        $.ajax({
                    type: "POST",
                    url: "deletefavoriteDB.php",
                    data: {currentArticle: curArt, logUser: loggedUser},
                    success: function(data){$("#favoriteButton").attr("onclick","addFavorite()"); $("#favoritetext").text("Favorite removed");}
        });
}

function goToLogin()
{
        window.location.href="login.html";
}

function rateArticle(rating)
{
        var curArt = $("#articletitle").text(); 
        var rated = rating;
        var loggedUser = $("#namer").text(); 
        
        $.ajax({
                    type: "POST",
                    url: "articleRateDB.php",
                    data: {currentArticle: curArt, userRating: rated, logUser: loggedUser},
                    success: function(data){updatetheNumofVotes();}
        });
}
//Fade in animation for comments
$(".commentInside").hide();
$(".commentInside:hidden").each(function(key, value)
{
    $(value).delay(key * 500).fadeIn(750);
});

//Check the url of page
var url = window.location.href;
var x = url.indexOf("?");
var n = url.indexOf("#");
var Userurl = url.substring(x+1,n);
var page = url.substring(n+1);

//Different actions for each of the different pages
function refresh()
    {
        location.reload(true);
    }
	
function editPage()
{
    location.href="#edit";
    refresh();
}

function savePage()
{
    var selected = $("#dropdown :selected").text();
    var user = $("#namer").text();
    var bioX = $("#bioinput").val();
                
    //AJAX to carry data to php file
    $.ajax({
        type: "POST",
        url: "profileupdateDB.php",
        data: {username: user, bioVal: bioX, dropdownVal: selected},
        });
    window.location.href="profile.php?" + Userurl + "#saved"; 
    refresh();
}
        
function  commentOnPage()
{
    var loggedUser = $("#namer").text(); //username of the person logged in
    var profileUser = $("#profile-name").text(); //username of current page
                
    //comment of the current profile page
    var newProfileComment = $("#insertComment").val();
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
            url: "profilecommentDB.php",
            data: {logUser: loggedUser, proUser: profileUser, datePosted: date, newProComment: newProfileComment},
            success: function(data) {window.location.href="profile.php?" + Userurl + "#saved"; refresh();}
            });
}

function deleteComment(comment)
{
        var curProfile = $("#profile-name").text();
        var loggedUser = $("#namer").text(); 
        var toDelete = comment;
        if (confirm("You're about to delete your comment - '" + toDelete + "' Confirm?") == true) 
        {
                $.ajax({
                    type: "POST",
                    url: "deleteprofilecommentDB.php",
                    data: {currentprofile: curProfile, logUser: loggedUser, comToDelete: toDelete},
                    success: function(data) {location.reload();}
                    });
        } 
        else //Don't delete
        {}
}

function uploadProfilePicture()
{
    $("input[id='photo']").click();
    $("#photo").change(function() {
            $('form#profileform').submit();
    });
}
        
//Different conditions for each page
if (page == "saved")
{
    window.location.href="profile.php?" + Userurl + "#overview";
    refresh();
}

if (page == "edit") //edit page
{
	$("#favtag").html("<form id=dropdown><select> <option>None</option> <option>Arts/crafts</option><option>Food</option><option>Technology</option><option>Other</option></select> </form>");
	$("#bio").html("<textarea id=bioinput rows=4 cols=40></textarea>");
	$("#editpage").html("Save Page");
	$("#editpage").attr("type","submit");
	//$("#editpage").attr("formaction","profileupdateDB.php");
	$("#editpage").attr("onclick","savePage();");
}

<!--Script for notification bubbles-->

function deleteNotification(notification,url,date)
{
        $.ajax({
            type: "POST",
            url: "deletenotificationDB.php",
            data: {notificationInfo: notification, urlVal: url, dateVal: date},
            success: function(data) {location.reload();}
            });
}
//Stop event propagation
if (!e) var e = window.event;
    e.close = true;
    if (e.stopPropagation) e.stopPropagation();
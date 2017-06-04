postsArr = [];
var id = 0;



var postFunc = function(text) {

    var newPost = new Object();
    newPost.text = text;
    newPost.id = id;
    postsArr.push(newPost);
    id++;
}

var printPost = function() {
    $(".posts").empty();
    for (var i = 0; i < postsArr.length; i++) {
        $('.posts').append("<p class='post' data-id=" 
            + postsArr[i].id + ">" + postsArr[i].text + "</p>");
        // $('.posts').append("<form class='postComment' data-id=" 
        //     + postsArr[i].id + "><input type='text' 
        //     class='form-control' 
        //     placeholder='Comment'></form>");

    }
}


$('.add-post').click(function() {
    var text = $('#post-name').val();
    postFunc(text);
    printPost();
    addRemoveButton();
    $('#post-name').val("");
});



var addRemoveButton= function(){
  $('.post').prepend('<button type="button" class="remove">REMOVE</button>');

};

$('.posts').on('click', '.remove', function () {
var indexfromID= $(this).closest('p').data().id;
    postsArr.splice(indexfromID,1);
  $(this).closest('p').remove();
});


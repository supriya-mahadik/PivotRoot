//https://stackoverflow.com/questions/7861032/loop-and-get-key-value-pair-for-json-array-using-jquery
$(document).ready(function () {
    var student = '';
    // FETCHING DATA FROM JSON FILE
    $.getJSON("data.json", function (data) {
        console.log("data::",data);
        console.log("index::",data.length);
        student += data;
        
        // ITERATING THROUGH OBJECTS
        $(data).each(function(i, v) {
            console.log("element::",i, v);
            console.log("element::",v);
        });
       
    });
    $('#PRoot').append('<div>'+ student +'</div>');
});


function openCourse(evt, courseName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(courseName).style.display = "block";
    evt.currentTarget.className += " active";
  }
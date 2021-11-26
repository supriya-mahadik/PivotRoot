$(document).ready(function () {
    // FETCHING DATA FROM JSON FILE
    $.getJSON("data.json", function (data) {
        getData(data)
    });
});

function getData(data){
    // ITERATING THROUGH OBJECTS
    $(data).each(function(i, v) {
        if(v.monthly){
            getMonthlyData(v.monthly)
        }
        if(v.yearly){
            getYearlyData(v.yearly)
        }
    });
    $('#yearly').on('click', function(){
        getYearlyData(data[1].yearly);
    })
    $('#monthly').on('click',function(){
        getMonthlyData(data[0].monthly);
    })
}

function getYearlyData(data){
    $('#boardsTab button').remove();
    //setting default grade in option with all tabls and its data
    if(data[0].grade){
        $('#yGrades').val(data[0].grade);
    }
    $.each(data[0].boards, function (boardName, boardDataObj) {
        $('#boardsTab').append($('<button/>', {
            text: boardName,
            id: 'btn_'+boardName,
            click: () => displayBoardData(boardDataObj)
        }));
    })
    $('#boardsTab button:first-child').click();
    $('#yGrades option').remove();
    $.each(data, function (i, item) {
        $('#yGrades').append($('<option>', { 
            value: item.grade,
            text : item.grade 
        }));
    });
        
    $('#yGrades').change(function(){ 
        var value = $(this).val();
        data.forEach(item => {
            if (item.grade === value) {
                displayBoardsTab(item, value);
            }
        });
        $('#boardsTab button:first-child').click();
    });
}
// Yearly data functions start
function displayBoardsTab(data, grade){
    $('#boardsTab button').remove();
    for (const boardName in data.boards) {
        if (Object.hasOwnProperty.call(data.boards, boardName)) {
            const boardObject = data.boards[boardName];
            $('#boardsTab').append($('<button/>', {
                text: boardName,
                id: 'btn_'+boardName,
                click: () => displayBoardData(boardObject)
            }));
        }
    }
}

function displayBoardData(boardObject){
    $('#totalSessions').text(boardObject.total_sessions);
    $('#olPreAsmt').text(boardObject.online_pre_assignments);
    $('#olPostAsnt').text(boardObject.online_post_assignments);
    $('#olPractice').text(boardObject.online_assignments);
    $('#olTests').text(boardObject.online_tests);
    $('#careerSessions').text(boardObject.career_counselling_sessions);
    if(Array.isArray(boardObject.syllabus)){
        $.each(boardObject.syllabus[0], function (key, item) {
            let itemList = item.split("!").map(el => el.trim());
            $('#syllabus').append(`<div>${key}</div>`);
            itemList.forEach(it => {
                $('#syllabus').append(`<div>${it}</div>`);
            });
        });
    }else{
        let itemList = (boardObject.syllabus).split("!").map(el => el.trim());
        itemList.forEach(it => {
            $('#syllabus').append(`<div>${it}</div>`);
        });
    }
   
    $('#seats').text(boardObject.seats);
    $('#discount').text(boardObject.discount);
    $('#price').text(boardObject.price);
    $('#perClassPrice').text(boardObject.per_class_price);
}

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

// Yearly data functions end

function getMonthlyData(data){
    $('#mboardsTab button').remove();
    if(data[0].grade){
         $('#mGrades').val(data[0].grade);
     }
    $.each(data[0].boards, function (boardName, boardDataObj) {
        $('#mboardsTab').append($('<button/>', {
            text: boardName,
            id: 'btn_'+boardName,
            click: () => displayMonthlyBoardData(boardDataObj)
        }));
    })
    $('#mboardsTab button:first-child').click();
    $('#mGrades option').remove();
     $.each(data, function (i, item) {
         $('#mGrades').append($('<option>', { 
             value: item.grade,
             text : item.grade 
         }));
     });
     $('#mGrades').change(function(){ 
         var value = $(this).val();
         data.forEach(item => {
             if (item.grade === value) {
                 displayMonthlyBoardsTab(item, value);
             }
         });
         $('#mboardsTab button:first-child').click();
     });
     
 }

 function displayMonthlyBoardsTab(data, grade){
    $('#mboardsTab button').remove();
    for (const boardName in data.boards) {
        if (Object.hasOwnProperty.call(data.boards, boardName)) {
            const boardObject = data.boards[boardName];
            $('#mboardsTab').append($('<button/>', {
                text: boardName,
                id: 'btn_'+boardName,
                click: () => displayMonthlyBoardData(boardObject)
            }));
        }
    }
}

function displayMonthlyBoardData(boardObject){
    $('#radioWrapper').html('');
    $.each(boardObject, function (key, item) {
            $('#radioWrapper')
                .append(`<input type="radio" id="${key}" name="contact" value="${key}">
                <label for="${key}">
                    <div>
                        <div class="valid">${item.valid}</div>
                        <div class="refund">${item.refund}</div>
                    </div>
                    <div>
                        <div class="price">${item.price}</div>
                        <div class="discount">${item.discount}</div>
                    </div>
                    <div>
                        <div class="perClassPrice">${item.per_class_price}</div>
                        <div class="total_sessions">${item.total_sessions}</div>
                    </div>
                </label>`);
       
        
    });
}
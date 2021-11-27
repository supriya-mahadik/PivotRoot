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
            class: 'sub_tab',
            click: function(){displayBoardData(boardDataObj,this)}
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
                class: 'sub_tab',
                click: function() { displayBoardData(boardObject, this) }
            }));
        }
    }
}

function displayBoardData(boardObject, selectedTab){
    $('.sub_tab').removeClass("active");
    $(selectedTab).addClass("active");
    $('#totalSessions').text(boardObject.total_sessions);
    $('#olPreAsmt').text(boardObject.online_pre_assignments);
    $('#olPostAsnt').text(boardObject.online_post_assignments);
    $('#olPractice').text(boardObject.online_assignments);
    $('#olTests').text(boardObject.online_tests);
    $('#careerSessions').text(boardObject.career_counselling_sessions);
    $('#syllabus').html('');
    if(Array.isArray(boardObject.syllabus)){
        $.each(boardObject.syllabus[0], function (key, item) {
            let itemList = item.split("!").map(el => el.trim());
            const topicTitleEl = $('<div class="mt-1">');
            topicTitleEl.append(`<div class="topic_title">${key}</div>`);
            console.log(topicTitleEl);
            itemList.forEach(it => {
                topicTitleEl.append(`<div>${it}</div>`);
            });
            $('#syllabus').append(topicTitleEl);
        });
    }else{
        let itemList = (boardObject.syllabus).split("!").map(el => el.trim());
        const topicTitleEl = $('<div class="mt-1">');
        itemList.forEach(it => {
            topicTitleEl.append(`<div>${it}</div>`);
        });
        $('#syllabus').append(topicTitleEl);
    }
   
    $('#seats').text(boardObject.seats+' seats');
    $('#discount').text(boardObject.discount+'% OFF');
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
            class: 'm_sub_tab',
            click: function(){displayMonthlyBoardData(boardDataObj,this);}
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
                class: 'm_sub_tab',
                click: function() {displayMonthlyBoardData(boardObject,this);}
            }));
        }
    }
}

function displayMonthlyBoardData(boardObject,selectedTab){
    $('.m_sub_tab').removeClass("active");
    $(selectedTab).addClass("active");
    $('#radioWrapper').html('');
    $.each(boardObject, function (key, item) {
        $('#radioWrapper')
            .append(`<div class="radio_wrapper"><div><input type="radio" id="${key}" name="contact" value="${key}" ${key == '5_sessions' ? 'checked' : ''}></div>
            <div>
            <label for="${key}">
                <div>
                    <div class="valid">${item.valid}</div>
                    <div class="refund">${item.refund}</div>
                </div>
                <div>
                    <div class="price"><span><span>&#8377</span>${item.price}</span></div>
                    <div class="discount"><span>${item.discount}<span>% OFF</span></span></div>
                </div>
                <div>
                    <div class="perClassPrice"><span><span>&#8377</span>${item.per_class_price}<span>&nbsp;per session</span></span></div>
                    <div class="total_sessions"><span>${item.total_sessions}<span>&nbsp;Sessions</span></span><div>
                </div>
            </label></div></div>`);
       
        
    });
}
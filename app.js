"use strict";


// jQuery document ready function
$(document).ready(function(){
    $('#clear').click( clearInput );

    $('#scrape').click ( scrape );

    $('#copy').click( copy );
});


// clearInput
// just clears both input fields
function clearInput(){
    $('#input, #results').val('');
}

// scrape
// scrapes the data entered and pulls out student names and email addresses
function scrape(){
    // read HTML (copied from WarriorWeb source code)
    let html = $('#input').val();

    // Not sure why 19 works, but that's the way it seems to be...
    // If there are any issues in the future, start at this number
    let weirdIndex = 19
    html = $.parseHTML(html)[weirdIndex];
    
    // jQuery search to find the appropriate table and it's <a> links
    let scrapedData = $(html).find("table[summary='Student Name'] a");
    let studentData = [];
    $.each( scrapedData, function(key,value){
        studentData.push( $(value).text() );
    })

    // testing, remove this
    // console.log(studentData);

    // format names in firstname lastname format
    for( let i = 0; i < studentData.length; i=i+2){
        let name = studentData[i].split(", ");
        studentData[i] = name[1] + " " + name[0];
    }

    // results text with line breaks
    let text = '';
    for( let i = 0; i < studentData.length; i++ ){
        text += studentData[i] + "   ";
        if( i % 2 ){
            text += "\n";
        }
    }

    // show results in the final box, and we're done
    $('#results').val( text );

}


// copy
// copies the text to the clipboard
function copy(){
    let copytext = document.getElementById("results");
    copytext.select();
    document.execCommand("copy");
    alert("Text copied to clipboard");
}


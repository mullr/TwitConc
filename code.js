$(document).ready(function() {
    $('#search').click(function() {
        search($('#term').val());
    });
});

function search(term) {
    var url = "http://search.twitter.com/search.json";
    var data = "q=" + encodeURI(term) + "&rpp=25";

    $.ajax({
        url: url,
        dataType: 'jsonp',
        data: data,
        success: searchFinished(term)
    });
}

function lastNChars(n, str) {
    var result = str.substr(str.length - Math.min(n, str.length), str.length);
    if(result.length < str.length) {
        result = "..." + result;
    }
    return result;
}

function firstNChars(n, str) {
    var result = str.substr(0, Math.min(n, str.length));
    if(result.length < str.length) {
        result = result + "...";
    }
    return result;
}

function searchFinished(term) {
    return function(data, textStatus) {
        var table = $('<table>');
        for(var i=0; i<data.results.length; i++) {
            var tweet = data.results[i];
            var chunks = tweet.text.split(term);
            chunks[0] = lastNChars(50, chunks[0]);
            chunks[1] = firstNChars(50, chunks[1]);
            table.append( $('<tr>')
                          .append($('<td>').addClass('prefix').text(chunks[0]))
                          .append($('<td>').addClass('term').text(term))
                          .append($('<td>').addClass('suffix').text(chunks[1])) );

        }

        $('#output').prepend(table);
    };
}
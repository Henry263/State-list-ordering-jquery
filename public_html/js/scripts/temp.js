/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function()
{
   showResults();
   $("#kwd_search").keyup(function(){
		// When value of the input is not blank
		if( $(this).val() != "")
		{
			// Show only matching TR, hide rest of them
			$("#sort-table tbody>tr").hide();
			$("#sort-table td:contains-ci('" + $(this).val() + "')").parent("tr").show();
		}
		else
		{
			// When there is no input or clean again, show everything back
			$("#sort-table tbody>tr").show();
		}
	});
        
        /* code for tooltip*/
        
         $('[data-toggle="tooltip"]').tooltip(); 

});


// jQuery expression for case-insensitive filter
$.extend($.expr[":"], 
{
    "contains-ci": function(elem, i, match, array) 
	{
		return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});
 
function showResults() {
    $.getJSON('data/states.json', function(data) {
        var ddataid;
        $.each(data, function() {
            ddataid = this;
            // alert(ddataid.stateID);
            var StateID = ddataid.stateID;
            var StateName = ddataid.statename;
            var row = $("<tr><td>" + StateID + "</td><td>" + StateName + "</td></tr>");
            $("#Stateresults").append(row);
        });
    });
}
$(function() {
    $('#headings th').click(function() {
            var table = $(this).parents('table').eq(0);
            var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
            this.asc = !this.asc;
            if (!this.asc) {
            rows = rows.reverse();
        }
            for (var i = 0; i < rows.length; i++) {
            table.append(rows[i]);
        }
    });
});
function comparer(index) {
        return function(a, b) {
                var valA = getCellValue(a, index), valB = getCellValue(b, index);
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
        };
}
function getCellValue(row, index) {
    return $(row).children('td').eq(index).html();
}

// additional code to apply a filter

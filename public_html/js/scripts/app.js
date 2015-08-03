/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Code goes here
$(document).ready(function()
{
 
    showResults();
});
var arr = [];
function showResults () {
  $.getJSON('data/states.json', function(data) {
        var ddataid;
        $.each(data, function() {
            ddataid = this;
           // alert(ddataid.stateID);
            var StateID = ddataid.stateID;
            var StateName = ddataid.statename;
            var row = $("<tr><td>" + StateID + "</td><td>" + StateName + "</td></tr>");
            arr.push('{ statename:'+StateName+',stateID:'+StateID+'},');
            $("#Stateresults").append(row);
        });
    });
}
 $(function() {
    $('#headings th').click(function() {
        
    });
});
// working code;

 $(function() {
    $('#headings th').click(function() {
        var id = $(this).attr('id');
        var asc = (!$(this).attr('asc')); // switch the order, true if not set
        alert("Order :"+asc);
        var sortAsc = $(this).hasClass('asc'), // ASC or DESC
       //alert("check"+sortAsc);
        $table  = $('#sort-table'),            // cache the target table DOM element
        $rows   = $('tbody > tr', $table);     // cache all rows from the target table body

        $rows.sort(function(a, b) {

            var keyA = $('td',a).text();
            var keyB = $('td',b).text();

            if (sortAsc) {
                return (keyA > keyB) ? 1 : 0;     // A bigger than B, sorting ascending
            } else {
                return (keyA < keyB) ? 1 : 0;     // B bigger than A, sorting descending
            }
        });

        $rows.each(function(index, row){
          $table.append(row);                    // append rows after sort
        });
        
    });
 });
 
 
function sortResults(prop, asc) {

    arr = arr.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]);
        else return (b[prop] > a[prop]);
    });
    showResults();
    
}
$('th').click(function(){
    alert("hi");
    var table = $(this).parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc){rows = rows.reverse();}
    for (var i = 0; i < rows.length; i++){table.append(rows[i]);}
});
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    };
}
function getCellValue(row, index){ return $(row).children('td').eq(index).html(); }
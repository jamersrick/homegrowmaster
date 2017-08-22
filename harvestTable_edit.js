var garden_id = 1;
// insert new row with editable cells
var rowCounter=1
	function insertRowFunction(){
		var table = document.getElementById("myTable");
		var insert = 1;
		var rowId = "row" + rowCounter++;
		for (var i=0; i < insert; i++){
			var row = table.insertRow(2);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
		    var cell3 = row.insertCell(2);
		    var cell4 = row.insertCell(3);
		    var cell5 = row.insertCell(4);
		    var cell6 = row.insertCell(5);
		    var cell7 = row.insertCell(6);
		    var cell8 = row.insertCell(7);
		    var cell9 = row.insertCell(8);
		    row.setAttribute("class", "hello");
		    row.setAttribute("id", rowId);
			cell1.innerHTML ="<button class='rowBtn'>insert</button>";
			cell2.innerHTML ='<input type="text" class="plantName"/>';
			cell3.innerHTML ='<input type="number" class="pQty" min="0" max="999" >';
			cell4.innerHTML ='<input type="text" id="sowDate" class="datepicker_sow" />';
			cell5.innerHTML ='<input type="text" id="harvestDate1" class="datepicker_harvest" />';
			cell6.innerHTML ='<input type="text" class="pVol"/>';
			cell7.innerHTML ='<input type="text" class="pPrice" />';
			cell8.innerHTML ='<div class="total">0.00</div>';
			cell9.innerHTML ="<div><input class='deleteBtn' type='button' value='Remove'></div>";		
		}
		refreshFunction();
		$("#" + rowId + ' input').change(refreshFunction);	
		$("#" + rowId + ' .deleteBtn').click(removeFunction);
		$("#" + rowId + ' .rowBtn').click(insertRowFunction);
	}

//remove row on harvest table and calling recalculate function
function removeFunction(){
       	$(this).closest('tr').remove();

		multiplyFunction();
		addFunction();
	};

// sum of the quantities
function addFunction(){
		var sumValue = 0;
		console.log('sumValue',sumValue);
		$('tr.hello').each(function(){
			var qty = parseInt($(this).find('input.pQty', this).val(),10);
			console.log('qty',qty)
			if (!isNaN(qty)){
				sumValue = ((sumValue + qty));
			}
			
			console.log("sumValue, Qty", sumValue, qty);
		});
		$("tfoot td.sumQty").text(sumValue);
	}

// multiply price*harvested volume in KG 
function multiplyFunction(){
		var multiValue = parseFloat(0);
		var addVolValue = parseFloat(0);
		console.log(multiValue);
		//calculate each row
		$("tr.hello").each(function(){
			// var number = parseFloat($(this).find('div.pVol', this).text(),10);
			// var price = parseFloat($(this).find('div.pPrice', this).text(),10);
			 var number = parseFloat($(this).find('input.pVol', this).val(),10);
			 var price = parseFloat($(this).find('input.pPrice', this).val(),10);
			 var sumVolume = $("tfoot td.sumVol");
			console.log(number, price);
			var ptotal = ((number*1) * (price*1)|| 0) // multiply value formula plus converting nan to zero
			var priceTot = ptotal.toFixed(2)
			console.log(number,price,priceTot);
			$(".total",this).text((priceTot));
			console.log(number,price,ptotal, multiValue);
			multiValue= (multiValue + ptotal);
			if (!isNaN(number)){
				addVolValue = addVolValue + number;
			}
			console.log("multivalue,ptotal",multiValue, ptotal);
			});
			//$("tfoot td.sumAmt").text(multiValue);
			var sumAmtDec = multiValue.toFixed(2);
			$("tfoot td.sumAmt").text(sumAmtDec);
			var sumVolume = addVolValue.toFixed(2);
			$("tfoot td.sumVol").text((sumVolume)||0);
	}


//datepicker in inputfield
function dateFunction(){
	var sowDate =$("input.datepicker_sow").datepicker({
		minDate:"-2w",
		//dateFormat:"dd-mm-yy",
		dateFormat:"yy-mm-dd",
		onClose:function( dateSelected){
		harvestDate.datepicker("option","minDate", dateSelected);
		}
	});
	var harvestDate =$("input.datepicker_harvest").datepicker({
		//dateFormat:"dd-mm-yy",
		dateFormat:"yy-mm-dd",
		onClose:function(dateSelected){
		sowDate.datepicker("option","maxDate",dateSelected);
		}
	});
};


function refreshFunction(){
	multiplyFunction();
	addFunction();
	dateFunction();
}

//clear field in table
function clearAllFunction(){
	$('#myTable input[type="text"]').val("");
	$('#myTable input[type="number"]').val("");
	$('#myTable .sumAmt, .sumQty, .sumVol, .total').text("");
	// $('#myTable .sumQty').text("");
	// $('#myTable .sumVol').text("");
	// $('#myTable .total').text("");
	refreshFunction()
}

function saveDiary(){	
	var diaryname = window.prompt("Enter diary name", ""); // pop up to ask user to give the name of the diary
	var dataObj = {"data":[]};
	$("#myTable tr.hello").each(function(){ 
	var obj = { "name":$(this).find('input.plantName').val(), 
				"quantity":$(this).find('input.pQty').val(), 
				"sow_date":$(this).find('input.datepicker_sow').val(), 
				"harvest_date": $(this).find('input.datepicker_harvest').val(), 
				"harvest_volume": $(this).find('input.pVol').val(),
				"price": $(this).find('input.pPrice').val(),
				"total_amt": $(this).find('.total').text(),
				"garden_id": garden_id};
		dataObj["data"].push(obj);
		
		//console.log(dataObj["data"][0]);
	});

	console.log(JSON.stringify(dataObj));
	var request = $.ajax({
	  url: "mygarden2.php",
	  method: "POST",
	  data: dataObj,
	  dataType: "JSON"
}); 
}

$(document).ready(function(){
	$('#myTable input').change(refreshFunction);	
	$('.deleteBtn').click(removeFunction);
	$('.rowBtn').click(insertRowFunction);
	$('#clearAllBtn').click(clearAllFunction);

	//connect to database
	$('#saveBtn').click(saveDiary);

});


function popup(){
	var diaryname = window.prompt("Enter diary name", "");
};
// function getDiary(){
	
// }
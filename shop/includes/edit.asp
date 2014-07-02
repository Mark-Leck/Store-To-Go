<% 

if session ("sessvar") <> 1 then 
Dim galusername
galusername = session("galusername")
'response.write galusername

end if
%>

<!--#include file="cfg.asp" -->
<!--#include virtual="/shop/includes/admin/check.asp" -->
<% 
Response.Expires = 0
Response.Expiresabsolute = Now() - 2
Response.AddHeader "pragma","no-cache"
Response.AddHeader "cache-control","private"
Response.CacheControl = "no-cache" 
Response.AddHeader "X-UA-Compatible","IE=EmulateIE10" 

dim gallery
gallery = request("page")
dim textloc 

textloc=server.mappath(request("strpath") + descfolder + "/" + request("path")) + ".txt" 
'response.write textloc
Set objFSO = Server.CreateObject("Scripting.FileSystemObject")
Dim objTextStream
	Set objTextStream = objFSO.OpenTextFile(textloc , 1)
	dim tpath
	tpath = request("strpath")
	set objfolder =objfso.getfolder(server.mappath(tpath))

dim comments
comments = objTextStream.ReadAll
 %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML>
<HEAD>
	<meta http-equiv="Content-Type" content="text/html;charset=iso-8859-1"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<TITLE>Edit Description & Priority for <% =request("path") %></TITLE> 
	<link rel="stylesheet" href="/shop/includes/paypal_files/bootstrap.css">
	<link rel="stylesheet" href="/shop/includes/paypal_files/app.css">
<LINK REL=stylesheet HREF="/shop/includes/gal.css" TYPE="text/css" Title=style2>
<script>
function PopUp() {
    var myWindow = window.open("https://www.paypal.com/uk/cgi-bin/webscr?cmd=_button-designer&factory_type=cart", "", "width=800, height=600, scrollbars=yes");
}
function help() {
    var myWindow = window.open("/shop/includes/FAQ.asp", "FAQ", "width=600, height=600, scrollbars=yes");
} 
function saveNow() {
document.querySelectorAll("button[type='submit']")[0].click();
} 
function amEnd(){
window.location=window.location;

}

function startGen(){
var oldtext = $.trim($('#originalText').val());
var newtext = $.trim($('#bob').val());
//alert(newtext);
//alert(oldtext);
if (oldtext < newtext) {
$('#cartModal3').modal('show');
}
else if (oldtext > newtext) {
$('#cartModal3').modal('show');
}
else 
{
$('#cartModal').modal('show');
};
}
</script>
</HEAD>
<body style="background-color:#<%=bgclr%>;background-image:url(<%=bgurl%>)">

<%

if Request("submit") = "y" then 

 

 
 dim result
 result = Request("bob")


  Dim MyFile3
   Set MyFile3 = objfso.CreateTextFile(textloc, True)
	Myfile3.WriteLine (result)


   MyFile3.Close
	
	Dim path
dim  imno

path = request("path")
	
	dim pri

	
If instr(path, "(-pr") then
arrsplit = split(path, "(-pr")

arrsplit2 = split(arrsplit(1), "-)")
pri = arrsplit2(0)
else 
pri = "0"
end if
'response.write pri	


dim newpri, d1, d2, d3,rootname,rtname
newpri = request("priority")
'response.write newpri
d1 = "(-pr1-)"
d2 = "(-pr2-)"
d3 = "(-pr3-)"




For Each objItem In objFolder.files
'response.write path
response.write "<br>"
'response.write objitem.name
if objitem.name = path then


select case pri
case 1
rootname  = split(objitem.name, d1)
rtname = rootname(1)
case 2
rootname  = split(objitem.name, d2)
rtname = rootname(1)
case 3
rootname  = split(objitem.name, d3)
rtname = rootname(1)
case else

rootname  = objitem.name
rtname = rootname
end select
'response.write objitem.name



if newpri = pri then

else
select case newpri
case 1
objitem.name = d1 & rtname
case 2
objitem.name = d2 & rtname
case 3
objitem.name = d3 & rtname

case else
if objitem.name = rtname then
else
objitem.name = rtname
end if
end select

end if
end if
Next 'objItem

'Move descriptions with 
objtextstream.close
	set dfolder =objfso.getfolder(server.mappath(request("strpath") + descfolder))
dim drtname, drootname

For Each dItem In dFolder.files
if ditem.name = path + ".txt" then


select case pri
case 1
drootname  = split(ditem.name, d1)
drtname = drootname(1)

case 2
drootname  = split(ditem.name, d2)
drtname = drootname(1)
case 3
drootname  = split(ditem.name, d3)
drtname = drootname(1)
case else

drootname  = ditem.name
drtname = rootname + ".txt"
end select




if pri = newpri then

else
select case newpri
case 1
ditem.name = d1 & drtname 
case 2
ditem.name = d2 & drtname 
case 3
ditem.name = d3 & drtname 

case else
if ditem.name = drtname then
else

ditem.name = drtname 
end if
end select

end if
end if
Next 'objItem

%> 
<% Response.Redirect ("./edit.asp?path=" + request("path") + "&strpath=" + request("strpath")) %>


 
 <% else
 


path = request("path")
	


	
If instr(path, "(-pr") then
arrsplit = split(path, "(-pr")

arrsplit2 = split(arrsplit(1), "-)")
pri = arrsplit2(0)
else 
pri = "0"
end if %>

<div id="cart" class="tab-pane example" >


<table summary="" class="bluebox" align=center width=500 style="background-color:#<%=cellclr%>">
				
<tr>
<td>
<font size="2" color="grey">Item Editor </font><font size="1" color="grey">v1.01</font>&nbsp;<img src="<%=help%>" onclick="help()" Title="FAQ" />
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABGCAYAAAAuP23NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzM1OERGM0RFRkQ0MTFFMzk4OTdBM0QzNkI2QUY1NEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM1OERGM0VFRkQ0MTFFMzk4OTdBM0QzNkI2QUY1NEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzU4REYzQkVGRDQxMUUzOTg5N0EzRDM2QjZBRjU0RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzU4REYzQ0VGRDQxMUUzOTg5N0EzRDM2QjZBRjU0RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhBIDMUAAAmcSURBVHja7Jx7UFTX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" width="100" align="right" title="PayPal Button Generator" class="edit" role="button" data-toggle="modal" data-keyboard="true" onclick="startGen()"/>

<div id="cartModal" class="editable modal hide fade" role="dialog" aria-hidden="true" >
<center><h1>PayPal Button Generator</h1></center>
					<form action="#" class="modal-body form-horizontal">
						<input name="button" value="cart" type="hidden">
						
						<div class="control-group">
							<div class="controls">
								<input id="cartName" name="name" required="required" placeholder="Item Description" autocomplete="off" type="text">
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<input id="cartAmount" name="amount" required="required" placeholder="Item Cost" autocomplete="off" type="text">
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<input id="cartShipping" name="shipping" required="required" placeholder="Delivery Charge" autocomplete="off" type="text">
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<input id="cartShipping2" name="shipping2" required="required" placeholder="Extra Delivery Charges" autocomplete="off" type="text">
							</div>
						</div>

						<div class="control-group">
							<div class="controls">
								<input id="cartMerchant" name="business" required="required" value="<% =ppmerchid %>" autocomplete="off" type="hidden">
							</div>
						</div>
							<div class="control-group">
							<!--<label class="control-label" for="cartQuantity">Quantity</label>-->
							<div class="controls">
								<input id="cartQuantity" name="quantity" value="1" autocomplete="off" type="hidden">
							</div>
						</div>
						<div class="control-group">
							<!--<label class="control-label" for="cartCurrency">Currency</label>-->
							<div class="controls">
								<input id="cartCurrency" name="currency" Value="GBP" autocomplete="off" maxlength="3" type="hidden">
							</div>
						</div>
							<div class="control-group">
							<div class="controls">
								<input id="cartCancel" name="cancel_return" autocomplete="off" value="<% =linkurl%>/shop" type="hidden">
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<input id="cartReturn" name="return" autocomplete="off" value="<% =linkurl%>/thanks.asp" type="hidden">
							</div>
						</div>
						
			</form>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal">Cancel</button>
    					<button class="btn btn-primary" data-modal-save="true">Generate</button>
  					</div>
				</div>

				<div class="tryit">
					<!--<script src="/shop/includes/paypal_files/paypal-button.js" data-button="cart" data-name="Product in your cart" data-amount="1.00"></script>-->
				</div>

	
<div id="cartModal2" class="editable modal hide fade" role="dialog" aria-hidden="true" >
<center><h1>Button Generated Successfully!</h1></center>
	
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal">Close</button>
  					</div>
			

				<div class="tryit">
					<script src="/shop/includes/paypal_files/paypal-button.js" data-button="cart" data-name="Product in your cart" data-amount="1.00"></script>
				</div>

	

	</div>
<div id="cartModal3" class="editable modal hide fade" role="dialog" aria-hidden="true" >
<center><font size="6" color="red"><b>ATTENTION!!</b></font><h2><h4>Data input changes have been detected!</h4>Please SAVE or AMEND any edits before generating buttons.</h2></center>
	<br><br><br><br><br>
					<div class="modal-footer">
						<button class="btn" onclick="amEnd();">AMEND NOW</button>
    					<button class="btn btn-primary" onclick="saveNow();">SAVE NOW</button>

                                          


  					</div>
			

				<div class="tryit">
					<script src="/shop/includes/paypal_files/paypal-button.js" data-button="cart" data-name="Product in your cart" data-amount="1.00"></script>
				</div>

	

	</div>
  <form action="edit.asp" method="post" name="myForm" id="myForm" class="bluebox2" title="Edit the description here">

<br>
    <textarea rows="9" cols="100" name="bob" id="bob">
<% =comments %>
 </textarea>
</div>

<br>Priority* &nbsp &nbsp


<% select case pri 
case "1" 

%>

<select name="priority">
<option value="1" label="1" selected = yes>1</option>
<option value="2" label="1">2</option>
<option value="3" label="1">3</option>
<option value="4" label="1" >Normal</option>

</select>

<% case 2 %>

<select name="priority">
<option value="1" label="1">1</option>
<option value="2" label="1" selected=yes>2</option>
<option value="3" label="1">3</option>
<option value="4" label="1" >Normal</option>

</select>

<% case 3%>
<select name="priority">
<option value="1" label="1">1</option>
<option value="2" label="1">2</option>
<option value="3" label="1" selected = yes>3</option>
<option value="4" label="1">Normal</option>

</select>

<% case else%>
<select name="priority">
<option value="1" label="1">1</option>
<option value="2" label="1">2</option>
<option value="3" label="1">3</option>
<option value="4" label="1" selected = yes>Normal</option>

</select>

<% end select %>


<br><br>

<button type="Submit" title="Save Changes" class="btn btn-primary">Save</font></button>
<input type="hidden" name="submit" value="y" />
<input type="hidden" name="strpath" value="<% =request("strpath") %>" />
<input type="hidden" name="textloc" value="<% =request("textloc") %>" />
<input type="hidden" name="path" value="<% =request("path") %>" />
<input type="hidden" name="imno" value="<% =request("imno") %>" />
<input type="hidden" name="gal" value="<% =request("gal") %>" />
<br>
* <font size="1"><i>The priority of an image affects the position on the page i.e. a priority 1 image will be at the top... above a two, three and normal</i></font><br>
</form>
</td>
</tr>
<% end if  %>

</table>
</div>
 <div class=bluebox id=adminnav style="display: inline; background-color:#<%=cellclr%>">
<center>
<div style="position: relative; top: 120px;">
<h2>Store Management</h2>
<h3>
<br>
<a href="/shop/includes/admin/admin.asp?sec=folders">Product Categories</a><br>
<hr width=50% color=<% =hdrclr %>>
<a href="/shop/includes/admin/admin.asp?sec=images">Product Images</a><br>
<hr width=50% color=<% =hdrclr %>>
<a href="/shop/includes/admin/admin.asp?sec=config">Configuration</a><br>
<hr width=50% color=<% =hdrclr %>>
<a href="admin.asp">Main</a>
<hr width=50% color=<% =hdrclr %>>
<a href="/shop">Shop Home</a>
<hr width=50% color=<% =hdrclr %>>
<a href="/">Homepage</a>
<hr width=50% color=<% =hdrclr %>>
<a href="/shop/includes/admin/logout.asp">Logout</a>

</center></h3>

</div>




</div>
<!--<code name="originalText" id="originalText" type="hidden"/><%=comments %></code>-->
<textarea name="originalText" id="originalText" type="hidden"/><% =comments %></textarea>
	<script src="paypal_files/jquery.js"></script>
	<script src="paypal_files/bootstrap.js"></script>
	<script src="paypal_files/app.js"></script>



</body></html>


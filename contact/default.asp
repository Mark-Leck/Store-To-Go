<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--#include virtual="/shop/includes/cfg.asp" -->


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="keywords" content="<%=metakey%>" />
<meta name="description" content="<%=metadesc%>" />
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<TITLE><% =title %> Contact Us</TITLE>
<link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
<link href="/shop/includes/gal.css" rel="stylesheet" type="text/css" media="screen" />
</head>
<BODY style="background-color:#<% =bgclr %>;background-image:url(<% =bgurl %>)">
<div id="wrapper">
	<div id="header-wrapper" class="container">
		<div id="header" class="container" style="background-color:#<% =hdrclr %>;background-image: url(<% =navurl %>)" >
			<div id="logo">
				<h1><a href="#" >CONTACT US...</a></h1>
				
			</div>
			<div id="menu">
				<ul>
					<!--<li><a href="/blog.html">Blog</a></li>-->
					<li><a href="/shop">Online Store</a></li>
					<!--<li><a href="about.html">About</a></li>-->
					<li><a href="#">Contact Us</a></li>
					<li><a href="/" >Homepage</a></li>
				</ul>
			</div>
		</div>
				<div><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>

	</div>
	<!-- end #header -->
	<div id="banner2">
		<div class="content"><form name="contactform" method="post" action="send_form_email.php" >
 
<table width="100%"  style="background-color:#<% =cellclr %>;background-image: url(<% =conurl %>)" >
 
<tr>
 
 <td align="center" >
 <br><br>
  <input  type="text" name="first_name" placeholder="First name (required)" maxlength="50" size="30">
 
 </td>
 
</tr>
 
<tr>
 
 
 <td align="center" >
 
  <input  type="text" name="last_name" placeholder="Last name (required)" maxlength="50" size="30">
 
 </td>
 
</tr>
 
<tr>
 
 
 <td align="center" >
 
  <input  type="text" name="email" placeholder="Email address (required)" maxlength="80" size="30">
 
 </td>
 
</tr>
 
<tr>
 

 
 <td align="center" >
 
  <input  type="text" name="telephone" placeholder="Telephone number (optional)" maxlength="30" size="30">
 
 </td>
 
</tr>
 
<tr>
 
 
 <td align="center" >
 <br>
  <textarea  name="comments" maxlength="1000" placeholder="Enter your message here..." cols="40" rows="6" ></textarea>
 
 </td>
 
</tr>
 
<tr>
 
 <td colspan="2" style="text-align:center">
  <br><input type="submit" value="SUBMIT" class="btngreen"><br><br></td>
 
</tr>
 
</table>
 
</form></div>
		
<div>

				<div><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>
    </img></center>

</div></center></div>

<div id="footer">
	<p><%=footer%> <br>Designed Using <a href='http://storetogo.net'><u>Store To Go</u></a> (c) 2014 Mark Leck</p>
</div>
<!-- end #footer -->
</body>
</html>


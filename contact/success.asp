 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--#include virtual="/shop/includes/cfg.asp" -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="keywords" content="<%=metakey%>" />
<meta name="description" content="<%=metadesc%>" />
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<TITLE><% =title %> Message Sent</TITLE>
<link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
<link href="/shop/includes/gal.css" rel="stylesheet" type="text/css" media="screen" />
</head>
<BODY style="background-color:#<% =bgclr %>;background-image:url(<% =bgurl %>)">
<div id="wrapper">
	<div id="header-wrapper" class="container">
		<div id="header" class="container" style="background-color:#<% =hdrclr %>;background-image: url(<% =navurl %>)" >
			<div id="logo">
				<h1><a href="#">SUCCESS!</a></h1>
				
			</div>
			<div id="menu">
				<ul>
					<li class="current_page_item"><a href="/">Homepage</a></li>
				</ul>
			</div>
		</div>
				<div><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>
		</div>
<div><center><h4>We will be in touch shortly.</h4></center></div>

	<!-- end #header -->
		<% if banurl <> "" then %> <div id='banner'>
		<div class='content'><img src='<%=banurl%>' width='100%' alt='' /></div>
				<div><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>
	</div> <% end if %>
	<!-- end #banner -->

<div id="footer">
	<p><%=footer%> <br>Designed Using <a href='http://storetogo.net'><u>Store To Go</u></a> (c) 2014 Mark Leck</p>
</div>
<!-- end #footer -->
</body>
</html>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!--#include file="shop/includes/cfg.asp" -->

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="keywords" content="<%=metakey%>" />
<meta name="description" content="<%=metadesc%>" />
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<TITLE><% =title %> Home</TITLE>
<link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>
<link href="shop/includes/gal.css" rel="stylesheet" type="text/css"  />
</head>
<BODY style="background-color:#<% =bgclr %>;background-image:url(<% =bgurl %>)">
<div id="wrapper">
	<div id="header-wrapper" class="container">
		<div id="header" class="container" style="background-color:#<% =hdrclr %>;background-image: url(<% =navurl %>)" >
			<div id="logo">
				<h1><a href="#" title="<% =title %> "><% =title %> </a></h1>
			</div>
			<div id="menu">
				<ul>
					
					<li><a href="/shop">Online Store</a></li>
					
					<li><a href="/contact">Contact us</a></li>
					<li><a href="#">Homepage</a></li>
				</ul>
			</div>
		</div>
		<div><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>
	</div>
	<!-- end #header -->
	<% if banurl <> "" then %> <div id='banner'>
		<div class='content'><img src='<%=banurl%>' width='100%' alt='' /></div>
		<div><img src="<%=shadow%>" width='100%' height="40" alt='' /></div>
	</div> <% end if %>
	<!-- end #banner -->
	<div id="page">
		<div id="content">
			<div class="post">
				<h2 class="title"><a href="#"><%=titlemain%></a></h2>
				<div class="entry">
					<%=maincon%>
<h2 class="title2"><%=titlemain2%></h2>
<%=maincon2%>
				</div>
</div>
			</div>
		<!-- end #content -->
		<div id="sidebar">
				
					<h2><%=titleside%></h2>
					
					<%=sidecon%>
		</div>
		<!-- end #sidebar -->
<div style="clear: both;">&nbsp;</div>
</div>
        	<div class="container"><img src="<%=shadow%>" width="100%" height="40" alt="" /></div>
<!-- end #page --> 
</div>

<div id="footer">
	<p><%=footer%> <br>Designed Using <a href='http://storetogo.net'><u>Store To Go</u></a> (c) 2014 Mark Leck</p>
</div>
<!-- end #footer -->
</body>
</html>


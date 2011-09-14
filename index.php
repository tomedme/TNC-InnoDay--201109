<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Stats 4 Square</title>
  <link rel="stylesheet" type="text/css" media="screen" href="/media/main.css" />
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
  <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
  <script type="text/javascript" src="/media/gmap.js"></script>
  <script type="text/javascript">var foursq_client_id = '<?php 
    if ('fabien.tnc.lab' == $_SERVER['HTTP_HOST']) echo 'A4GUAUX0GIE5S5WH1AZJX3MQLSSGUVW2OUYB5CHDRNYOA4NG';
    if ('4sq.tedme.kaufmich.lab' == $_SERVER['HTTP_HOST']) echo 'DJESXBRMCPFMPFXWQVPMXSWHZNNC33KIOWLOMIWN4LDXJCU4';
  ?>';</script>
  <script type="text/javascript" src="/media/4sq.js"></script>
  <script type="text/javascript" src="/media/app.js"></script>
</head>

<body>
  <section id="gmap">
    Loading...
  </section>
  <section id="svg">
    <object id="stats" type="image/svg+xml" data="stats-categories.svg" width="800" height="80">
      Your browser doesn't seem to support SVG (or else, you wouldn't see that message).
    </object>
  </section>
</body>
</html>

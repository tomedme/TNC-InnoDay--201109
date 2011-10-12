<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Stats 4 Square</title>

  <link rel="stylesheet" type="text/css" media="screen" href="media/main.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="media/svg.css" />

  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>
  <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>

  <script type="text/javascript" src="media/gmap.js"></script>
  <script type="text/javascript">var foursq_client_id = '<?php
    if ('flea.arkhi.org' == $_SERVER['HTTP_HOST']) echo 'LX2SNS334STJC5U4JSC4KKJE340NODQ5RCGDHC4YM2S13GOP';
    if ('fabien.tnc.lab' == $_SERVER['HTTP_HOST']) echo 'A4GUAUX0GIE5S5WH1AZJX3MQLSSGUVW2OUYB5CHDRNYOA4NG';
    if ('4sq.tedme.kaufmich.lab' == $_SERVER['HTTP_HOST']) echo 'DJESXBRMCPFMPFXWQVPMXSWHZNNC33KIOWLOMIWN4LDXJCU4';
  ?>';
  var foursq_redir_url = '<?php
    echo $_SERVER['HTTP_HOST'];
    if ('flea.arkhi.org' == $_SERVER['HTTP_HOST']) echo '/';
    if ('fabien.tnc.lab' == $_SERVER['HTTP_HOST']) echo '/innovation_day/20110914-4square';
    if ('4sq.tedme.kaufmich.lab' == $_SERVER['HTTP_HOST']) echo '/index.php';
  ?>';</script>
  <script type="text/javascript" src="media/4sq.js"></script>
  <?php if (array_key_exists('last', $_GET)) : ?>
  <script type="text/javascript">var cmax_or = <?php echo (int) $_GET['last'] > 0 ? (int) $_GET['last'] : '-1' ; ?>;</script>
  <?php endif; ?>
  <script type="text/javascript" src="media/app.js"></script>
</head>

<body>
  <section id="gmap">
    Loading…
  </section>

  <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>playing with SVG</title>
    <desc>Just playing around</desc>

    <defs>
      <!-- filters -->
      <filter id="dropShadow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
      </filter>

      <!-- markers: anchors -->
      <marker id="anchorToBoxMiddle" viewBox="-20 -20 40 40" refX="0" refY="0" markerUnits="strokeWidth" orient="auto" markerWidth="20" markerHeight="20">
        <circle cx="0" cy="0" r="8px" fill="#fff" stroke="#000" filter="url(#dropShadow)" />
      </marker>
    </defs>

    <g id="container" fill="#ddd" stroke="#000">
<!--         <image x="30%" y="75%" width="32" height="32" xlink:href="https://foursquare.com/img/categories/travel/subway.png" transform="translate(-16, -16)" /> -->
      <!-- <g id="_categoryId" class="category">
        <rect x="0" y="0" width="60%" height="300px" fill="#069" />
        <line class="marker" x1="30%" y1="25%" x2="30%" y2="75%" marker-start="url(#anchorToBoxMiddle)" />
        <image x="30%" y="75%" width="32" height="32" xlink:href="https://foursquare.com/img/categories/travel/subway.png" transform="translate(-16, -16)" />
        <text x="30%" y="25%" dx="5" dy="15" font-size="12" text-align="center">
      </g> -->
      <!-- <rect x="0" y="0" width="300px" height="100px" fill="#000" /> -->
    </g>
  </svg>
</body>
</html>

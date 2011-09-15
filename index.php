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
    if ('fabien.tnc.lab' == $_SERVER['HTTP_HOST']) echo 'A4GUAUX0GIE5S5WH1AZJX3MQLSSGUVW2OUYB5CHDRNYOA4NG';
    if ('4sq.tedme.kaufmich.lab' == $_SERVER['HTTP_HOST']) echo 'DJESXBRMCPFMPFXWQVPMXSWHZNNC33KIOWLOMIWN4LDXJCU4';
  ?>';
  var foursq_redir_url = '<?php
    echo $_SERVER['HTTP_HOST'];
    if ('fabien.tnc.lab' == $_SERVER['HTTP_HOST']) echo '/innovation_day/20110914-4square';
  ?>';</script>
  <script type="text/javascript" src="media/4sq.js"></script>
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

      <!-- markers: categories -->
      <marker id="pool" viewBox="0 0 32 32" refX="16" refY="16" markerUnits="strokeWidth" markerWidth="32" markerHeight="32">
        <image x="0" y="0" width="32" height="32" xlink:href="https://foursquare.com/img/categories/building/gym_pool.png" />
      </marker>
      <marker id="airport" viewBox="0 0 32 32" refX="16" refY="16" markerUnits="strokeWidth" markerWidth="32" markerHeight="32">
        <image x="0" y="0" width="32" height="32" xlink:href="https://foursquare.com/img/categories/travel/airport.png" />
      </marker>
      <marker id="bar" viewBox="0 0 32 32" refX="16" refY="16" markerUnits="strokeWidth" markerWidth="32" markerHeight="32">
        <image x="0" y="0" width="32" height="32" xlink:href="https://foursquare.com/img/categories/nightlife/bar.png" />
      </marker>
    </defs>

    <g id="container" fill="#ddd" stroke="#000" onclick="changeWidth(evt)">
      <svg id="category-bars" x="0" y="0" width="75%" height="100%">
        <rect x="0" y="50%" width="100%" height="50%" fill="#500" />
        <line class="marker" x1="50%" y1="75%" x2="50%" y2="25%" marker-start="url(#anchorToBoxMiddle)" marker-end="url(#bar)" />
        <animate attributeName="width" attributeType="XML" begin="mouseover" dur="0.25s" fill="freeze" to="32px" />
        <animate attributeName="width" attributeType="XML" begin="mouseout" dur="0.25s" fill="freeze" to="75%" />
      </svg>
      <svg id="category-transportation" x="75%" y="0" width="10%" height="100%">
        <rect x="0" y="50%" width="100%" height="50%" fill="#a00" />
        <line class="marker" x1="50%" y1="75%" x2="50%" y2="25%" marker-start="url(#anchorToBoxMiddle)" marker-end="url(#pool)" />
        <animate attributeName="width" attributeType="XML" begin="mouseover" dur="0.25s" fill="freeze" to="32px" />
        <animate attributeName="width" attributeType="XML" begin="mouseout" dur="0.25s" fill="freeze" to="10%" />
      </svg>
      <svg id="category-shopping" x="85%" y="0" width="15%" height="100%">
        <rect x="0" y="50%" width="100%" height="50%" fill="#f00" />
        <line class="marker" x1="50%" y1="75%" x2="50%" y2="25%" marker-start="url(#anchorToBoxMiddle)" marker-end="url(#airport)" />
        <animate attributeName="width" attributeType="XML" begin="mouseover" dur="0.25s" fill="freeze" to="32px" />
        <animate attributeName="width" attributeType="XML" begin="mouseout" dur="0.25s" fill="freeze" to="15%" />
      </svg>
    </g>
  </svg>

  <script>
    (function(){
      firstStats    = document.getElementById('category-bars');

//      firstStats.setAttribute("fill", '#069');

      var target = $('#category-bars');

      // create the <animation> element
      var fadeOut = document.createElementNS('http://www.w3.org/2000/svg', 'animate');

      // set its attributes
      fadeOut.setAttributeNS(null, 'attributeName', 'opacity');
      fadeOut.setAttributeNS(null, 'begin', 'mouseover');
      fadeOut.setAttributeNS(null, 'to', 0.7);
      fadeOut.setAttributeNS(null, 'dur', 0.25);
      fadeOut.setAttributeNS(null, 'fill', 'freeze');

      // create the <animation> element
      var fadeIn = document.createElementNS('http://www.w3.org/2000/svg', 'animate');

      // set its attributes
      fadeIn.setAttributeNS(null, 'attributeName', 'opacity');
      fadeIn.setAttributeNS(null, 'begin', 'mouseout');
      fadeIn.setAttributeNS(null, 'to', 1);
      fadeIn.setAttributeNS(null, 'dur', 0.25);
      fadeIn.setAttributeNS(null, 'fill', 'freeze');

      // link the animation to the target
//      target.append(fadeIn,fadeOut);

      // start the animation
//      animation.beginElement();

    })();
  </script>
</body>
</html>

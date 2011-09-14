<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Stats 4 Square</title>
  <link rel="stylesheet" type="text/css" media="screen" href="media/main.css" />
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
  <section id="stats">
    <object id="svg" type="image/svg+xml" data="stats-categories.svg">
      Your browser doesn't seem to support SVG (or else, you wouldn't see that message).
    </object>
  </section>

  <script>
    (function(){

      var target = $('#category-bars');
//      alert(target);
      // create the <animation> element
      var animation = document.createElementNS(
      'http://www.w3.org/2000/svg', 'animate');
      // set its attributes
      animation.setAttributeNS(null, 'attributeName', 'opacity');
      animation.setAttributeNS(null, 'begin', 'indefinite');
      animation.setAttributeNS(null, 'to', 0);
      animation.setAttributeNS(null, 'dur', 0.25);
      animation.setAttributeNS(null, 'fill', 'freeze');
      // link the animation to the target
      target.append(animation);

      // start the animation
      animation.beginElement();




    })();
  </script>
</body>
</html>

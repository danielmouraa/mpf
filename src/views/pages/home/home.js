import 'owl.carousel';

jQuery.noConflict()(function ($) {
  $(document).ready(function(){

    $('#servidores .owl-carousel').owlCarousel({
      center: false,
      loop:false,
      items:2,
      margin:30,
    });

    $('#dados-do-concurso .owl-carousel').owlCarousel({
      center: true,
      loop:false,
      items:1,
      margin:30,
      nav: true,
      dots: false

    });
  });
});


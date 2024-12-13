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
    $('#questoes-da-prova .owl-carousel').owlCarousel({
      center: true,
      loop:false,
      items:1,
      margin:30,
      nav: true,
      dots: false

    });
    $('.prova input').click(function(){
      var _this = jQuery(this),
          _parent = jQuery(this).parents('li').eq(1);

      if( _parent.hasClass('respondida') )
          return false;

      _parent.addClass('respondida');

      $('.resposta', _parent ).show();
      $('.bx-controls-direction').show();
       $('.bt-concluir').show();

      if( _this.hasClass( 'certo' ) )
      {
          /* a função muda o background da div com id="box" */    
          _this.css("background","#00ff00");

          _resp++;
      }else
      {
          /* a função muda o background da div com id="box" */    
          $(".certo", _parent).css("background","#00ff00");
          _this.css("background","#e53e3e");
          _this.css("color","#ffffff");
      }

      slider.redrawSlider();

      return false
  });
  });
});


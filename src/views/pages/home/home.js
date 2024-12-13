import 'owl.carousel';

$(document).ready(function() {
  $('#depoimentos .owl-carousel').owlCarousel({
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
  });

  $('#timeline-concursos .timeline li').click(function(){
    var content = $(this).attr('data-content');

    $(this).prevAll().addClass('active');
    $(this).addClass('active');
    $(this).nextAll().removeClass('active');

    $('#timeline-concursos .conteudo .item:visible').each((i, $el) => {
      $($el).fadeOut(() => {
        $(content).fadeIn();
      });
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

  $('#map .state').click(function(){
    var regiao = $(this).attr('data-regiao');
    var $regiao_element = $('#' + regiao);

    $('.state .shape').removeClass('active');
    $('.state[data-regiao='+regiao+'] .shape').addClass('active');

    $('.content-regiao:visible').each((i, $el) => {
      $($el).fadeOut(() => {
        $regiao_element.fadeIn();
      });
    });
  });

  $('#map .state').click(function(e){
    e.preventDefault();
  });

  $('#seletory').change(function () {
    $('.parca .estado').css({'opacity': 0 , 'visibitity':'hidden'});
    $('#box_'+$(this).val()).css({'opacity': 1 , 'visibitity':'visible'});
  });
});

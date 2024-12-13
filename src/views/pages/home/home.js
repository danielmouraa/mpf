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

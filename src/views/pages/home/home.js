import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.green.css';
import 'owl.carousel';


$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
      center: false,
      loop:false,
      autoWidth:false,
      items:2,
      margin:30,
    });
});

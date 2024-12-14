import 'owl.carousel';

$(document).ready(function() {
  let mouseEnterTimeout;

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
    // mouseDrag: false
  });

  // $('#questoes-da-prova .owl-carousel').owlCarousel({
  //   center: true,
  //   loop:false,
  //   items:1,
  //   margin:30,
  // });

  $('#timeline-concursos .timeline li').on('click mouseenter', function() {
    clearTimeout(mouseEnterTimeout); // Clear any existing timer
    mouseEnterTimeout = setTimeout(() => {
      var content = $(this).attr('data-content');

      $(this).prevAll().addClass('active');
      $(this).addClass('active');
      $(this).nextAll().removeClass('active');

      $('#timeline-concursos .conteudo .item:visible').each((i, $el) => {
        if ($($el).attr('id') !== content.replaceAll('#', '')) {
          $($el).fadeOut(200, () => {
            $(content).fadeIn(200);
          });
        }
      });
    }, 200);
  });

  $('#map .state').on('click mouseenter', function() {
    clearTimeout(mouseEnterTimeout); // Clear any existing timer
    mouseEnterTimeout = setTimeout(() => {
      var regiao = $(this).attr('data-regiao');
      var $regiao_element = $('#' + regiao);

      $('.state .shape').removeClass('active');
      $('.state[data-regiao='+regiao+'] .shape').addClass('active');

      $('.content-regiao:visible').each((i, $el) => {
        if ($($el).attr('id') !== regiao) {
          $($el).fadeOut(200, () => {
            $regiao_element.fadeIn(200);
          });
        }
      });
    }, 200);

  });

  $('#map .state').click(function(e) {
    e.preventDefault();
  });

  $('#seletory').change(function () {
    $('.parca .estado').css({'opacity': 0 , 'visibitity':'hidden'});
    $('#box_'+$(this).val()).css({'opacity': 1 , 'visibitity':'visible'});
  });


  $('.card .reverse').on('click', function() {
    $(this).parents('.card-inner').addClass('active');
  });





  // ==================================== QUIZ ==================================== //

  let currentQuestion = 0;
  let quizData = [];
  let shuffledQuestions = [];
  let score = 0; // Variable to keep track of the user's score

  // Elements
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");
  const restartButton = document.getElementById("restart-button");

  // Fetch questions from the Open Trivia Database API
  async function fetchQuestions() {
    try {
      const questions = [
        {
          "question": "O tema central do fragmento ao lado é:",
          "correct_answer": "Há uma similaridade estrutural entre a elaboração publicitária e elaboração onírica.",
          "incorrect_answers": [
            "A publicidade desequilibra a relação de forças existente entre a demanda e a oferta de bens de consumo.",
            "Dramatizar o mito da queda é o objetivo perseguido pela retórica publicitária.",
            "Os comerciais veiculados pelos meios de comunicação cumprem o papel de informar o consumidor em potencial sobre as reais qualidades dos produtos.",
            "Ao adquirir bens de consumo, o consumidor sublima suas carências afetivas num estado de deleite sublime."
          ]
        },
        {
          "question": "Uma leitura errada do texto levaria a afirmar que:",
          "correct_answer": "A felicidade prometida nas propagandas dá ao homem a consciência de sua finitude.",
          "incorrect_answers": [
            "Interpretar literalmente o discurso publicitário é uma atitude ingênua.",
            "A publicidade elabora um cenário onírico para os objetos da sociedade industrial.",
            "O discurso publicitário é formulado com mensagens que se sustentam no princípio do prazer.",
            "Está incorporado à publicidade o componente mítico de retorno ao paraíso."
          ]
        },
        {
          "question": "Assinale a letra que contém enunciado falso.",
          "correct_answer": "Colocadas em seqüência, as expressões \"a se ressalvar\" e \"a se ressaltar\" (l.1O) são equivalentes quanto ao sentido.",
          "incorrect_answers": [
            "O termo \"(ritualiza-se)\" especifica o sentido de \"representa-se\" (l.20).",
            "O segmento \"- da consciência da finitude -\" explica a expressão \"lacuna primordial\" (l.16).<",
            "As expressões \"deleite sublime\", \"estado nirvânico\", \"gozo celestial\" (ls.8 e 9), colocadas em seqüência, reiteram a mesma idéia.",
            "Em \"A sua eficiência\" (l.5), o possessivo refere-se à eficiência da publicidade."
          ]
        },


        {
          "question": "No sistema jurídico brasileiro,",
          "correct_answer": "a lei pode criar exceções à regra da obrigatoriedade da licitação.",
          "incorrect_answers": [
            "é obrigatória a licitação em todos os casos de compras, alienações e serviços.",
            "é obrigatória a licitação apenas nos casos expressos em lei.",
            "a lei não pode criar exceções à regra da obrigatoriedade da licitação.",
            "as empresas públicas e as sociedades de economia mista são obrigadas a licitar, se assim estiver previsto em seus estatutos."
          ]
        },
        {
          "question": "É objetivo da República Federativa do Brasil, dentre outros:",
          "correct_answer": "erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais",
          "incorrect_answers": [
            "solução pacífica dos conflitos",
            "autodeterminação dos povos",
            "cidadania",
            "prevalência dos direitos humanos"
          ]
        },
        {
          "question": "Pode propor a ação de inconstitucionalidade perante o Supremo Tribunal Federal:",
          "correct_answer": "o Procurador-Geral da República.",
          "incorrect_answers": [
            "o Conselho Seccional da Ordem dos Advogados do Brasil.",
            "qualquer partido político.",
            "qualquer confederação sindical ou entidade de classe.",
            "a Mesa de Câmara Municipal."
          ]
        },
        {
          "question": "São princípios institucionais do Ministério Público:",
          "correct_answer": "unidade, indivisibilidade e independência funcional",
          "incorrect_answers": [
            "unidade, hierarquia, indivisibilidade e independência funcional",
            "unidade, autonomia administrativa e financeira e indivisibilidade",
            "autonomia funcional, autonomia administrativa e autonomia financeira",
            "unidade, indivisibilidade e hierarquia"
          ]
        },
        {
          "question": "A destituição do Procurador-Geral da República depende:",
          "correct_answer": "da iniciativa do Presidente da República, precedida de autorização da maioria absoluta do Senado Federal.",
          "incorrect_answers": [
            "da iniciativa exclusiva do Presidente da República.",
            "da iniciativa do Congresso Nacional.",
            "da iniciativa do Senado Federal.",
            "de iniciativa dos membros do Ministério Público."
          ]
        },
        {
          "question": "A respeito do servidor concursado do Ministério Público da União, é correto dizer que:",
          "correct_answer": "não pode aposentar-se voluntariamente, enquanto pendente processo administrativo disciplinar contra ele.",
          "incorrect_answers": [
            "adquire vitaliciedade após dois anos de efetivo exercício.",
            "é demissível ad nutum enquanto não completa dois anos de efetivo exercício.",
            "somente pode ser posto em disponibilidade por força de processo administrativo disciplinar, em que se lhe assegure o direito de ampla defesa.",
            "somente pode ser demitido por força de sentença judicial transitada em julgado."
          ]
        },
        {
          "question": "Assinale a assertiva correta.",
          "correct_answer": "O processo disciplinar pode ser revisto, a qualquer tempo; ainda que já falecido o servidor punido.",
          "incorrect_answers": [
            "A simples alegação de injustiça da penalidade pode constituir fundamento para a revisão.",
            "O processo disciplinar pode ser revisto exclusivamente a pedido do servidor punido.",
            "Se a Comissão Revisora entender que a punição foi excessivamente branda, poderá propor o agravamento da penalidade inicialmente imposta.",
            "No processo revisionai, o ônus da prova cabe à Comissão Revisora."
          ]
        }
      ]

      quizData = questions;
      shuffledQuestions = shuffleArray([...quizData]);
      currentQuestion = 0;
      score = 0; // Reset score at the start of a new quiz
      loadQuestion();
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  // Shuffle function to randomize quiz order
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Load the current question
  function loadQuestion() {
    if (currentQuestion < shuffledQuestions.length) {
      const currentQuiz = shuffledQuestions[currentQuestion];
      questionElement.innerHTML = '<span class="index">' + (currentQuestion + 1) + '</span>' + '<div><span class="enunciado">' + currentQuiz.question + '</span></div>';
      optionsElement.innerHTML = "";

      const allOptions = [...currentQuiz.incorrect_answers, currentQuiz.correct_answer];
      shuffleArray(allOptions);

      allOptions.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(option, currentQuiz.correct_answer));
        optionsElement.appendChild(button);
      });

      nextButton.classList.add("hidden");
    } else {
      questionElement.innerHTML = `<span class="resultado">Finalizado! 🎉<br/> Você acertou: ${score} de ${shuffledQuestions.length}</span>`;
      optionsElement.innerHTML = "";
      nextButton.classList.add("hidden");
      restartButton.classList.remove("hidden");
    }
  }

  // Handle answer selection
  function selectAnswer(selectedOption, correctOption) {
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
      if (button.textContent === correctOption) {
        button.classList.add("correct");
      } else if (button.textContent === selectedOption) {
        button.classList.add("wrong");
      }
    });

    if (selectedOption === correctOption) {
      score++; // Increment score if the answer is correct
    }

    nextButton.classList.remove("hidden");
  }

  // Event listeners for buttons
  nextButton.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();

    if (currentQuestion > 0) {
      backButton.classList.remove("hidden");
    }
  });

  // Event listeners for buttons
  backButton.addEventListener("click", () => {
    currentQuestion--;
    loadQuestion();
    if (currentQuestion === 0) {
      backButton.classList.add("hidden");
    }
  });

  restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    shuffledQuestions = shuffleArray([...quizData]);
    score = 0; // Reset score for the new quiz
    loadQuestion();
    restartButton.classList.add("hidden");
    nextButton.classList.add("hidden");
  });
  

  // Start the quiz when the page loads
  fetchQuestions();

  // ==================================== FIM QUIZ ================================ //


  // ==================================== MODAL =================================== //

  var modal = $('#myModal');
  var span = $('.close');
  var video = $('#video');

  $('.open-modal').click(function() {
    var videoUrl = $(this).data('video');
    video.attr('src', videoUrl);
    modal.show();
  });

  span.click(function() {
    modal.hide();
    video.attr('src', '');
  });

  $(window).click(function(event) {
    if (event.target == modal[0]) {
      modal.hide();
      video.attr('src', '');
    }
  });

  // ==================================== FIM MODAL ================================= //


  // ==================================== GRAFICO INSCRITOS =================================== //

  $('#grafico-vagas .labels li').on('click mouseenter', function() {
    var delay = 200;

    clearTimeout(mouseEnterTimeout); // Clear any existing timer
    mouseEnterTimeout = setTimeout(() => {
      $('#grafico-vagas .icones').attr('class', `icones ${$(this).data('categoria')}`);

      var $infoTarget = $('#grafico-vagas .info .' + $(this).data('categoria'));
      var $infoVisible = $(`#grafico-vagas .info div:visible:not(.${$(this).data('categoria')})`);

      if ($infoVisible.length) {
        $infoVisible.each((i, $el) => {
          $($el).fadeOut(delay, () => {
            $infoTarget.fadeIn(delay);
          });
        });
      } else {
        $infoTarget.fadeIn(delay);
      }
    }, delay); // Delay in milliseconds
  });



  // ==================================== FIM GRAFICO INSCRITOS =============================== //



});

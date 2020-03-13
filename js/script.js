// Funzione orario
function orario(){
var data = new Date;                         // Assegniamo alla variabile data, una data completa
var ora = data.getHours();                   // Assegniamo alla variabile ora, l'ora, prelevandola dalla variabile data
var minuti = data.getMinutes();              // Assegniamo alla variabile minuti, i minuti, prelevandoli dalla variabile data
    if (minuti < 10) {
        minuti = "0" + minuti;
    };
var orario = ora + "." + minuti;             // Assegniamo alla variabile orario l'ora + i minuti
return orario                                // Ritorniamo l'orario al "mondo esterno"
}

// Funzione scroll automatico all'ultimo messaggio
function scroll() {
    var pixelScroll = $(".right-center.active").prop('scrollHeight');       // Ci prendiamo l'altezza del div
    $(".right-center.active").scrollTop(pixelScroll);                       // Scrolliamo il div
};

// Funzione inviaMessaggio
function inviaMessaggio(){
    var textInput = $("#message-input").val();                          // Assegniamo il valore dell'input alla variabile textInput
    if (textInput.trim().length > 0) {                                  // Controlliamo l'input inserito e con trim, eliminiamo gli spazi vuoti all'inizio e alla fine dell'input
        $("#message-input").val("");                                    // Ripuliamo il box input

        var source = $("#template-msg-sent").html();                    // Leggiamo ed associamo alla variabile source il template-msg-sent presente in HTML
        var template = Handlebars.compile(source);                      // Compiliamo con Handlebars la variabile source e la associamo alla variabile template

        var msgInviato = {                                              // Definiamo un oggetto
                testoMessaggio: textInput,                              // Associamo alla chiave testoMessaggio l'input utente
                orarioAttuale: orario                                   // Associamo all'orario, la variabile orario ricavata dall'omonima funzione
        };

        var templatePopolato = template(msgInviato);                    // Associamo ad una nuova variabile il template opportunamente modificato con il nostro oggetto
        $('.right-center.active').append(templatePopolato);             // Lo "appendiamo" al div specificato

        scroll();

        setTimeout(function(){                                          // Stesso discorso di prima con i messaggi ricevuti e con un piccolo ritardo nella risposta

            var source = $("#template-msg-received").html();
            var template = Handlebars.compile(source);

            var testoRisposta = {
                    testoRisposta: "ok, va bene. A dopo",
                    orarioAttuale: orario
                };

            var templatePopolato = template(testoRisposta);
            $('.right-center.active').append(templatePopolato);

            scroll();
        }, 1000);
    }
}

function generaContatti() {
    var source = $("#template-contact-box").html();                         // Leggiamo ed associamo alla variabile source il template-contact-box presente in HTML
    var template = Handlebars.compile(source);                              // Compiliamo con Handlebars la variabile source e la associamo alla variabile template

    var contatti = []                                                       // Definiamo un oggetto
    {
        posizioneContatto: 'primo',
        srcImmagine: 'img/avataaars.png',
        nome: 'Luca',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'secondo',
        srcImmagine: 'img/avataaars(1).png',
        nome: 'Mirko',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'terzo',
        srcImmagine: 'img/avataaars(2).png',
        nome: 'Raffaele',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'Federico',
        srcImmagine: 'img/avataaars(3).png',
        nome: 'Luca',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'quinto',
        srcImmagine: 'img/avataaars(4).png',
        nome: 'Giovanni',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'sesto',
        srcImmagine: 'img/avataaars(5).png',
        nome: 'Luigi',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'settimo',
        srcImmagine: 'img/avataaars(6).png',
        nome: 'Francesco',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'ottavo',
        srcImmagine: 'img/avataaars(7).png',
        nome: 'Alberto',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'nono',
        srcImmagine: 'img/avataaars(8).png',
        nome: 'Filippo',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'decimo',
        srcImmagine: 'img/avataaars(9).png',
        nome: 'Fabiola',
        testo: 'Non poteva essere altrimenti'
    },
    {
        posizioneContatto: 'undicesimo',
        srcImmagine: 'img/avataaars(10).png',
        nome: 'Nikolas',
        testo: 'Non poteva essere altrimenti'
    },
};

    for (var i = 0; i < contatti.length; i++) {
        var templatePopolato = template(contatti[i]);
        $('.left-contacts').append(templatePopolato);
    }
}

$(document).on('click','.icon-dropdown', function() {
    $('.message').children('.dropdown').removeClass('dropdown-active');         // Chiudo tutti quelli prima
    $(this).siblings('.dropdown').toggleClass("dropdown-active");               // Apro il mio menu a tendina
});

$(document).on('click', '.delete', function() {
    $(this).closest('.message').remove();
});

$(document).ready(function(){
    generaContatti();

    // Modalità dark al click
    $("#dark-mode").click(function(){
        $("#dark-mode").toggleClass("dark-mode-active");
        $(".boolzap-window").toggleClass("boolzap-window-dark");
        $(".left-nav").toggleClass("left-nav-dark");
        $(".contact-box").toggleClass("contact-box-dark");
        $(".left-search").toggleClass("left-search-dark");
        $(".left-contacts").toggleClass("left-contacts-dark");
        $(".right-nav").toggleClass("right-nav-dark");
        $(".right-bottom").toggleClass("right-bottom-dark");
    });

    $("#last-access #la-time").text(orario());

    // Funzione inviaMessaggio al click o alla pressione del tasto INVIO
    $('.bottom-icon i').click(function() {
        inviaMessaggio();
    });
    $("#message-input").keypress(function(event){
        if (event.keyCode == 13) {
           inviaMessaggio();
        };
    });

    // Dopo aver selezionato il box dell'input l'icona cambia
    $('#message-input').focus(function(){
        $('.bottom-icon i').toggleClass('fa fa-microphone fas fa-paper-plane');
    }).blur(function() {
        $('.bottom-icon i').toggleClass('fa fa-microphone fas fa-paper-plane');
    });

    $('#search-box').focus(function(){
        $('.left-search i').toggleClass('fas fa-search fas fa-arrow-left');
    }).blur(function() {
        $('.left-search i').toggleClass('fas fa-search fas fa-arrow-left');
    });

    // Funzione del box cerca
    $('#search-box').keyup(function(event){                                         // Impostiamo una funzione di lettura tasti al search-box
        var nomeCercato = $(this).val().toLowerCase();                              // Prendiamo questo valore e lo trasformiamo in caratteri minuscoli, associandolo ad una variabile
        $(".contact-box").each(function() {                                         // Applichiamo un ciclo al relativo div
            var nomeContatto = $(this).find(".name-contact").text().toLowerCase();  // Associamo ad una variabile il testo in minuscolo, trovato nella classe name-contact
            if (nomeContatto.includes(nomeCercato)) {                               // Confrontiamo le due variabili
                $(this).show();                                                     // Se il carattere inserito nel search box è presente nella variabile "nomeTrovato", mostriamo il box
            } else {
                $(this).hide();                                                     // Altrimenti, lo nascondiamo
            }
        });
    });

    $(".contact-box").click(function(){                               // Applichiamo una funzione al click
        var utenteSelezionato = $(this).data("codice-utente");        // Associamo alla variabile, il valore del contatto selezionato, chiamato da noi "codice utente"
        var immagineUtente = $(this).find("img").attr("src");         // Associamo alla variabile, l'attributo src presente nel tag img con .attr in lettura
        var nomeUtente = $(this).find(".name-contact").text();        // Associamo alla variabile, il nome contenuto nel tag con .text in lettura
        $(".contact-box").removeClass("active-contact");              // Rimuoviamo l'active da tutti i contatti
        $(this).addClass("active-contact");                           // Applichiamo l'active soltanto sul box contatto selezionato
        $(".right-nav img").attr("src", immagineUtente);              // Viene sostituita l'immagine precedente con quella dell'immagine dell'utente selezionato con .attr in scrittura
        $(".right-nav #name").html("<b>"+ nomeUtente +"</b>");        // Viene sostituito il nome utente con quello selezionato e viene aggiunto il grassetto con .html in scrittura

        $(".right-center").each(function(){                             // Applichiamo un ciclo
            if ($(this).data("codice-utente") == utenteSelezionato) {   // Se il data dei codici utenti presenti in .right-center, corrisponde al data del nostro .contact-box selezionato allora;
                $(".right-center").removeClass("active");               // Rimuoviamo tutti gli active
                $(this).addClass("active");                             // Aggiungiamo l'active soltanto a quello selezionato
            }
        });
    });
});

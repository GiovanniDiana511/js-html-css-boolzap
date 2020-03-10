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
    var pixelScroll = $(".right-center").prop('scrollHeight');        // Ci prendiamo l'altezza del div
    $(".right-center").scrollTop(pixelScroll);                        // Scrolliamo il div
};

// Funzione inviaMessaggio
function inviaMessaggio(){
    var textInput = $("#message-input").val();                        // Assegniamo il valore dell'input alla variabile
    if (textInput.trim().length > 0) {                                // Controlliamo l'input inserito e con trim, eliminiamo gli spazi vuoti all'inizio e alla fine dell'input
        $("#message-input").val("");                                  // Ripuliamo il box input
        var messageSent = $(".message-dx.template.active").clone();   // Ci cloniamo un template
        messageSent.find(".message-sent > p").text(textInput);        // Inseriamo il testo contenuto nel box input nel tag <p>
        messageSent.find(".message-sent > p").after(orario);          // Inseriamo l'orario (attuale) preso dalla funzione "orario" e lo inseriamo nell'after del tag <p>
        messageSent.removeClass("template");                          // Rimuoviamo la classe template con display none
        $(".right-center.active").append(messageSent);                // Reinserisco il template clonato nel div

        $(".message-sent").click(function(){
            $(this).find(".dropdown").slideToggle(500);
        });

        //$(".delete").click(function){

        //}

        scroll();

        setTimeout(function(){
            var messageReceived = $(".message-sx.template.active").clone();
            messageReceived.find(".message-received > p").text("ok");
            messageReceived.find(".message-received > p").after(orario);
            messageReceived.removeClass("template");
            $(".right-center.active").append(messageReceived);

            $(".message-received").click(function(){
                $(this).find(".dropdown").slideToggle(500);
            });

            scroll();
        }, 1000);
    }
}

$(document).ready(function(){
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
    $(".bottom-icon i").click(inviaMessaggio);
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
        var carattereFiltro = $(this).val().toLowerCase();                          // Prendiamo questo valore e lo trasformiamo in caratteri minuscoli, associandolo ad una variabile
        $(".contact-box").each(function() {                                         // Applichiamo un ciclo al relativo div
            var nomeTrovato = $(this).find(".name-contact").text().toLowerCase();   // Associamo ad una variabile il testo in minuscolo, trovato nella classe name-contact
            if (nomeTrovato.includes(carattereFiltro)) {                            // Confrontiamo le due variabili
                $(this).show();                                                     // Se il carattere inserito nel search box è presente nella variabile "nomeTrovato", mostriamo il box
            } else {
                $(this).hide();                                                     // Altrimenti, lo nascondiamo
            }
        });
    });

    $(".contact-box").click(function(){                               // Applichiamo una funzione al click
        var utenteSelezionato = $(this).data("codice-utente");        // Associamo alla variabile, il valore chiamato da noi "codice utente"
        var immagineUtente = $(this).find("img").attr("src");         // Associamo alla variabile, l'attributo src presente nel tag img con .attr in lettura
        //console.log(immagineUtente);
        var nomeUtente = $(this).find(".name-contact").text();        // Associamo alla variabile, il nome contenuto nel tag con .text in lettura
        //console.log(nomeUtente);

        $(".right-nav img").attr("src", immagineUtente);              // Viene sostituita l'immagine precedente con quella dell'immagine dell'utente selezionato con .attr in scrittura
        $(".right-nav #name").html("<b>"+ nomeUtente +"</b>");        // Viene sostituito il nome utente con quello selezionato e viene aggiunto il grassetto con .html in scrittura
        //da completare
        $(".right-center").each(function(){
            if ($(this).data("codice-utente") == utenteSelezionato) {
                $(".right-center").removeClass("active");
                $(this).addClass("active");
            }
        });
    });
});

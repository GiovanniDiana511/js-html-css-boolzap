// Funzione orario
function orario(){
var data = new Date;                         // Assegniamo alla variabile data, una data completa
var ora = data.getHours();                   // Assegniamo alla variabile ora, l'ora, prelevandola dalla variabile data
var minuti = data.getMinutes();              // Assegniamo alla variabile minuti, i minuti, prelevandoli dalla variabile data
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
        var messageSent = $(".message-dx.template").clone();          // Ci cloniamo un template
        messageSent.find(".message-sent > p").text(textInput);        // Inseriamo il testo contenuto nel box input nel tag <p>
        messageSent.find(".message-sent > p").after(orario);          // Inseriamo l'orario (attuale) preso dalla funzione "orario" e lo inseriamo nell'after del tag <p>
        messageSent.removeClass("template");                          // Rimuoviamo la classe template con display none
        $(".right-center").append(messageSent);                       // Reinserisco il template clonato nel div
        scroll();

        setTimeout(function(){
            var messageReceived = $(".message-sx.template").clone();
            messageReceived.find(".message-received > p").text("ok");
            messageReceived.find(".message-received > p").after(orario);
            messageReceived.removeClass("template");
            $(".right-center").append(messageReceived);
            scroll();
        }, 1000);
    }
}

$(document).ready(function(){
    $("#dark-mode").click(function(){
        $("#dark-mode").toggleClass("dark-mode-active");
        $(".boolzap-window").toggleClass("boolzap-window-dark");
        $(".left-nav").toggleClass("left-nav-dark");
        $(".left-search").toggleClass("left-search-dark");
        $(".left-contacts").toggleClass("left-contacts-dark");
        $(".right-nav").toggleClass("right-nav-dark");
        $(".right-bottom").toggleClass("right-bottom-dark");
    });

    $("#last-access #la-time").text(orario());
    //$(".name-contact").after(orario);
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
    // Funzione del box cerca
    $('#search-box').keyup(function(event){
        var carattereFiltro = $(this).val().toLowerCase();
        //console.log(carattereFiltro);
        $(".contact-box").each(function() {
            var nomeTrovato = $(this).find(".name-contact").text().toLowerCase();
            if (nomeTrovato.includes(carattereFiltro)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

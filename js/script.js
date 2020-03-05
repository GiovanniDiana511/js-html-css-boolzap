function inviaMessaggio(){

    var textInput = $("#message-input").val();
    $("#message-input").val("");
    var messageSent = $(".message-dx.template").clone();
    messageSent.find(".message-sent > p").text(textInput);
    var data = new Date;
    var ora = data.getHours();
    var minuti = data.getMinutes();
    var orario = ora + "." + minuti;
    messageSent.find(".message-sent > p").after(orario);
    messageSent.removeClass("template");
    $(".right-center").append(messageSent);

    setTimeout(function(){
    var messageReceived = $(".message-sx.template").clone();
    messageReceived.find(".message-received > p").text("ok");
    messageReceived.find(".message-received > p").after(orario);
    messageReceived.removeClass("template");
    $(".right-center").append(messageReceived);
    }, 1000);
}

$(document).ready(function(){
    $(".fas.fa-paper-plane").click(inviaMessaggio);
    //$("#message-input").keyup(function(e){
    //var code = e.key; //tasto premuto
    //    if (code==13) {
    //        inviaMessaggio();
    //    };
    //});
});

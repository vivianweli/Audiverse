function signup(){
    let t = $("#content-center");
    $.ajax({url: "/getmsgs?gg="+(msgnum?msgnum:receivedmessage), success: function(result){
       // $("#div1").html(result);
       let msgs = JSON.parse(result)
       receivedmessage += msgs.length
       for (let message of msgs){
        t.append("<div>"+message.name +": "+ message.msg+"</div>")
       }
    }});
    
}
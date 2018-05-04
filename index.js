var toUrl = document.getElementById("toUrl"),
    msgIn = document.getElementById("msgs"),
    fromUrl = document.getElementById("fromUrl"),
    to = document.getElementById("to"),
    msg = document.getElementById("message"),
    from = document.getElementById("from"),
    postCard = document.getElementById("postcard"),
    bgImg = document.getElementById("bgImgUrl"),
    addGal = document.getElementById("addGal"),
    prev = document.getElementById("preview"),
    add = document.getElementById("add"),
    save = document.getElementById("save"),
    load = document.getElementById("load");

var myPostCards = [];
var num = 0;

toUrl.addEventListener("keyup", function(){
   to.innerHTML = "To " + toUrl.value;
});

msgIn.addEventListener("keyup", function(){
   msg.innerHTML = msgIn.value;
});

fromUrl.addEventListener("keyup", function(){
    from.innerHTML = "From " + fromUrl.value;
});

bgImg.addEventListener("keyup", function(ev){

    if(ev.keyCode == 13){
      num++;
       if(bgImg.value == "auto"){

         console.log("")
         postCard.style.backgroundImage = "url(imgs/auto"+num+".jpg)";
            if(num == 3){
              num = 0;
            }

       } else {
         postCard.style.backgroundImage = "url("+ bgImg.value +")"
       }
   }

});

addGal.addEventListener("click", function(){
    if (bgImg.value == ""){
      postCard.style.backgroundImage = "url(imgs/default.png)";
    }

    var obj = {
        bg:postCard.style.backgroundImage,
        too:to.innerHTML,
        message:msg.innerHTML,
        fromm:from.innerHTML
    };

    myPostCards.push(obj);

    createPostcard(obj.bg,obj.too,obj.message,obj.fromm);
});

function createPostcard(too,bg,message,fromm){
  var miniBg = document.createElement("div"),
      miniTo = document.createElement("div"),
      miniMsg = document.createElement("div"),
      miniFrom = document.createElement("div");

      miniBg.style.backgroundImg = bg;
      miniTo.innerHTML = too;
      miniMsg.innerHTML = message;
      miniFrom.innerHTML = fromm;

      miniBg.className = "miniPostCard";
      miniTo.className = "miniTo";
      miniMsg.className = "miniMsg";
      miniFrom.className = "miniFrom";

      prev.appendChild(miniBg);
      miniBg.appendChild(miniTo);
      miniBg.appendChild(miniMsg);
      miniBg.appendChild(miniFrom);

      miniBg.addEventListener("click", function(){
        to.innerHTML = this.firstChild.innerHTML;
        msg.innerHTML = this.children[1].innerHTML;
        from.innerHTML = this.children[2].innerHTML;
      });
}

//Store
saveArr.addEventListener("click", function(){
    localStorage.setItem("myPostCard",JSON.stringify(myPostCards));
    console.log(localStorage.getItem("myPostCard"));
});

//Retrieve
var prevBg = [];

loadArr.addEventListener("click", function(){
  console.log(localStorage.getItem("myPostCard"));
    prev.innerHTML = "";
    prevBg = localStorage.getItem("myPostCard");
    prevBg = JSON.parse(prevBg);

    for(var i=0; i<prevBg.length; i++){
      createPostcard(prevBg[i].to, prevBg[i].bgImg, prevBg[i].from, prevBg[i].msg)
    }
});

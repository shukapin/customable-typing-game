var question;
var time_limit = 90;
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var line_cnt;

function ready() {
    saveTexts();
    readytime = 3;
    scoredis.innerHTML="";
    start_menu.style.visibility ="hidden";
    var readytimer = setInterval(function(){
        count.innerHTML=readytime;
        readytime--;
        if(readytime < 0){
            clearInterval(readytimer);
            gameStart();
        }
    },1000);
}

function saveTexts() {
    question = document.getElementById("input_texts").value;
    //.value.split('\n');
    console.log("question: " + question);
}

function gameStart() {
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    var time_remaining = time_limit;
    var gametimer = setInterval(function(){
       count.innerHTML="Remain TIme: "+time_remaining;
        time_remaining--;
        if(time_remaining <= 0){
        clearInterval(gametimer);
            finish();
    }
    },1000);
}

function wordDisplay(){
    word.innerHTML = question;
    charInsort();
}

function charInsort(){
    word_char = question.charAt(char_num);
}

function finish(){
    score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
    scoredis.innerHTML=":"+score+"点"+"<hr>correct types:"+correct+"<br>mistakes:"+mistake+"<br>correct ratio"+(correct/(correct+mistake)*100).toFixed(1)+"%";
    count.innerHTML="";
    word.innerHTML="";
    start_button.style.visibility ="visible";
    word_char=0;
    line_cnt = 0;
    char_num = 0;
}

document.onkeydown = function(event) {
        keyStr = event.key;
        console.log("keyStr: " + keyStr);
        console.log("word_char: " + word_char);
        console.log("question: " + question);

    if(keyStr == word_char){
        word.innerHTML="<span style='color: red;'>"+question.substr(0,char_num+1)+"</span>"+question.substr(char_num+1,question.length);
        char_num++;
        correct++;
        charInsort();
    } else {
        mistake++;
    }

    if(char_num == question.length){
        char_num=0;
        wordDisplay();
    }
};

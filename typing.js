var question;
var time_limit = 10;
var correct;
var mistake;
var char_num = 0;
var word_char;
var line_cnt = 0;

function ready() {
    saveTexts();
    readytime = 3;
    time_limit = document.getElementById("time").value;
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
    question = document.getElementById("input_texts")
        .value.replace(/’/g, '\'')
        .replace(/—/g, '-')
        .replace(/[“”]/g, '"')
        .replace(/[^A-Za-z0-9%,\ \-"'.]/g, '_')
        .split('\n');
}

function gameStart() {
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    var time_remaining = time_limit;
    var gametimer = setInterval(function(){
       count.innerHTML="Remain Time: "+time_remaining;
        time_remaining--;
        if(time_remaining <= 0){
        clearInterval(gametimer);
            finish();
    }
    },1000);
}

function wordDisplay(){
    word.innerHTML = question[line_cnt];
    charInsort();
}

function charInsort(){
    word_char = question[line_cnt].charAt(char_num);
}

function finish(){
    var score = Math.floor(Math.pow(correct,2) * Math.pow((correct/(correct+mistake)),5));
    var wpm = Math.floor( correct / time_limit * 60 / 5 );
    scoredis.innerHTML= "<hr>Score: " +score+"<br>WPM: "+ wpm +"<br>correct types: "+correct+"<br>mistakes: "+mistake+"<br>correct ratio: "+(correct/(correct+mistake)*100).toFixed(1)+"%";
    count.innerHTML="";
    word.innerHTML="";
    start_menu.style.visibility ="visible";
    word_char=0;
    line_cnt = 0;
    char_num = 0;
}

document.onkeydown = function(event) {
        keyStr = event.key;
        console.log("keyStr: " + keyStr);
        console.log("word_char: " + word_char);
        console.log("question.length : " + question.length);

    if(keyStr == word_char){
        word.innerHTML="<span style='color: red;'>"+question[line_cnt].substr(0,char_num+1)+"</span>"+question[line_cnt].substr(char_num+1,question[line_cnt].length);
        char_num++;
        correct++;
        charInsort();
    } else {
        mistake++;
    }

    if(char_num == question[line_cnt].length){
        char_num=0;
        if (line_cnt < question.length-1) {
            line_cnt++;
        } else {
            line_cnt = 0;
        }
        wordDisplay();
    }
};

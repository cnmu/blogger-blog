var quiz = {};
quiz.currentquestionnumber=1;
quiz.quizInfo=jsonParse(Backend.call("quizzinfos"));

quiz.SelectedAnswersall = [];
for( var i=0 ; i < quiz.quizInfo.length ; i++){
    quiz.SelectedAnswersall[i]=[];
}

quiz.GetQuestionbyNumber = function(n){
    return{
        AudioUrl : dir+'/'+quiz.quizInfo[n-1].AudioUrl ,
        ImageUrl : dir+'/'+quiz.quizInfo[n-1].ImageUrl ,
        RightAnswer : quiz.quizInfo[n-1].RightAnswers.split(',').sort()
    }
}
 
quiz.displayQuestion = function(src){
    //play mp3 question
    document.getElementById('quizz_audio').innerHTML = mp3player.mini(src.AudioUrl);
    //set question image
    document.getElementById('questionimg').src = src.ImageUrl;
        
    if(quiz.currentquestionnumber == quiz.quizInfo.length){
        document.getElementById('next_button').innerHTML = '<img style="border-radius:30px;cursor:pointer;" src="images/res_button.PNG"/>';
        document.getElementById('next_button').onclick   = function(){
            quiz.showresults();
        }
    }
}

quiz.displayQuestion.next = function(src){
    if(quiz.currentquestionnumber < quiz.quizInfo.length){
        quiz.currentquestionnumber++;
        window.location.href = loc
            +"?SelectedAnswersall=" + JSON.stringify(quiz.SelectedAnswersall)
            +"&currentquestionnumber=" + quiz.currentquestionnumber;
        quiz.SelectedAnswers = [];
        console.log(quiz.SelectedAnswersall);
    }
}
quiz.displayQuestion.previous = function(src){
    if(quiz.currentquestionnumber > 1){
        quiz.currentquestionnumber--;
       window.location.href = loc
            +"?SelectedAnswersall=" + JSON.stringify(quiz.SelectedAnswersall)
            +"&currentquestionnumber=" + quiz.currentquestionnumber;
        quiz.SelectedAnswers = [];
    }
}
    
quiz.SelectedAnswers = [];
    
quiz.AppendAnswer = function(element){
    var answer = element.innerHTML;
    var alreadyselected = quiz.SelectedAnswersall[quiz.currentquestionnumber-1].inArray(answer);
    if(!alreadyselected){
        //add answer
        quiz.SelectedAnswersall[quiz.currentquestionnumber-1].push(answer);
        quiz.SelectedAnswersall[quiz.currentquestionnumber-1].sort();
        quiz.SelectedAnswersall[quiz.currentquestionnumber-1]=quiz.SelectedAnswersall[quiz.currentquestionnumber-1];
        element.className = "aqua_button green_button";
    }else{
        //remove answer
        quiz.SelectedAnswersall[quiz.currentquestionnumber-1].splice(quiz.SelectedAnswersall[quiz.currentquestionnumber-1].indexOf(answer), 1);
        quiz.SelectedAnswersall[quiz.currentquestionnumber-1].sort();
        quiz.SelectedAnswersall[quiz.currentquestionnumber-1]=quiz.SelectedAnswersall[quiz.currentquestionnumber-1];
        element.className = "aqua_button";
    }
    console.log(quiz.SelectedAnswersall);
}

quiz.showresults = function(){
    var rank=0;
    for(var k in quiz.SelectedAnswersall){
        if(quiz.SelectedAnswersall.length > k){
            
            var rightanswer = quiz.quizInfo[k].RightAnswers.split(',').sort().join(",");
            
            var selectedanswer = quiz.SelectedAnswersall[k].sort().join(",");
            var j = parseInt(k)+1;
            console.log(j);
            document.getElementById('cell'+j).innerHTML=j;
            if(rightanswer == selectedanswer){
                rank++;
                document.getElementById('cell'+j).className="cell right";
                
            }else{
                document.getElementById('cell'+j).className="cell wrong";
            }
            
        }
    }
    document.getElementById('quizz_img').className = "hidden";
    document.getElementById('quizz_results').className = "table";
    document.getElementById('quizz_audio').className = "hidden";
    document.getElementById('quizz_buttons').className = "hidden";
    document.getElementById('quizz_rest').className = "";
    document.getElementById('rank').innerHTML = rank+"/"+quiz.SelectedAnswersall.length;
}

window.onload = function(){
    if(typeof QueryString.currentquestionnumber != 'undefined'){
        var slctdall=decodeURIComponent(QueryString.SelectedAnswersall);
        quiz.SelectedAnswersall=jsonParse(slctdall);
        console.log(quiz.SelectedAnswersall);
        console.log(slctdall);
        quiz.currentquestionnumber=QueryString.currentquestionnumber;
        quiz.displayQuestion(quiz.GetQuestionbyNumber(quiz.currentquestionnumber));
        for( var i=0 ; i < 4 ; i++){
            if(quiz.SelectedAnswersall[quiz.currentquestionnumber-1].inArray(i+1)){
                document.getElementById('choice'+(i+1)).className="aqua_button green_button";    
            }else{
                document.getElementById('choice'+(i+1)).className="aqua_button";
            }
        }
    }else{
            quiz.displayQuestion(quiz.GetQuestionbyNumber(quiz.currentquestionnumber));
    }
}


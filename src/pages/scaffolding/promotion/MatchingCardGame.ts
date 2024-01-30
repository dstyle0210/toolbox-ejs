/* API
    const matchingCardGame = new UI.event.MatchingCardGame(wrapperId,options);

    ## Options (default)
    {
        cols:2, // 가로줄 기본값
        rows:3, // 세로줄 기본값
        cardWidth:266, // 카드 가로값
        cardHeight:198, // 카드 세로값
        vertical:15, // 가로 줄 간격
        horizontal:20, // 세로줄 간격
        cardSrcs:[], // 카드 앞면 목록
        backSrc:"", // 카드 뒷면 이미지
        successCallback(){}, // 전체 짝맞추기 성공 콜백함수
        matchingCallback(){}, //짝맞추기 성공 콜백함수
        unmatchingCallback(){} // 짝맞추기 실패 콜백함수
    }

    ## Properties
    {number} matchingCardGame.flipAllDelay // flipAll 메소드 실행시 전체가 뒤집히는데 걸리는 시간(ms)

    ## Method
    matchingCardGame.init(); // 초기 카드 배치(init 해야 화면이 나옴)
    matchingCardGame.action(); // 카드 터치 가능해짐
    matchingCardGame.flipAll(); // 카드 모두 뒤집기(뒤->앞 , 앞->뒤)
    matchingCardGame.reset(); // 카드 재배치 , 뒷면으로 섞여서 배치 된다 , action 기능 사라짐
    matchingCardGame.getResult(); // 현재 배치결과 , return boolean
    matchingCardGame.on(events,callback) // 이벤트등록 , 하단 "Events" 참고
    
    ## Events
    "matching" : 짝맞추기 성공
    "unmatching" : 짝맞추기 실패
    "success" : 전체 짝맞추기 성공
*/
const MatchingCardGame = function(gameBoardId:string,options = {}){
    // props
    const opt = $.extend({
        cols:2,
        rows:3,
        cardWidth:266,
        cardHeight:198,
        vertical:15,
        horizontal:20,
        cardSrcs:[],
        backSrc:"",
        successCallback(){},
        matchingCallback(){},
        unmatchingCallback(){}
    },options);

    // computed
    const $gameBoard = $(gameBoardId); // 카드 짝맞추기 게임판
    const blocks = opt.cols * opt.rows; // 총 블럭 수
    let cards = suffleCards(); // 카드들

    // 카드뒤집은 결과 초기화
    let isFlip = false; // 뒤집는 중인가?
    let isSuccess = false; // 전체 짝맞추기 성공여부
    let firstCard,secondCard;
    const selectCardReset = () => {
        firstCard = {idx:99,key:99}; // 사용자가 첫번째로 뒤집은 카드
        secondCard = {idx:99,key:99}; // 사용자가 두번째로 뒤집은 카드    
    };
    selectCardReset();

    // init : DOM 생성 및 셋팅
    let gameBoardWrap = gameBoardId+"Wrap";
    let gameBoardCanvas = gameBoardId+"Canvas";
    let gameBoardCanvasWidth = (opt.cols*opt.cardWidth) + ((opt.cols-1)*opt.horizontal); // 가로값
    let gameBoardCanvasHeight = (opt.rows*opt.cardHeight) + ((opt.rows-1)*opt.vertical); // 세로값
    $gameBoard.append(`<div id="${gameBoardWrap.replace("#","")}"><canvas id="${gameBoardCanvas.replace("#","")}"></canvas></div>`);
    $gameBoard.attr("style",`position:relative;width:100%;padding-top:${Math.floor((gameBoardCanvasHeight/gameBoardCanvasWidth)*100)+"%"};`);
    $(gameBoardWrap).attr("style","position:absolute;top:0;left:0;width:100%;height:100%;");
    $(gameBoardCanvas).attr("style","width:100%;height:100%;");

    // init : 캔버스 셋팅
    const canvas = $(gameBoardCanvas).get(0) as HTMLCanvasElement; // 캔버스 엘리먼트
    canvas.width = gameBoardCanvasWidth; // 가로값
    canvas.height = gameBoardCanvasHeight; // 세로값
    const ctx = canvas.getContext("2d"); // 캔버스 2d 그림판
    const backImg = new Image(); // 뒷면 이미지
    backImg.src = opt.backSrc;
    const hideflips = Array.from(Array(11).keys()).map((key) => { // 작아지면서 사라지는 과정 좌표들
        return {
            x:Math.floor( (opt.cardWidth/20)*key ),
            w:Math.floor( opt.cardWidth * (1 - (key/10)) )
        }
    });
    const showflips = [...hideflips].reverse();  // 커지면서 나타나는 과정 좌표들


    // 유틸리티 함수들
    const drawCard = (img,idx,width = opt.cardWidth) => {
        ctx.clearRect(cards[idx].x,cards[idx].y,width,opt.cardHeight); // 이미지 지우고
        ctx.drawImage(img,cards[idx].x,cards[idx].y,width,opt.cardHeight); // 해당 인덱스 이미지 그리기(즉시)
    }

    // 카드섞기
    function suffleCards(){
        const keys = Array.from(Array(blocks).keys()).map((key) => key%(blocks/2)).sort(() => Math.random() - 0.5); // 카드에 매칭되는 숫자값 배열
        return keys.map((key,idx) => {
            const cardImage = new Image();
            cardImage.src = opt.cardSrcs[key];
            return { 
                x:(idx%opt.cols)*(opt.cardWidth + opt.horizontal), // 카드의 캔버스 내 X 좌표
                y:(Math.floor(idx/(opt.rows-1)))*(opt.cardHeight + opt.vertical), // 카드의 캔버스 내 Y 좌표
                idx, // 카드의 순서
                key, // 카드의 매칭키
                img:cardImage, // 카드 이미지
                stats:"back" // 현재상태 (뒷면 : "back" , 앞면 : "front" , 매칭됨 : "match")
            };
        });
    }; 

    // 카드 뒤집기 그리기(좌표대로)
    function flipCard(flips,img,delay = 0){ 
        flips.forEach((pos,i) => {
            const time = (20*i) + delay;
            setTimeout(() => {
                ctx.clearRect(0,0,opt.cardWidth,opt.cardHeight); // 카드영역을 지우고
                ctx.drawImage(img,pos.x,0,pos.w,opt.cardHeight); // 지정된 사이즈에 맞추어 이미지를 그림
            },time);
        });
    };

    // 카드 뒤집기
    function flip(idx):Promise<void>{
        return new Promise((resolve,reject) => {
            let hideImg,showImg;
            if( cards[idx].stats=="back" ){
                hideImg = backImg;
                showImg = cards[idx].img;
                cards[idx].stats = "front";
            }else if(cards[idx].stats=="front"){
                hideImg = cards[idx].img;
                showImg = backImg;
                cards[idx].stats = "back";
            };

            // 그리기
            isFlip = true; // 뒤집기 시작
            ctx.translate(cards[idx].x,cards[idx].y);
            flipCard(hideflips,hideImg,0); // 총시간 200ms
            flipCard(showflips,showImg,200); // 총시간 200ms + 200ms (400ms)
            setTimeout(() => {
                ctx.translate((cards[idx].x*-1),(cards[idx].y*-1)); // 끝나고 캔버스 좌표 초기화
                isFlip = false; // 뒤집는중 아님(터치 입력 가능)
                resolve(); // 끝
            },500);
        });
    };


    // method
    // 뒷면으로 카드 배치
    function backBackCard(){
        cards.forEach((card,idx) => drawCard(backImg,idx));
    };

    function result(){
        if(firstCard.key==secondCard.key){

            ([cards[firstCard.idx],cards[secondCard.idx]]).forEach((card) => {
                ctx.globalAlpha = 0.5;
                card.stats = "match";
                drawCard(card.img,card.idx);
                ctx.globalAlpha = 1;
            });

            selectCardReset(); // 뒤집은 카드 초기화
            
            opt.matchingCallback();
            
            // 성공여부 확인
            const isContinue = cards.find((card) => card.stats!="match");
            if(!isContinue){
                isSuccess = true;
                opt.successCallback();
            };
        }else{
            opt.unmatchingCallback();
            ctx.globalAlpha = 1;
            flip(firstCard.idx).then(()=>{
                flip(secondCard.idx).then(()=>{
                    firstCard = {idx:99,key:99};
                    secondCard = {idx:99,key:99};
                })
            });
        };  
    };

    
    // 캔버스를 눌렀을때 동작
    function touchAction(e){
        const scaleX = canvas.width/canvas.clientWidth;
        const scaleY = canvas.height/canvas.clientHeight;
        const x = Math.floor((e.offsetX*scaleX)/opt.cardWidth);
        const y = Math.floor((e.offsetY*scaleY)/opt.cardHeight);
        const idx = (y* (opt.rows-1) )+x;
        console.log(idx);
        console.log(isFlip);
        console.log( cards[idx].stats );
        console.log(firstCard.key);
        if(isFlip) return; // 뒤집는 중임
        if(cards[idx].stats=="match") return; // 이미 맞쳐진 카드임
        if(cards[idx].stats=="front") return; // 앞면 상태임
        
        if(firstCard.key==99){
            firstCard = {idx,key:cards[idx].key};
            flip(idx);
        }else{
            secondCard = {idx,key:cards[idx].key};
            flip(idx).then(() => {
                result();
            });
        };
    }

    // return
    return {
        flipAllDelay:blocks * 500,
        init(){
            backImg.addEventListener("load",backBackCard); // 뒷면으로 셋팅함
        },
        action(){
            canvas.addEventListener("click",touchAction);
        },
        // 전체 뒤집기
        async flipAll(){
            for(let card of cards){
                await flip(card.idx);
            };
        },
        reset(){
            cards = suffleCards();
            isSuccess = false;
            backBackCard();
            selectCardReset(); // 뒤집은 카드 초기화
            canvas.removeEventListener("click",touchAction);
        },
        on(eventName,callback){
            if(eventName=="success"){
                opt.successCallback = callback;
            };
            if(eventName=="matching"){
                opt.matchingCallback = callback;
            };
            if(eventName=="unmatching"){
                opt.unmatchingCallback = callback;
            };
        },
        getResult(){
            return isSuccess;
        }
    };
}
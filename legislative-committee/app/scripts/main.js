'use strict';

let sParty = null;
let sCommittee = null;
let sPerson = null;
let sProb = 0;

const PARTY = {
  'B': {
    text: '藍'
  },
  'G': {
    text: '綠'
  },
  'Y': {
    text: '黃'
  },
  'O': {
    text: '橘'
  }
};

const COMMITTEE = {
  'FN': {
    text: '財政',
    job: '審查財政部、金管會等機關預算及其掌理事項的相關法案。例如你／妳可以推動財劃法修法，改善地方財政結構。',
    skill: '只要你夠厲害而且找到門路，你可能幫自己或別人向銀行「喬」超貸，若是幫別人喬，順便收一到三成回扣。另外，你也可能從官員那兒獲得股票內線消息，江湖傳言，過去有官員拿內線做人情給立委、因此朝野都吃得開，一路升官當到行政院長呢！',
    question: '請問哪一項不是政府抑制房地產炒作的手段？',
    qnumbers: 3,
    options: '<p>A. 提高房屋稅與地價稅</p> <p>B. 降低貸款利息</p> <p>C. 加強信用管制</p>',
    answer: 'B',
    answerTxt: 'B. 降低貸款利息'
  },
  'TR': {
    text: '交通',
    job: '審查交通部、NCC等機關預算及其掌理事項的相關法案。例如你／妳可以推動數位匯流相關法案，加速我國電視、電信、網路數位匯流腳步。',
    skill: '你以後搭飛機，若有本事可以凹華航幫你升等；還可以幫朋友要機票、車票做公關。如果你是區域立委，遊說台鐵在你選區多停幾班、讓高鐵多設一站，下次選舉就多幾項政績囉！另外，交通部主管工程多、油水多，如果你有朋友在包工程，可以幫幫他的忙。',
    question: '請問數位匯流指的是什麼？',
    qnumbers: 3,
    options: '<p>A. 固網、電信、有線、無線、衛星廣電等網路之技術與產業整合</p> <p>B. 數位相機、數位手機、數位手表之技術與產業整合</p> <p>C. 各種數位貨幣在金融市場流通匯聚的現象</p>',
    answer: 'A',
    answerTxt: 'A. 固網、電信、有線、無線、衛星廣電等網路之技術與產業整合'
  },
  'IN': {
    text: '內政',
    job: '審查內政部、營建署、陸委會、中選會等機關預算及其掌理事項的相關法案。例如你／妳可以推動兩岸協議監督條例，落實兩岸協議監督機制法制化；也可以推動政黨法、不當黨產處理條例，落實轉型正義；或者推動補正公投法、破除鳥籠公投。',
    skill: '如果你跟你選區的議員、樁腳共謀要搞土地重劃，讓農地變更為商業用地，你可以透過刪除或凍結內政部、營建署預算當作武器，來「督促」內政部通過都市計畫。',
    question: '某縣市執行都市計劃，透過區段徵收方式強徵農地、發展工業園區，可能導致哪些狀況？',
    qnumbers: 4,
    options: '<p>A. 鄰近地價翻漲，縣市政府藉由標售土地來降低負債</p> <p>B. 該縣市首長利用「天賜良機」順利拔除釘子戶，卻釀成全國性政治風暴</p> <p>C. 內政部審議通過之區段徵收遭法院判決違法，遭強拆迫遷居民勝訴</p> <p>D. 以上皆是</p>',
    answer: 'D',
    answerTxt: 'D. 以上皆是'
  },
  'EC': {
    text: '經濟',
    job: '審查經濟部、農委會、國發會、國營事業等機關預算及其掌理事項的相關法案。例如你／妳可以推動電業法修法，推動電業改革，切割台電發電、輸電、配售電業務。',
    skill: '你掌管國營事業預算，辦活動可以找台電贊助，除了有台電總部每年編定的敦睦基金能申請；如果你是區域立委，你選區內的電廠還有自行彈性運用、不受監督的回饋金，以後要服務選民，都不用花自己的錢呢！',
    question: '請問這幾年政府積極推動加入的、由美國主導的區域經濟整合體，也是五月將上任的蔡英文力推加入的，是下列何者？',
    qnumbers: 4,
    options: '<p>A. TPP</p> <p>B. PPT</p> <p>C. PTT</p> <p>D. DPP</p>',
    answer: 'A',
    answerTxt: 'A. TPP'
  },
  'ED': {
    text: '教育及文化',
    job: '審查教育部、文化部等機關預算及其掌理事項的相關法案。例如你／妳可以監督教育部未遵循程序正義推出的黑箱課綱，要求暫緩上路。',
    skill: '以後你再也不愁拿不到金馬獎、金鐘獎的門票囉！其他立委只能等你們拿完了，再看看有沒有剩。',
    question: '下列何者不是台灣技職教育面臨之困境？',
    qnumbers: 3,
    options: '<p>A. 產學落差大，以致學生畢業後難與業界接軌</p> <p>B. 教改政策實施後國內廣設專科學校，導致技職教育資源分散、品質下降</p> <p>C. 技職教育學術化，技職學校向普通教育靠攏、定位不明確</p>',
    answer: 'B',
    answerTxt: 'B. 教改政策實施後國內廣設專科學校，導致技職教育資源分散、品質下降'
  },
  'WL': {
    text: '社會福利及衛生環境',
    job: '審查衛福部、環保署、勞動部等機關預算及其掌理事項的相關法案。例如你／妳可以推動長照保險法立法，推動長期照顧；也可以推動勞保年金改革。',
    skill: '勞動部掌管總數上兆的各項勞動基金、衛福部也掌管上千億的健保基金，環保署則有包括空汙、水汙染防治基金等，都提供很多補助的機會，你／妳可以幫各行各業朋友、選民申請補助，他們就會成為你未來選舉時的金主或票源！',
    question: '前兩年黑心油事件一度震驚全國，請問吃了混充大量銅葉綠素的食用油，對身體會有什麼影響？',
    qnumbers: 3,
    options: '<p>A. 不會有影響</p> <p>B. 頭腦會變靈活好多，每次考試都考100分</p> <p>C. 恐造成肝腎負擔，導致肝硬化和溶血反應</p>',
    answer: 'C',
    answerTxt: 'C. 恐造成肝腎負擔，導致肝硬化和溶血反應'
  },
  'DF': {
    text: '外交及國防',
    job: '審查外交部、國防部、僑委會、退輔會等機關預算及其掌理事項的相關法案。例如你／妳可以協助推動募兵制相關法案，解決我國募不到兵的問題。',
    skill: '你一年有好幾次出國交（ㄌㄩˇ）流（一ㄡˊ）的機會，到世界各地進行參訪、國會外交；在國內也有很多機會看到最新、最炫的國軍武器，還可以搭飛機到太平島考察、慰勞國軍喔！',
    question: null,
    qnumbers: 3,
    options: null,
    answer: null,
    answerTxt: null
  },
  'LW': {
    text: '司法及法制',
    job: '審查司法院、監察院、考試院、總統府、法務部等機關預算及其掌理事項的相關法案。例如你／妳可以推動年金改革、司法改革相關法案、婚姻平權法案。',
    skill: '如果你犯過罪、有案在身，你會發現一進到這裡，你的案子就像是卷宗自動消失一樣，都判不下來了！不過等你卸任，就會突然又找到卷宗……。',
    question: null,
    qnumbers: 3,
    options: null,
    answer: null,
    answerTxt: null
  }
};

function setActiveBars(activeCounts) {
  // controls the progress bar on the top
  $('#progress-nav').show();
  $('.twr-quick-view').hide();

  $( '.progress > .progress-item' ).each(function( index ) {
    if(index < activeCounts) {
      $( this ).addClass('active');
    }else{
      $( this ).removeClass('active');
    }
  });
}

function playSlide0() {
  $('.slide').hide();
  $('#slide0').show();
  $('#progress-nav').hide();

  $('#yuan-welcome').velocity(
    {'opacity': [1, 0, 'linear'], 'margin-top': ['0', '100px']},
    { delay: 0, duration: 1000 }
  );

  $('.description-box').velocity(
    {'opacity': [1, 0, 'linear']
    // ,'left': ['50%', '80%']
    },
    { delay: 0, duration: 1500 }
  );
}

function getProbability() {
  let prob = 0;
  if(sParty !== 'B' && sCommittee === 'FN' || sCommittee === 'TR' || sCommittee === 'EC'){
    prob = 10;
  } else if (sCommittee === 'IN' || sCommittee === 'ED' || sCommittee === 'WL') {
    prob = 10;
  } else if (sCommittee === 'DF' || sCommittee === 'LW') {
    prob = 100;
  }
  sProb = prob;
  return prob;
}

function getResults() {
  console.log('sProb', sProb);
  if(sProb === 100){
    return true;
  } else if (sProb === 10){
    let num = Math.floor((Math.random() * 10) + 1);  // rand between 1~10
    console.log(num);
    if(num === 10){
      return true;
    }
  }
  return false;
}

function playSlide1() {
  $('.slide').hide();
  $('#slide1').show();
  location.hash = '#slide1';
  setActiveBars(1);
}

function playSlide2() {
  $('.slide').hide();
  $('#slide2').show();
  location.hash = '#slide2';
  setActiveBars(2);
}

function playSlide3() {
  $('#slide3 .twr-content').animate({ scrollTop: 0 }, 'fast');

  let proText = '極低';
  if(getProbability() === 10) {
    proText = '只有一半';
  } else if (getProbability() === 100) {
    proText = '極高';
  }
  $('#slide3 .s-committee').text(COMMITTEE[sCommittee].text);
  $('#slide3 .s-job').text(COMMITTEE[sCommittee].job);
  $('#slide3 .s-skill').text(COMMITTEE[sCommittee].skill);
  $('#slide3 .s-party').text(PARTY[sParty].text);
  $('#slide3 .s-prob').text(proText);
  $('#slide3 .top-committee-icon').attr('src', 'images/committee-' + sCommittee + '.svg');
  $('.slide').hide();
  $('#slide3').show();

  location.hash = '#slide3';
  setActiveBars(3);
}

function playSlide4() {
  $('.slide').hide();
  $('#slide4').show();

  // slide 4
  $('#slide4 .committee-icon').attr('src', 'images/committee-' + sCommittee + '.svg');

  location.hash = '#slide4';
  setActiveBars(4);
}

function playSlide5() {
  $('.slide').hide();
  $('#slide5').show();

  // slide 5
  $('#slide5 .s-committee').text(COMMITTEE[sCommittee].text);
  $('#slide5 .s-question').text(COMMITTEE[sCommittee].question);
  $('#slide5 .s-options').html(COMMITTEE[sCommittee].options);
  if(COMMITTEE[sCommittee].qnumbers > 3) {
    $('#slide5 #three-questions').hide();
    $('#slide5 #four-questions').show();
  } else {
    $('#slide5 #three-questions').show();
    $('#slide5 #four-questions').hide();
  }

  location.hash = '#slide5';
  setActiveBars(5);
}

function playSlide6() {
  $('.slide').hide();
  $('#slide6').show();

  // slide 6
  $('#slide6 .s-committee').text(COMMITTEE[sCommittee].text);
  $('#slide6 .s-skill').text(COMMITTEE[sCommittee].skill);
  $('#slide6 .s-answer').text(COMMITTEE[sCommittee].answerTxt);

  location.hash = '#slide6';
  setActiveBars(6);
}

function showDialogAnimation(dialog, btn, callback) {
  dialog.show();
  dialog.animate({ scrollTop: 0 }, 'fast');
  var pos = $(btn).offset();
  dialog.css({
    'top': pos.top, // selected button top value
    'left': pos.left, // selected button left value
    'width': $(btn).width(), // selected image width,
    'visibility': 'visible'
	})
	.velocity({
    'width': '100%',
    'left': 0, // ($(window).width - sliderFinalWidth)/2,
    'top': '5em' // ($(window).height - slider final height)/2,
	}, 800, 'ease', callback).addClass('is-visible');
}

function voteSlide1(btn, party) {
  sParty = party;
  playSlide2();
}

function voteSlide2(btn, committee) {
  sCommittee = committee;
  playSlide3();
}

function voteSlide3(){
  let res = getResults();
  if (res){
    $('#slide6 .result-box').hide();
    if(sCommittee !== 'DF' && sCommittee !== 'LW'){
      $('#slide6 #result-success').show();
    } else {
      $('#slide6 #result-right').show();
    }
    playSlide6();
  } else {
    playSlide4();
  }
}

function voteSlide4(committee){
  sCommittee = committee;
  $('#slide6 .result-box').hide();
  $('#slide6 #result-right').show();
  playSlide6();
}

function voteSlide5(ans){
  $('#slide6 .result-box').hide();
  if(COMMITTEE[sCommittee].answer === ans && sParty !== 'B') {
    $('#slide6 #result-correct').show();
  } else if(COMMITTEE[sCommittee].answer === ans && sParty === 'B') {
    $('#slide6 #result-fail').show();
  } else {
    // wrong answer was chosen
    $('#slide6 #result-wrong').show();
  }
  playSlide6();
}

function showSlide3Dialog(btn) {
  showDialogAnimation($('#slide3-quickview'), btn, function(){
		//show quick view content
	});
}

function scrollToInfoBox(_c) {
  $(_c).find('.info-box').velocity('scroll', {
    container: $(_c),
    duration: 300,
    easing: 'easeInOutSine'
  });
}

function replayGame() {
  window.location.href = '';
}

$( document ).ready(function() {
  var slideTarget = window.location.hash.replace(/#/, '');
  switch (slideTarget) {
    case 'slide1':
      playSlide1();
      break;
    case 'slide2':
      playSlide2();
      break;
    case 'slide3':
      playSlide3();
      break;
    case 'slide4':
      playSlide4();
      break;
    case 'slide5':
      playSlide5();
      break;
    case 'slide6':
      playSlide6();
      break;
    default:
      // welcome screen
      playSlide0();
  }

});

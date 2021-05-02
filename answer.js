let wards = [
    {},
    { english: "apple", japanese: "りんご" },
    { english: "lemon", japanese: "レモン" },
    { english: "orange", japanese: "オレンジ" },
    { english: "tomato", japanese: "トマト" },
    { english: "tomato", japanese: "トマト" },
    { english: "grape", japanese: "ぶどう" },
    { english: "potato", japanese: "ポテト" },
    { english: "melon", japanese: "メロン" },
    { english: "peach", japanese: "もも" },
    { english: "tomato", japanese: "トマト" },
    { english: "haruya", japanese: "ハルヤ" },

];

//htmlタグのid取得
let tu = document.getElementById("main_container");
let ti = document.getElementById("titleNumber");
let qn = document.getElementById("question_number");
let nn = document.getElementById("dontknow");

//ボタンのID
let ClassBtn1;
let ClassBtn2;

//問題番号の区切り
let numberBox = 10;
let ranNumber = numberBox - 1;

//回答を3つ選ぶための変数
let random;
let tmr = [];
let newtmr = [];

//ボタンへ並び変えるための変数
let randomN;
let ran = [];
let dn;

//正解数を記録するための変数
let correct = 0;
let scoreUrl;

//間違単語
let missNumber = "miss=";

let url

//ランダムで数字を取得
function randomNum(num, d) {
	//回答ボタンをランダムにする
	tmr = [];
	tmr.push(num);

	for (var r = 0; r < 3; r++) {

		while (true) {

			random = (Math.floor((Math.random() + d) * ranNumber) + 1);

			if (!tmr.includes(random)) {
				console.log(random);
				tmr.push(random);
				break;
			}
		}
	}
}


function randomNum2(d) {
	//単語をランダムで取得する
	for (let x = 0; x < ranNumber; x++) {

		while (true) {

			randomN = (Math.floor((Math.random() + d) * ranNumber) + 1);
			if (!ran.includes(randomN)) {
				console.log(randomN);
				ran.push(randomN);
				break;
			}
		}
	}
}


//問題の順番を定義
function shaful() {
	newtmr = [];

	while (tmr.length > 0) {
		k = Math.floor(Math.random() * tmr.length);
		newtmr.push(tmr[k]);
		tmr.splice(k, 1);
	}
	console.log(newtmr)
}



//正誤判定の処理
function chack(button) {
	let clickData = button.value - 1;
	let clickbtn;

	for (let x = 0; x < 4; x++) {

		if (newtmr[x] == number) {

			let ID = "answerBtn" + (x + 1);
			console.log(ID);

			//押されたボタンを取得
			clickbtn = document.getElementById(ID);
		}
	}
	//押されたボタンの単語
	let chackData = wards[newtmr[clickData]];

	console.log(wards[newtmr[clickData]])
	console.log(wards[number]);

	let IDc = button.id;
	let click = document.getElementById(IDc);

	//正解のとき
	if (wards[number] == wards[newtmr[clickData]]) {
		correct++;

		//正解の時の表示処理
		tu.classList.add('content_a');
		clickbtn.classList.add('clickbtn_a');

		setTimeout(function changecoler() {
			clickbtn.classList.remove('clickbtn_a');
		}, 1300);

		//間違えたとき	
	} else {
		//間違えた単語を取得
		missNumber = missNumber + number + "&";

		//間違えた時の表示処理
		tu.classList.add('content_b');
		clickbtn.classList.add('clickbtn_b');
		click.classList.add('clickbtn_a');

		setTimeout(function changecoler() {
			clickbtn.classList.remove('clickbtn_b');
			click.classList.remove('clickbtn_a');
		}, 1300)
	}
}

//わからないとき
function checkknow(button) {

	//ボタンの反応を無効
	nn.disabled = true;

	let clickbtn;

	for (let x = 0; x < 4; x++) {

		if (newtmr[x] == number) {
			let ID = "answerBtn" + (x + 1);
			console.log(ID);
			console.log(newtmr[x]);
			console.log(number)
			clickbtn = document.getElementById(ID);

		}
	}

	//わからない単語を取得
	missNumber = missNumber + number + "&";

	//押されたボタンの表示処理
	clickbtn.classList.add('clickbtn_b');

	setTimeout(function changecoler() {
		clickbtn.classList.remove('clickbtn_b');

		nn.classList.add('btn2');
	}, 1300)
}

//回答時のCSSの処理を停止
function deletu() {
	tu.classList.remove('content_a');
	tu.classList.remove('content_b');

}

//パラメータを入れる変数を定義
let paramItem = [];
let param;



//問題のまとまりを検索
function checkPrama() {
	
	
	//パラメータを取得
	url = location.search.substring(1);

	//&ごとに分割
	let params = url.split('&');
	console.log(params)

	if (paramItem.length < 4) {
		for (let i = 0; i < 3; i++) {
			console.log(params[i]);
			//=ごとに分割
			paramItem.push(params[i].split('='));
			console.log(paramItem[i]);
			console.log(paramItem.length);


		}
	}

	//パラメータがない場合
	if (!location.search) {
		paramItem = ["n", "1"];
	}


	param = paramItem;
	//現在の問題番号
	dn = param[1][1] - 1;
	console.log(dn);
	console.log(param.length);


}

//ボタン、問題のhtmlタグを取得
let questionWard = document.getElementById("question");
let questionAnswer = document.getElementById("answer");
let answerBtn1 = document.getElementById("answerBtn1");
let answerBtn2 = document.getElementById("answerBtn2");
let answerBtn3 = document.getElementById("answerBtn3");
let answerBtn4 = document.getElementById("answerBtn4");

//問題番号
let number = 0;
let r = 0

//問題番号を合わせる
function chooseMode() {
	checkPrama();
	randomNum2(dn);

	number = number + ((param[1][1] - 1) * numberBox);
}

//問題の範囲を表示
function popTitle() {
	checkPrama();
	console.log(param[1][1]);
	console.log(numberBox);
	let startNumber = (param[1][1] - 1) * numberBox + 1;
	let endNumber = (param[1][1] - 1) * numberBox + numberBox;

	let title = startNumber + "~" + endNumber;
	ti.innerHTML = title;
}

//アプリの本処理
function timequestion() {

	deletu();
	checkPrama();
	console.log(ran)

	console.log(param[1][1]);

	let n = param[1][1];

	let nb = ((n - 1) * numberBox);
	console.log(nb);

	//number = number + nb;
	//テストの処理
	if (param[0][1] == 3) {
		scoreUrl = "&s=" + correct;

		console.log(scoreUrl);

		r++;
		console.log(r);
		console.log(url)
		//解き終わったらホームに戻る
		if (r == 10) {
			//let scoreUrl = "&s=" + encodeURIComponent("correct");
			missNumber = "&" + missNumber.slice(0, -1);

			document.location = "../result.php?" + url + scoreUrl + missNumber;


		} else {
			qn.innerHTML = r + "/" + 20;

			number = ran[r - 1];
			console.log(number);

			randomNum(number, dn);
			shaful();


			//問題を表示
			questionWard.innerHTML = wards[number].english;

			//回答を表示;
			answerBtn1.innerHTML = wards[newtmr[0]].japanese;
			answerBtn2.innerHTML = wards[newtmr[1]].japanese;
			answerBtn3.innerHTML = wards[newtmr[2]].japanese;
			answerBtn4.innerHTML = wards[newtmr[3]].japanese;

			//ボタンの反応を有効
			nn.disabled = false;
		}
	}

	//ランダムのレッスンの処理
	if (param[0][1] == 2) {
		//for (var r = 0; r < numberBox; r++) {

		scoreUrl = "&s=" + correct;

		console.log(scoreUrl);

		r++;
		console.log(r);

		//解き終わったらホームに戻る
		if (r == numberBox) {
			missNumber = "&" + missNumber.slice(0, -1);

			document.location = "lesson_result.php?" + url + scoreUrl + missNumber;

		} else {
			qn.innerHTML = r + "/" + numberBox;

			number = ran[r - 1];
			console.log(number);

			randomNum(number, dn);
			shaful();


			//問題を表示
			questionWard.innerHTML = wards[number].english;

			//回答を表示;
			answerBtn1.innerHTML = wards[newtmr[0]].japanese;
			answerBtn2.innerHTML = wards[newtmr[1]].japanese;
			answerBtn3.innerHTML = wards[newtmr[2]].japanese;
			answerBtn4.innerHTML = wards[newtmr[3]].japanese;

			//ボタンの反応を有効
			nn.disabled = false;
		}
		//}		
	}

	//順番のレッスンの処理
	if (param[0][1] == 1) {

		scoreUrl = "&s=" + correct;

		console.log(scoreUrl);
		console.log(url);



		//解き終わったらホームに戻る
		if (number - nb == numberBox) {
			missNumber = "&" + missNumber.slice(0, -1);

			document.location = "lesson_result.php?" + url + scoreUrl + missNumber;

		} else {

			//if(number < wards.length){
			//問題番号
			number++;
			let popnumber = number - nb;
			qn.innerHTML = popnumber + "/" + numberBox;

			randomNum(number, dn);
			console.log(dn);
			shaful();

			//問題を表示
			questionWard.innerHTML = wards[number].english;

			//回答を表示;
			answerBtn1.innerHTML = wards[newtmr[0]].japanese;
			answerBtn2.innerHTML = wards[newtmr[1]].japanese;
			answerBtn3.innerHTML = wards[newtmr[2]].japanese;
			answerBtn4.innerHTML = wards[newtmr[3]].japanese;

			//ボタンの反応を有効
			nn.disabled = false;
		}
	}
}



function question() {
	setTimeout(timequestion, 1300);
}


popTitle();
chooseMode();
timequestion();

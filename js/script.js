// window.addEventListener("scroll", () => {
//   const Y = window.scrollY;
//   console.log(Y);
//   Y >= 1200
//     ? document.querySelector(".c1").classList.add("active1")
//     : document.querySelector(".c1").classList.remove("active1");
// });
// window.addEventListener("scroll", () => {
//   const Y = window.scrollY;
//   console.log(Y);
//   Y >= 1350
//     ? document.querySelector(".c2").classList.add("active2")
//     : document.querySelector(".c2").classList.remove("active2");
// });
// window.addEventListener("scroll", () => {
//   const Y = window.scrollY;
//   console.log(Y);
//   Y >= 1500
//     ? document.querySelector(".c3").classList.add("active1")
//     : document.querySelector(".c3").classList.remove("active1");
// });
// window.addEventListener("scroll", () => {
//   const Y = window.scrollY;
//   console.log(Y);
//   Y >= 1700
//     ? document.querySelector(".c4").classList.add("active2")
//     : document.querySelector(".c4").classList.remove("active2");
// });

let swiper = new Swiper('.swiper', {
  //スライドの設定を書いていく
  //https://b-risk.jp/blog/2022/04/swiper/ を参考にすればいろんなスライドが作れると思う
  slidesPerView: 1, //画面内のスライドの表示枚数
  spaceBetween: 30, //各スライド間の設定
  loop: true, //ループの指定
  pagination: {
    //下のドットの指定（いらないなら消す）
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 0,
  },
  speed: 4500,
  spaceBetween: 30,
  slidesPerView: 1.3,
});

let swiper2 = new Swiper('.swiper2', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  autoplay: {
    delay: 0,
    reverseDirection: true,
  },
  speed: 4500,
  spaceBetween: 30,
  slidesPerView: 1.3,
});

// 足跡の描画

//上下のスクロールを判別するための基準の初期化
let nowPosition;
//足跡削除用にIDへ連番を付けるため
let count = 1;
//上向き用の連番で、偶数奇数で左右を判別
let countA = 1;
//下向き用の連番で、偶数奇数で左右を判別
let countU = 1;
//足跡削除用の連番
let deleatId = 1;

//スクロールしたら実行するコールバックで足跡設置
let callback = function () {
  //現在のスクロール量を計測
  let y = window.scrollY;
  //基準値と現在値の差
  diffPosition = y - nowPosition;
  //現在の位置を更新
  nowPosition = y;

  //上向き用の連番で、偶数奇数で左右を判別設定
  if (countA % 2 == 0) {
    idNameA = '-even';
  } else {
    idNameA = '-odd';
  }
  //下向き用の連番で、偶数奇数で左右を判別設定
  if (countU % 2 == 0) {
    idNameU = '-even';
  } else {
    idNameU = '-odd';
  }

  //足跡を左右に散らす指定
  let rand = Math.floor(Math.random() * 11);

  if (diffPosition > 0) {
    //下向きスクロールの時に実行
    let foot = document.createElement('div');
    foot.className = 'walk-under' + idNameU;
    foot.id = 'foot' + count;
    foot.style.top = 300 + y + 'px';
    foot.style.marginRight = rand + 'px';
    let objBody = document.getElementById('sp');
    objBody.appendChild(foot);
    countU++;
  } else {
    //上向きスクロールの時に実行
    let foot = document.createElement('div');
    foot.className = 'walk-above' + idNameA;
    foot.id = 'foot' + count;
    foot.style.top = 300 + y + 'px';
    foot.style.marginRight = rand + 'px';
    let objBody = document.getElementById('sp');
    objBody.appendChild(foot);
    countA++;
  }
  //処理開始時刻を削除用の関数を呼び出し
  footsDeleatTimer();
  count++;
};

//スクロール中の動作の間引き処理。設定時間(今は200ms)ごとに関数を実行する目的
window.addEventListener('scroll', throttle(callback, 200));
function throttle(fn, wait) {
  let time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

//足跡削除する時間を指定
let footsDeleatTimer = function () {
  setTimeout('footsDeleat()', 2000);
};

//削除用関数
function footsDeleat() {
  let objBody = document.getElementById('sp');
  //足跡追加の連番。実行回数と連動して追加された足跡ごとに削除を行う
  let elements = document.getElementById('foot' + deleatId);
  if (elements !== null) {
    objBody.removeChild(elements);
    deleatId++;
  }
}

// //ストーリー;
gsap.fromTo(
  '.c1', // アニメーションさせる要素
  {
    x: -100, // アニメーション開始前の横位置(右に100px)
    autoAlpha: 0, // アニメーション開始前は透明
  },
  {
    x: 0, // アニメーション後の横位置(左に100px)
    autoAlpha: 1, // アニメーション後に出現(透過率0)
    scrollTrigger: {
      trigger: '#con', // アニメーションが始まるトリガーとなる要素
      // toggleActions: 'play none none reverse', // 上スクロールで戻る
      start: 'top center',
      scrub: 1, // アニメーションの開始位置
    },
  }
);
gsap.fromTo(
  '.c2', // アニメーションさせる要素
  {
    x: -100, // アニメーション開始前の横位置(右に100px)
    autoAlpha: 0, // アニメーション開始前は透明
  },
  {
    x: 0, // アニメーション後の横位置(左に100px)
    autoAlpha: 1, // アニメーション後に出現(透過率0)
    scrollTrigger: {
      trigger: '.c1', // アニメーションが始まるトリガーとなる要素
      // toggleActions: 'play none none reverse', // 上スクロールで戻る
      start: 'top center',
      scrub: 1, // アニメーションの開始位置
    },
  }
);
gsap.fromTo(
  '.c3', // アニメーションさせる要素
  {
    x: -100, // アニメーション開始前の横位置(右に100px)
    autoAlpha: 0, // アニメーション開始前は透明
  },
  {
    x: 0, // アニメーション後の横位置(左に100px)
    autoAlpha: 1, // アニメーション後に出現(透過率0)
    scrollTrigger: {
      trigger: '.c2', // アニメーションが始まるトリガーとなる要素
      // toggleActions: 'play none none reverse', // 上スクロールで戻る
      start: 'top center',
      scrub: 1, // アニメーションの開始位置
    },
  }
);
gsap.fromTo(
  '.c4', // アニメーションさせる要素
  {
    x: -100, // アニメーション開始前の横位置(右に100px)
    autoAlpha: 0, // アニメーション開始前は透明
  },
  {
    x: 0, // アニメーション後の横位置(左に100px)
    autoAlpha: 1, // アニメーション後に出現(透過率0)
    scrollTrigger: {
      trigger: '.c3', // アニメーションが始まるトリガーとなる要素
      // toggleActions: 'play none none reverse', // 上スクロールで戻る
      start: 'top center',
      scrub: 1, // アニメーションの開始位置
    },
  }
);

//アコーディオンメニュー
$(function () {
  // タイトルをクリックすると
  $('.js-accordion-title').on('click', function () {
    // タイトルにopenクラスを付け外しして矢印の向きを変更
    $(this).toggleClass('open', 300);
  });
});
$(function () {
  $('.accordion-title').on('click', function () {
    $(this).next().slideToggle();
    if ($(this).hasClass('show')) {
      $(this).removeClass('show');
    } else {
      $(this).addClass('show');
    }
  });
});

//体験談
let swiper3 = new Swiper('.swiper3', {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
  },
  spaceBetween: 30,
  slidesPerView: 1.3,
});

var trigger = $('.modal__trigger'),
  wrapper = $('.modal__wrapper'),
  layer = $('.modal__layer'),
  container = $('.modal__container'),
  close = $('.modal__close');

// 『モーダルを開くボタン』をクリックしたら、『モーダル本体』を表示
$(trigger).click(function () {
  var index = $(this).index();
  $(wrapper).eq(index).fadeIn(400);

  // スクロール位置を戻す
  $(container).scrollTop(0);

  // サイトのスクロールを禁止にする
  $('html, body').css('overflow', 'hidden');
});

// 『背景』と『モーダルを閉じるボタン』をクリックしたら、『モーダル本体』を非表示
$(layer)
  .add(close)
  .click(function () {
    $(wrapper).fadeOut(400);

    // サイトのスクロール禁止を解除する
    $('html, body').removeAttr('style');
  });

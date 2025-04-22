"use strict";

const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_navigation");
const body = document.querySelector(".js_body");

//ハンバーガーをクリックしたら
hamburger.addEventListener("click", () => {
  //それぞれに対してis-activeクラスをつけ外しする
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  body.classList.toggle("is-active");
});

const navLinks = document.querySelectorAll(".l_header-nav_link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    navigation.classList.remove("is-active");
    body.classList.remove("is-active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const topKv = document.querySelector(".top_kv");
  const topMenu = document.querySelector(".top_menu");
  const topShop = document.querySelector(".top_shop");
  const logoImg = document.getElementById("jsLogoImg");
  const instaImg = document.getElementById("jsLogoImg2");

  let isTopKvInView = false;
  let isTopMenuInView = false;
  let isTopShopInView = false;

  function updateHeaderStyle() {
    const isLight = isTopKvInView || isTopMenuInView || isTopShopInView;
    document.body.classList.toggle("is-light", isLight);

    if (logoImg) {
      logoImg.src = isLight ? "img/logo-white.png" : "img/logo-black.png";
    }
    if (instaImg) {
      instaImg.src = isLight
        ? "img/instagram-white.png"
        : "img/instagram-black.png";
    }
  }

  // top_kvのobserver（少し見えたら発火：threshold 0.1）
  const kvObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isTopKvInView = entry.isIntersecting;
        updateHeaderStyle();
      });
    },
    {
      threshold: 0.1,
    }
  );

  // top_menuのobserver（先読みあり）
  const menuObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isTopMenuInView = entry.isIntersecting;
        updateHeaderStyle();
      });
    },
    {
      threshold: 0.01,
      rootMargin: "-15% 0px -80% 0px",
    }
  );

  // top_shopのobserver（先読みあり）
  const shopObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isTopShopInView = entry.isIntersecting;
        updateHeaderStyle();
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0% 0px -90% 0px", // 必要に応じて微調整
    }
  );

  if (topKv) kvObserver.observe(topKv);
  if (topMenu) menuObserver.observe(topMenu);
  if (topShop) shopObserver.observe(topShop);
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".js_header"); // ヘッダー
  const footer = document.querySelector(".js_footer"); // フッター

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // フッターが表示されたらヘッダーを消す
          header.classList.add("hide");
        } else {
          // フッターが消えたらヘッダーを表示
          header.classList.remove("hide");
        }
      });
    },
    { threshold: 0.7 } // フッターが50%見えたら発火
  );

  observer.observe(footer);
});

// menu
const swiper = new Swiper(".swiper-container", {
  // ドットインジケーターの表示
  pagination: {
    el: ".swiper-pagination",
    clickable: true, //クリックでも切り替え
  },
  loop: true, // ループの有効化

  slidesPerView: 1.2, // 表示するスライドの枚数
  centeredSlides: true, // スライドを中央揃えを有効化
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0, // スライドの回転角度
    stretch: 50, // スライドの間隔（px単位）
    depth: 200, // 奥行きの設定（translateをZ方向にpx単位で移動）
    modifier: 1, //
    slideShadows: true, // 先頭スライドのbox-shadowを有効化
  },
  autoplay: {
    delay: 3000, // 3秒ごとにスライド
    disableOnInteraction: false, // ユーザー操作後も自動再開
  },
  speed: 800, // スライドのアニメーション時間（ミリ秒）
});

// contactのアコーディオン
const faq = document.querySelectorAll(".js_faq");

faq.forEach(function (element) {
  const faqA = element.querySelector(".js_faq-a");

  element.addEventListener("click", function () {
    if (element.classList.contains("is-active")) {
      // アコーディオンを閉じるときの処理
      // アイコン操作用クラスを切り替える(クラスを取り除く)
      element.classList.toggle("is-active");
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // アニメーション実行
      closingAnim(faqA);
    } else {
      // アコーディオンを開くときの処理
      // アイコン操作用クラスを切り替える(クラスを付与)
      element.classList.toggle("is-active");
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // アニメーション実行
      openingAnim(faqA);
    }
  });
});

const closingAnim = function (content) {
  gsap.to(content, {
    height: 0,
    opacity: 0,
    duration: 0.6,
    ease: "Power4.inOut",
  });
};

const openingAnim = function (content) {
  gsap.fromTo(
    content,
    {
      height: 0,
      opacity: 0,
    },
    {
      height: "auto",
      opacity: 1,
      duration: 0.6,
      ease: "Power4.inOut",
    }
  );
};

// news-single
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".js_single-swiper", {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1080: {
        slidesPerView: 3,
      },
    },
  });
});

// noa js
const topMenuImgSwiper = new Swiper(".top_menu-img-swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  effect: "fade", // フェード切り替え（オプション）
  speed: 800,
});

// saaya js
const mySwiper = new Swiper(".myswiperTumbler", {
  loop: false,
  speed: 400,
});

document.querySelectorAll(".color-btn_tumbler").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    document.querySelectorAll(".color-btn_tumbler").forEach((button) => {
      button.classList.remove("is-active");
    });

    btn.classList.add("is-active");
    const index = parseInt(btn.dataset.index);
    mySwiper.slideTo(index);
  });
});

const mySwiper2 = new Swiper(".myswiperBag", {
  loop: false,
  speed: 400,
});

document.querySelectorAll(".color-btn_bag").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    document.querySelectorAll(".color-btn_bag").forEach((button) => {
      button.classList.remove("is-active");
    });

    btn.classList.add("is-active");
    const index = parseInt(btn.dataset.index);
    mySwiper2.slideTo(index);
  });
});

// kvのアニメーション;
// document.addEventListener("DOMContentLoaded", () => {
//   const blurElements = document.querySelectorAll(".blur");

//   blurElements.forEach((el, index) => {
//     const delay = 0.3 * index; // 順番に遅延（0.3秒ずつ）
//     el.style.transitionDelay = `${delay}s`;

//     const observer = new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("isActive");
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       {
//         root: null,
//         rootMargin: "-20% 0px",
//         threshold: 0,
//       }
//     );

//     observer.observe(el);
//   });
// });

// blur要素のためのIntersectionObserverを準備する（observeは後で）
let blurObservers = [];

function setupBlurObservers() {
  const blurElements = document.querySelectorAll(".blur");

  blurElements.forEach((el, index) => {
    const delay = 0.3 * index;
    el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isActive");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px",
        threshold: 0,
      }
    );

    blurObservers.push({ observer, target: el });
  });
}

// 最初にsetupだけしておく（observeしない）
setupBlurObservers();

// top_about, about仮想ページ
const setupIntersectionObserver = (target, options) => {
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("isActive");
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(target);
};

const setupAdvanced = (target) => {
  const pathname = window.location.pathname;

  let rootMargin;

  if (pathname.includes("about.html")) {
    rootMargin = "-70% 0px -40%"; // about.html の発火タイミング
  } else if (pathname.includes("about-story__columbia.html")) {
    rootMargin = "-10% 0px -90%"; // columbiaページ専用のタイミング（個別に調整OK）
  } else if (pathname.includes("about-story__ethiopia.html")) {
    rootMargin = "-10% 0px -90%"; // columbiaページ専用のタイミング（個別に調整OK）
  } else if (pathname.includes("about-story__honduras.html")) {
    rootMargin = "-10% 0px -90%"; // columbiaページ専用のタイミング（個別に調整OK）
  } else {
    rootMargin = "-55% 0px -45%"; // 他のページ用（デフォルト）
  }

  const options = {
    root: null,
    rootMargin: rootMargin,
    threshold: 0,
  };

  setupIntersectionObserver(target, options);
};

// DOMが読み込まれたら実行
document.addEventListener("DOMContentLoaded", () => {
  const advancedElements = document.querySelectorAll(".advanced");
  advancedElements.forEach((el) => {
    setupAdvanced(el); // ページ別設定を使って初期化
  });
});

// openingアニメーション
window.addEventListener("DOMContentLoaded", () => {
  const blur = document.querySelector(".video-blur");
  const video = document.querySelector(".bg-video");
  const opening = document.querySelector(".opening");
  const topKv = document.querySelector(".top_kv");
  const drop = document.getElementById("drop");

  const lastVisited = localStorage.getItem("lastVisited");
  const now = new Date().getTime(); // 現在のタイムスタンプ（ミリ秒）
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24時間（ミリ秒）

  if (lastVisited && now - parseInt(lastVisited) < twentyFourHours) {
    // 24時間以内ならアニメーションをスキップ
    topKv.style.opacity = "1";
    opening.style.display = "none";
    document.body.classList.remove("is-active");

    blurObservers.forEach(({ observer, target }) => {
      observer.observe(target);
    });
    return;
  }

  // 初期状態：top_kv 非表示
  topKv.style.opacity = "0";

  // 雫：初期位置を上に
  gsap.set(drop, {
    y: -60,
    opacity: 1,
  });

  // 雫：落下（1.5秒で落ちる）
  gsap.to(drop, {
    y: "50vh",
    duration: 1.8,
    ease: "power2.inOut",
  });

  // 波紋サイズ設定（画面幅によって分岐）
  let rippleWidth = window.innerWidth * 2 + "px";
  let rippleHeight;

  if (window.innerWidth <= 768) {
    // スマホ
    rippleHeight = "200px";
  } else {
    // PC
    rippleHeight = "400px";
  }

  // 波紋生成（着地タイミング）
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      const ripple = document.createElement("div");
      ripple.className = "ripple";
      ripple.style.setProperty("--ripple-w", rippleWidth);
      ripple.style.setProperty("--ripple-h", rippleHeight);
      if (i === 1) ripple.classList.add("delay1");
      if (i === 2) ripple.classList.add("delay2");
      opening.appendChild(ripple);
    }
  }, 1400);

  // 雫をフェードアウト
  setTimeout(() => {
    drop.style.opacity = "0";
  }, 1000);

  // ブラー解除
  setTimeout(() => {
    blur.style.backdropFilter = "blur(0px)";
    video.style.filter = "blur(0px)";
  }, 3400);

  // KV表示
  setTimeout(() => {
    topKv.style.opacity = "1";
  }, 2800);

  // openingフェードアウト
  setTimeout(() => {
    opening.classList.add("fadeout");
  }, 4000);

  // 完全に非表示
  setTimeout(() => {
    opening.style.display = "none";

    // スクロールロック解除
    document.body.classList.remove("is-active");

    // ここで再生タイムスタンプを保存！
    localStorage.setItem("lastVisited", now);

    // blurをobserve開始
    blurObservers.forEach(({ observer, target }) => {
      observer.observe(target);
    });
  }, 5000);

  // スクロールロック開始
  document.body.classList.add("is-active");
});

// フェードイン（読み込み完了後）
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-loaded");
});

// フェードアウト付きページ遷移
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // 同ページ内リンクや空リンク、外部リンクなどは除外
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank"
      ) {
        return;
      }

      e.preventDefault();

      // フェードアウト開始
      document.body.classList.remove("is-loaded");
      document.body.classList.add("is-transition-active");

      // ページ遷移（CSSとタイミングを揃える）
      setTimeout(() => {
        window.location.href = href;
      }, 100); // transitionと同じ時間
    });
  });
});

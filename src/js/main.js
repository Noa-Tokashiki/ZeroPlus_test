"use strict";

window.addEventListener("load", () => {
  const opening = document.querySelector(".opening");
  const openingVideo = document.querySelector(".opening_video");
  const overlay = document.querySelector(".opening_overlay");
  const mainKV = document.querySelector(".js_kv");

  // Step 1: ブラーを徐々に解除
  setTimeout(() => {
    openingVideo.style.filter = "blur(0px)";
    overlay.style.opacity = 0;
  }, 500);

  // Step 2: オープニングをフェードアウト
  setTimeout(() => {
    opening.style.opacity = 0;
    mainKV.style.opacity = 1;
  }, 3500); // フェードの少し前に準備

  // Step 3: 完全に非表示に
  setTimeout(() => {
    opening.style.display = "none";
  }, 4500);
});

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

// kouki js

// hiroki js

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

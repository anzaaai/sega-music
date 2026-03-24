/**
 * SEGA MUSIC - Ticker Animation
 * 電光掲示板風の無限スクロールアニメーション（汎用版）
 */

(function() {
  'use strict';

  /**
   * ティッカーアニメーションを初期化
   * @param {string} trackSelector - トラック要素のセレクタ
   * @param {string} contentSelector - コンテンツ要素のセレクタ
   * @param {number} speed - スクロール速度（pixels per second）
   */
  function createTicker(trackSelector, contentSelector, speed) {
    const track = document.querySelector(trackSelector);
    const contents = document.querySelectorAll(contentSelector);

    if (!track || contents.length === 0) return;

    // CSSアニメーションを停止
    contents.forEach(content => {
      content.style.animation = 'none';
    });

    // コンテンツ幅を取得
    const contentWidth = contents[0].offsetWidth;

    let position = 0;
    let lastTime = null;

    function animate(currentTime) {
      if (lastTime === null) {
        lastTime = currentTime;
      }

      const deltaTime = (currentTime - lastTime) / 1000; // seconds
      lastTime = currentTime;

      // 位置を更新（右から左へ）
      position -= speed * deltaTime;

      // リセット（シームレスループ）
      if (position <= -contentWidth) {
        position += contentWidth;
      }

      // 両方のコンテンツを移動
      contents.forEach(content => {
        content.style.transform = `translateX(${position}px)`;
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /**
   * 全てのティッカーを初期化
   */
  function initAllTickers() {
    // ニューステロップ（TOPページ）
    createTicker('.ticker-track', '.ticker-content', 50);

    // デコラティブティッカー（Companyページ）
    createTicker('.decorative-ticker__track', '.decorative-ticker__content', 75);
  }

  // DOMContentLoaded時に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTickers);
  } else {
    initAllTickers();
  }
})();

/**
 * SEGA MUSIC - News Ticker
 * 電光掲示板風の無限スクロールアニメーション
 */

(function() {
  'use strict';

  const TICKER_SPEED = 50; // pixels per second

  function initTicker() {
    const track = document.querySelector('.ticker-track');
    const contents = document.querySelectorAll('.ticker-content');

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

      // 位置を更新
      position -= TICKER_SPEED * deltaTime;

      // リセット（シームレスループ）
      if (position <= -contentWidth) {
        position += contentWidth;
      }

      // 両方のコンテンツを移動
      contents[0].style.transform = `translateX(${position}px)`;
      contents[1].style.transform = `translateX(${position}px)`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  // DOMContentLoaded時に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTicker);
  } else {
    initTicker();
  }
})();

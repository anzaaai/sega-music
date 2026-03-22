/**
 * SEGA MUSIC - Decorative Ticker
 * 装飾用テキストのスクロールアニメーション
 */

(function() {
  'use strict';

  const TICKER_SPEED = 75; // pixels per second (1.5倍)

  function initMissionTicker() {
    const track = document.querySelector('.decorative-ticker__track');
    const contents = document.querySelectorAll('.decorative-ticker__content');

    if (!track || contents.length === 0) return;

    // CSSアニメーションを停止
    contents.forEach(content => {
      content.style.animation = 'none';
    });

    // コンテンツ幅を取得
    const contentWidth = contents[0].offsetWidth;

    // 初めから左端に配置（position = 0）
    let position = 0;
    let lastTime = null;

    function animate(currentTime) {
      if (lastTime === null) {
        lastTime = currentTime;
      }

      const deltaTime = (currentTime - lastTime) / 1000; // seconds
      lastTime = currentTime;

      // 位置を更新（右から左へ）
      position -= TICKER_SPEED * deltaTime;

      // リセット（シームレスループ）- 画面左端を超えたら右端に戻る
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
    document.addEventListener('DOMContentLoaded', initMissionTicker);
  } else {
    initMissionTicker();
  }
})();

/**
 * SEGA MUSIC - Ticker Animation
 * 電光掲示板風の無限スクロールアニメーション（汎用版）
 */

(function() {
  'use strict';

  // セパレーターの基本padding（vw）
  const SEPARATOR_PADDING_VW = 5;
  // アイテム数が少ない時の拡大倍率（アイテム数をキーに）
  const SEPARATOR_SCALE = {
    1: 3.0,
    2: 1.5
  };

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

    const original = contents[0];
    // アイテム数に応じてpaddingをスケール
    const itemCount = original.querySelectorAll('.ticker-item').length;
    const scale = SEPARATOR_SCALE[itemCount] || 1;
    const paddingVw = SEPARATOR_PADDING_VW * scale;
    original.querySelectorAll('.ticker-separator').forEach(sep => {
      sep.style.padding = `0 ${paddingVw}vw`;
    });

    // コンテンツ幅を取得
    const contentWidth = original.offsetWidth;

    // 画面幅を埋めるのに必要な数だけクローンを生成（最低1つ）
    const cloneCount = Math.max(1, Math.ceil(window.innerWidth / contentWidth));
    for (let i = 0; i < cloneCount; i++) {
      const clone = original.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }

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

      // 両方のコンテンツを移動（cloneも含む）
      track.querySelectorAll(contentSelector).forEach(content => {
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

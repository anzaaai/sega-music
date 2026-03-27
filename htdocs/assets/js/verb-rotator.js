/**
 * SEGA MUSIC - Verb Rotator
 * TOPページのMOVE部分を3秒おきに切り替え
 */

(function() {
  'use strict';

  // 設定
  const CONFIG = {
    verbs: [
      { line1: 'Record Label &', line2: 'Merchandising' },
      { line1: 'Music & Visual', line2: 'Products' },
      { line1: 'Music Publishing &', line2: 'Licensing' },
      { line1: 'Live Entertainment', line2: 'Event Production' }
    ],
    interval: 5000,
    shrinkDuration: 400,
    line2Delay: 650,
    initialDelay: 6800,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
  };

  function initVerbRotator() {
    const verbLine1Element = document.querySelector('.verb-rotator-line1');
    const verbLine2Element = document.querySelector('.verb-rotator-line2');
    const highlightElements = document.querySelectorAll('.hero .text-highlight');

    if (!verbLine1Element || !verbLine2Element || highlightElements.length < 2) return;

    let currentIndex = 0;

    function rotateVerb() {
      const line1Container = highlightElements[0];
      const line2Container = highlightElements[1];

      // 青い背景を縮めるアニメーション
      const shrinkAnimation = `verbBackgroundShrink ${CONFIG.shrinkDuration}ms ${CONFIG.easing} forwards`;
      line1Container.style.setProperty('--bg-animation', shrinkAnimation);
      line2Container.style.setProperty('--bg-animation', shrinkAnimation);
      line1Container.classList.add('animating-bg');
      line2Container.classList.add('animating-bg');

      // テキストをフェードアウト
      verbLine1Element.style.opacity = '0';
      verbLine2Element.style.opacity = '0';

      // 背景が縮んだ後、テキストを切り替えて展開
      setTimeout(() => {
        // アニメーションクラスを削除
        line1Container.classList.remove('verb-animate', 'animating-bg');
        line2Container.classList.remove('verb-animate', 'animating-bg');
        verbLine1Element.style.animation = 'none';
        verbLine2Element.style.animation = 'none';

        // テキストを切り替え
        currentIndex = (currentIndex + 1) % CONFIG.verbs.length;
        verbLine1Element.textContent = CONFIG.verbs[currentIndex].line1;
        verbLine2Element.textContent = CONFIG.verbs[currentIndex].line2;

        // clip-pathをリセット
        verbLine1Element.style.clipPath = 'inset(0 100% 0 0)';
        verbLine2Element.style.clipPath = 'inset(0 100% 0 0)';
        verbLine1Element.style.opacity = '1';
        verbLine2Element.style.opacity = '1';

        // リフロー（再描画）をトリガー
        void line1Container.offsetWidth;
        void line2Container.offsetWidth;

        const expandAnimation = `verbBackgroundExpand 0.8s ${CONFIG.easing} forwards`;
        const textAnimation = `heroMoveClip 0.8s ${CONFIG.easing} forwards`;

        // 1行目: 青い背景を伸ばす + テキストアニメーション
        setTimeout(() => {
          line1Container.style.setProperty('--bg-animation', expandAnimation);
          line1Container.classList.add('animating-bg');
          verbLine1Element.style.animation = textAnimation;
        }, 50);

        // 2行目: 青い背景を伸ばす + テキストアニメーション（遅延あり）
        setTimeout(() => {
          line2Container.style.setProperty('--bg-animation', expandAnimation);
          line2Container.classList.add('animating-bg');
          verbLine2Element.style.animation = textAnimation;
        }, CONFIG.line2Delay);
      }, CONFIG.shrinkDuration);
    }

    // 初回のアニメーション完了を待ってから開始
    // ローディング完了（約1.8〜2秒） + heroMoveClipアニメーション（2.8秒開始 + 0.8秒） = 約3.6秒
    // 初回MOVE表示4秒 → ローディング完了から約6.8秒後に切り替え（2.8秒 + 4秒）
    setTimeout(() => {
      rotateVerb();
      setInterval(rotateVerb, CONFIG.interval);
    }, CONFIG.initialDelay);
  }

  // DOMContentLoaded時に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVerbRotator);
  } else {
    initVerbRotator();
  }
})();

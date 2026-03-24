/**
 * SEGA MUSIC - Verb Rotator
 * TOPページのMOVE部分を3秒おきに切り替え
 */

(function() {
  'use strict';

  const VERBS = [
    { line1: 'Record Label &', line2: 'Merchandising' },
    { line1: 'Music & Visual', line2: 'Products' },
    { line1: 'Music', line2: 'Publishing' },
    { line1: 'Live Entertainment', line2: 'Productions' }
  ];
  const INTERVAL = 3000; // 3秒
  const ANIMATION_DURATION = 600; // 0.6秒

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
      line1Container.style.setProperty('--bg-animation', 'verbBackgroundShrink 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards');
      line2Container.style.setProperty('--bg-animation', 'verbBackgroundShrink 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards');
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
        currentIndex = (currentIndex + 1) % VERBS.length;
        verbLine1Element.textContent = VERBS[currentIndex].line1;
        verbLine2Element.textContent = VERBS[currentIndex].line2;

        // clip-pathをリセット
        verbLine1Element.style.clipPath = 'inset(0 100% 0 0)';
        verbLine2Element.style.clipPath = 'inset(0 100% 0 0)';
        verbLine1Element.style.opacity = '1';
        verbLine2Element.style.opacity = '1';

        // リフロー（再描画）をトリガー
        void line1Container.offsetWidth;
        void line2Container.offsetWidth;

        // 1行目: 青い背景を伸ばす + テキストアニメーション
        setTimeout(() => {
          line1Container.style.setProperty('--bg-animation', 'verbBackgroundExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards');
          line1Container.classList.add('animating-bg');
          verbLine1Element.style.animation = 'heroMoveClip 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }, 50);

        // 2行目: 青い背景を伸ばす + テキストアニメーション（遅延あり）
        setTimeout(() => {
          line2Container.style.setProperty('--bg-animation', 'verbBackgroundExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards');
          line2Container.classList.add('animating-bg');
          verbLine2Element.style.animation = 'heroMoveClip 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }, 650); // 0.6秒遅延
      }, 400); // 背景が縮むまで待つ
    }

    // 初回のアニメーション完了を待ってから開始
    // ローディング完了（約1.8〜2秒） + heroMoveClipアニメーション（2.8秒開始 + 0.8秒） = 約3.6秒
    // 初回MOVE表示4秒 → ローディング完了から約6.8秒後に切り替え（2.8秒 + 4秒）
    setTimeout(() => {
      rotateVerb(); // 初回実行
      setInterval(rotateVerb, INTERVAL); // その後は3秒ごと
    }, 6800); // ローディング完了後、2.8秒待ってMOVE表示、4秒後に切り替え
  }

  // DOMContentLoaded時に初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVerbRotator);
  } else {
    initVerbRotator();
  }
})();

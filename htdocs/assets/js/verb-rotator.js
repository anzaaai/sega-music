/**
 * SEGA MUSIC - Verb Rotator
 * TOPページのMOVE部分を3秒おきに切り替え
 */

(function() {
  'use strict';

  const VERBS = ['MOVE', 'TOUCH', 'DRIVE', 'CONNECT', 'INSPIRE'];
  const INTERVAL = 3000; // 3秒
  const ANIMATION_DURATION = 600; // 0.6秒

  function initVerbRotator() {
    const verbElement = document.querySelector('.verb-rotator');
    const highlightElement = document.querySelector('.hero .text-highlight');

    if (!verbElement || !highlightElement) return;

    let currentIndex = 0;

    function rotateVerb() {
      // 文字を素早くフェードアウト
      verbElement.style.transition = 'opacity 0.15s linear';
      verbElement.style.opacity = '0';

      // 青い背景を0%に縮める
      highlightElement.style.setProperty('--bg-animation', 'verbBackgroundShrink 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards');
      highlightElement.classList.add('animating-bg');

      // 背景が消えたタイミングで動詞を切り替え
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % VERBS.length;
        verbElement.textContent = VERBS[currentIndex];

        // 青い背景を100%に広げる
        highlightElement.style.setProperty('--bg-animation', 'verbBackgroundExpand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards');

        // 少し遅延してから文字をフェードイン
        setTimeout(() => {
          verbElement.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
          verbElement.style.opacity = '1';
        }, 100);
      }, 400);
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

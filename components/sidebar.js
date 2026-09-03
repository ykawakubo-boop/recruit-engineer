// =========================================================================
// レフトナビゲーション共通パーツ (components/sidebar.js)
// =========================================================================
(function() {
    "use strict";

    // HTML側で定義されていない場合のフォールバック
    const root = typeof pathToRoot !== 'undefined' ? pathToRoot : (typeof window.pathToRoot !== 'undefined' ? window.pathToRoot : '../');

    const container = document.getElementById('sidebar-container');
    if (!container) return;

    container.innerHTML = `
    <!-- モバイル用ヘッダー -->
    <header class="mobile-header">
        <a href="${root}" class="mobile-nav-logo" style="text-decoration: none; display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
            <img src="${root}images/dh_logo.png" alt="Diamondhead" style="width: 100%; max-width: 130px; height: auto; display: block; margin: 0; padding: 0; border: none;">
            <span class="mobile-logo-text" style="font-family: 'Noto Sans JP', sans-serif; font-size: 9px; font-weight: 700; color: #555555; letter-spacing: 0.15em; margin-top: 6px; line-height: 1.2;">ENGINEERING CAREERS</span>
        </a>
        <button class="menu-toggle" id="commonMenuToggle" style="background: none; border: none; font-family: 'Noto Sans JP', sans-serif; font-size: 12px; font-weight: 700; color: #00bfa5; cursor: pointer; padding: 10px; z-index: 1001;">MENU</button>
    </header>

    <!-- レフトナビゲーション本体 -->
    <aside class="left-nav" id="commonLeftNav">
        <!-- ロゴ画像とトップへのリンク -->
        <a href="${root}" class="nav-logo" data-id="logo">
            <img src="${root}images/dh_logo.png" alt="Diamondhead" style="margin-bottom: 10px;">
            <span class="logo-text">ENGINEERING CAREERS</span>
        </a>
        
        <!-- ナビゲーションメニュー一覧 -->
        <div class="nav-recruit">
            <ul class="nav-recruit-list">
                <li><a href="${root}" data-id="home">HOME</a></li>
                <li><a href="${root}newgrad/" data-id="newgrad">新卒採用</a></li>
                <li><a href="${root}midcareer/" data-id="midcareer">中途採用</a></li>
                <li class="has-sub">
                    <a href="${root}intern/" data-id="intern-index">インターンシップ</a>
                    <ul class="nav-sub-list">
                        <li class="has-deep">
                            <a href="${root}intern/long/" data-id="intern-long">長期インターンシップ</a>
                            <ul class="nav-deep-list" style="list-style: none; padding: 0 0 12px 12px; margin: 10px 0 0 0; border-left: 1px solid var(--border-color);">
                                <li><a href="${root}intern/long/backend/" data-id="intern-backend">EC支援システム開発</a></li>
                                <li><a href="${root}intern/long/frontend/" data-id="intern-frontend">ECサイト開発</a></li>
                                <li><a href="${root}intern/long/ml/" data-id="intern-ml">AI活用プロダクト開発</a></li>
                                <li><a href="${root}intern/long/digitalmarketing/" data-id="intern-dm">デジタルマーケティング</a></li>
                            </ul>
                        </li>
                        <li><a href="${root}intern/oneday/" data-id="intern-oneday">1dayインターンシップ</a></li>
                        <li><a href="${root}intern/twoweeks/" data-id="intern-twoweeks">2weeksインターンシップ</a></li>
                    </ul>
                </li>
                <li class="has-sub">
                    <!-- ★ ページ遷移させず、クリックでアコーディオン開閉のみ行う設定 -->
                    <a href="#" class="no-link" data-id="interview-index">インタビュー</a>
                    <ul class="nav-sub-list">
                        <!-- ★ フォルダ名（URL）と並び順を更新 -->
                        <li><a href="${root}interview/ec-service/" data-id="interview-ec">ECサービスG</a></li>
                        <li><a href="${root}interview/saas/" data-id="interview-kamada">SaaS G</a></li>
                        <li><a href="${root}interview/business-technology/" data-id="interview-sato">ビジネステクノロジーG</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>
    `;

    // 2. 開閉用クラスの追加CSSをJSから強制注入
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 992px) {
            #commonLeftNav {
                position: fixed; top: 0; left: -100%; height: 100vh;
                transition: left 0.3s ease; box-shadow: 10px 0 30px rgba(0,0,0,0.1); z-index: 1000;
            }
            #commonLeftNav.is-open {
                left: 0 !important;
            }
        }
        
        /* スマホ操作やクリックで開くためのアコーディオン用クラス */
        #commonLeftNav li.has-sub.is-open-accordion > .nav-sub-list {
            max-height: 800px !important;
            opacity: 1 !important;
            padding: 10px 0 0 12px !important;
        }
    `;
    document.head.appendChild(style);

    // 3. メニュー開閉と現在地ハイライト
    setTimeout(() => {
        const menuToggle = document.getElementById('commonMenuToggle');
        const leftNav = document.getElementById('commonLeftNav');
        
        if (menuToggle && leftNav) {
            // モバイル用MENUボタン
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                leftNav.classList.toggle('is-open');
                if (leftNav.classList.contains('is-open')) {
                    menuToggle.textContent = 'CLOSE';
                    menuToggle.style.color = '#111';
                } else {
                    menuToggle.textContent = 'MENU';
                    menuToggle.style.color = '#00bfa5';
                }
            });

            // インタビューなどの「リンクなし親メニュー」の開閉制御
            const noLinks = leftNav.querySelectorAll('.no-link');
            noLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault(); // ページトップへの遷移を防ぐ
                    const parentLi = link.closest('.has-sub');
                    if (parentLi) {
                        parentLi.classList.toggle('is-open-accordion'); // アコーディオンの開閉
                    }
                });
            });

            // 通常のリンク（各ページへの遷移）をクリックしたときはスマホメニューを閉じる
            const navLinks = leftNav.querySelectorAll('a:not(.no-link)');
            navLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 992) {
                        leftNav.classList.remove('is-open');
                        menuToggle.textContent = 'MENU';
                        menuToggle.style.color = '#00bfa5';
                    }
                });
            });
        }

        // 現在地のアクティブ化
        const currentPageId = document.body.getAttribute('data-page');
        if (currentPageId) {
            const targetLink = document.querySelector(`#commonLeftNav a[data-id="${currentPageId}"]`);
            if (targetLink) {
                if (targetLink.closest('.nav-deep-list')) {
                    targetLink.classList.add('active-deep');
                    targetLink.closest('.has-deep').querySelector('a:first-child').classList.add('active-sub');
                    targetLink.closest('.has-sub').querySelector('a:first-child').classList.add('active');
                } else if (targetLink.closest('.nav-sub-list')) {
                    targetLink.classList.add('active-sub');
                    targetLink.closest('.has-sub').querySelector('a:first-child').classList.add('active');
                    // アクティブな子要素を持つ親アコーディオンは開いておく
                    targetLink.closest('.has-sub').classList.add('is-open-accordion');
                } else {
                    targetLink.classList.add('active');
                }
            }
        }
    }, 50);

})();

// =========================================================================
// 全ページに会社のロゴ（ファビコン）を自動追加する命令
// =========================================================================
(function() {
    "use strict";

    const faviconData = [
        { rel: 'shortcut icon', type: 'image/vnd.microsoft.icon', href: 'https://diamondhead.jp/assets/images/common/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/png', href: 'https://diamondhead.jp/assets/images/common/favicon/apple-touch-icon-180x180.png' },
        { rel: 'icon', type: 'image/png', href: 'https://diamondhead.jp/assets/images/common/favicon/icon-192x192.png' }
    ];

    faviconData.forEach((data) => {
        const link = document.createElement('link');
        link.rel = data.rel;
        link.type = data.type;
        link.href = data.href;
        document.head.appendChild(link);
    });
})();

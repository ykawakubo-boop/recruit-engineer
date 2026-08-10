// =========================================================================
// 共通フッターコンポーネント (components/footer.js または scsk-logo.js)
// =========================================================================
// 全ページ共通のフッター（リンク集やロゴ、コピーライトなど）を生成します。
// CSSもこのファイル内で動的に注入するため、HTML側にCSSを書く必要がありません。
(function() {
    const initFooter = function() {
        // HTML側にある「箱」を探します（新しい名前でも、古い名前でも両方対応）
        let container = document.getElementById('footer-container') || document.getElementById('scsk-logo-container');
        
        // もしHTML側に箱自体が書き忘れられていた場合は、自動的に一番下に箱を作ります
        if (!container) {
            const mainContent = document.querySelector('.main-content');
            container = document.createElement('div');
            container.id = 'footer-container';
            if (mainContent) {
                mainContent.appendChild(container);
            } else {
                document.body.appendChild(container);
            }
        }

        const root = typeof pathToRoot !== 'undefined' ? pathToRoot : '../';
        
        const style = document.createElement('style');
        style.textContent = `
            .global-footer {
                background-color: #ffffff;
                border-top: 1px solid var(--border-color, #e2e8f0);
                padding: 40px 6%;
                display: flex;
                flex-direction: column;
                gap: 40px;
            }
            .footer-links {
                display: flex;
                gap: 32px;
                flex-wrap: wrap;
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .footer-links a {
                font-family: 'Bodoni Moda', 'Noto Sans JP', sans-serif;
                color: #111111;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.05em;
                text-decoration: none;
                transition: color 0.3s;
            }
            .footer-links a:hover {
                color: var(--accent-blue, #00bfa5);
            }
            /* コピーライトとロゴを横並びにするためのコンテナ */
            .footer-bottom {
                display: flex;
                justify-content: space-between;
                align-items: flex-end; /* 下揃え */
                width: 100%;
                gap: 20px;
            }
            .footer-copyright {
                font-family: 'Noto Sans JP', sans-serif;
                font-size: 11px;
                color: #888888;
                margin: 0;
                letter-spacing: 0.05em;
                line-height: 1;
                /* 文字と画像の下端を視覚的にピッタリ合わせるための微調整 */
                padding-bottom: 2px;
            }
            .footer-scsk-area {
                display: flex;
                justify-content: flex-end;
                flex-shrink: 0;
            }
            .footer-scsk-area a {
                display: block;
                margin-left: auto !important; 
            }
            .footer-scsk-logo {
                width: 120px !important;
                height: auto;
                transition: transform 0.3s ease;
                display: block;
                margin: 0 !important; 
                position: static !important;
            }
            .footer-scsk-logo:hover {
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .global-footer {
                    padding: 40px 5%;
                    gap: 30px;
                }
                .footer-links {
                    flex-direction: column;
                    gap: 16px;
                }
                .footer-bottom {
                    /* スマホ時も横並びで下揃えをキープ */
                    align-items: flex-end;
                }
                .footer-copyright {
                    font-size: 10px;
                }
                .footer-scsk-logo {
                    width: 90px !important;
                }
            }
        `;
        document.head.appendChild(style);

        container.innerHTML = `
        <footer class="global-footer">
            <ul class="footer-links">
                <li><a href="https://diamondhead.jp/?_gl=1*3f2w89*_gcl_au*MTYyNDY5OTA2Ni4xNzgwOTk0ODM2" target="_blank" rel="noopener noreferrer">CORPORATE SITE</a></li>
                <li><a href="https://csr.diamondhead.jp/?_gl=1*i8jglq*_gcl_au*MTYyNDY5OTA2Ni4xNzgwOTk0ODM2" target="_blank" rel="noopener noreferrer">CSR</a></li>
                <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSe3ourzAaRgRIV6fMVq2dziMm5qKey4Iell5d3bjStALeWT5A/viewform" target="_blank" rel="noopener noreferrer">CONTACT</a></li>
            </ul>
            <div class="footer-bottom">
                <p class="footer-copyright">&copy; Diamondhead Co., Ltd.</p>
                <div class="footer-scsk-area">
                    <a href="https://www.scsk.jp/" target="_blank" rel="noopener noreferrer">
                        <img src="${root}images/scsk_black.png" alt="SCSK Group Logo" class="footer-scsk-logo">
                    </a>
                </div>
            </div>
        </footer>
        `;
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        initFooter();
    }
})();
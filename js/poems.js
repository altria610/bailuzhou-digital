document.addEventListener("DOMContentLoaded", () => {

    const poemList =
        document.getElementById("poem-list");

    if (!poemList) {
        console.error("找不到 poem-list");
        return;
    }


    async function loadPoems() {

        try {

            const response =
                await fetch("data/poems.json", {
                    cache: "no-cache"
                });

            if (!response.ok) {
                throw new Error(
                    `无法读取 poems.json：HTTP ${response.status}`
                );
            }

            const poems =
                await response.json();

            if (!Array.isArray(poems)) {
                throw new Error(
                    "poems.json 必须是数组格式"
                );
            }


            poemList.innerHTML = "";


            if (poems.length === 0) {

                poemList.innerHTML = `
                    <div class="poem-message">
                        暂无诗词内容
                    </div>
                `;

                return;
            }


            poems.forEach(poem => {

                const card =
                    document.createElement("article");

                card.className = "poem-card";


                const title =
                    poem.title || "未命名诗词";

                const author =
                    poem.author || "作者不详";

                const dynasty =
                    poem.dynasty || "朝代不详";

                const content =
                    poem.content || "暂无诗词正文";

                const introduction =
                    poem.introduction || "暂无简介";


                card.innerHTML = `

                    <h2 class="poem-title">
                        ${escapeHTML(title)}
                    </h2>

                    <div class="poem-meta">
                        ${escapeHTML(dynasty)}
                        ·
                        ${escapeHTML(author)}
                    </div>

                    <p class="poem-content">
                        ${escapeHTML(content)}
                    </p>

                    <div class="poem-introduction">

                        <span class="poem-introduction-label">
                            诗词简介
                        </span>

                        ${escapeHTML(introduction)}

                    </div>

                `;


                poemList.appendChild(card);

            });


        } catch (error) {

            console.error(
                "加载诗词失败：",
                error
            );

            poemList.innerHTML = `
                <div class="poem-message">

                    诗词内容加载失败。<br>

                    请检查
                    <strong>data/poems.json</strong>
                    是否存在，以及网站是否通过
                    Live Server 打开。

                </div>
            `;
        }

    }


    /*
     * 防止 JSON 中的特殊字符破坏 HTML
     */
    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    loadPoems();

});
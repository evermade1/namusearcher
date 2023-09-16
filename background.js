chrome.contextMenus.create({
    id: "customContextMenu",
    title: "나무위키에서 검색",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(onClick) 

function onClick(info) {
    console.log("hi");
    if (info.menuItemId === "customContextMenu") {
        // 컨텍스트 메뉴 항목이 클릭되었을 때 실행되는 코드
        // info 객체는 클릭 이벤트에 대한 정보를 제공합니다.
        const selectedText = info.selectionText; // 선택된 텍스트

        const url = "https://namu.wiki/w/" + encodeURIComponent(selectedText);
        chrome.tabs.create({ url: url });
    }
};
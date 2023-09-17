chrome.contextMenus.create({
    id: "customContextMenu",
    title: "나무위키에서 검색",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.onClicked.addListener(onClick);
  
  function onClick(info) {
    if (info.menuItemId === "customContextMenu") {
      const selectedText = info.selectionText;
      const articleUrl = "https://namu.wiki/w/" + encodeURIComponent(selectedText);
      
      // namu.wiki에서 검색을 수행하고 결과 페이지로 이동
      chrome.tabs.create({ url: articleUrl }, function(tab) {
        // 검색 결과 페이지가 로드되었을 때 발생하는 이벤트 리스너
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === 'complete') {
            // 페이지 로드가 완료된 후 스크립트 실행
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              function: () => {
                const result = document.querySelector("p").innerText;
                const title = document.title.split(" ")[0]
                if (result == "해당 문서를 찾을 수 없습니다.") {
                    window.location.href = `https://namu.wiki/Search?q=${title}`
                }
              },
            });
  
            // 리스너 삭제
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    }
  }
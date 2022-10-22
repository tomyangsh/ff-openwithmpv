function createMenus() {
  browser.contextMenus.create({
    id: "mpvPage",
    title: "mpv",
    contexts: ["all"],
    visible: true
  });

  browser.contextMenus.create({
    id: "mpvLink",
    title: "mpv",
    contexts: ["link"]
  });
}

function mpvPage(info, tab) {
  const newUrl = `mpv:${info.pageUrl}`;
  
  browser.tabs.update({
    url: newUrl,
  });
}

function mpvLink(info, tab) {
  const encodedLinkUrl = encodeURIComponent(info.linkUrl);
  const newUrl = `mpv:${info.linkUrl}`;

  browser.tabs.update({
    url: newUrl,
  });
}


createMenus();

browser.contextMenus.onShown.addListener(function(info, tab) {
  if (info.contexts.includes("link")) {
    browser.contextMenus.update("mpvPage", { visible: false });
  } else {
    browser.contextMenus.update("mpvPage", { visible: true });
  }
  browser.contextMenus.refresh();
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  switch (info.menuItemId) {
    case "mpvPage":
      mpvPage(info, tab);
      break;
    case "mpvLink":
      mpvLink(info, tab);
      break;
  }
});

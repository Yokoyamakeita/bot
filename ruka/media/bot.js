// 指定したIDのタグでマークアップされたテキストを取得するヘルパー関数
function getContentById(id) {
 return document.getElementById(id).textContent;
}

// このページの商品情報をHTML要素から抽出してwebContextを作る
var webContext = {
 thisProduct: {
   name: getContentById('prd_name'),
   price: getContentById('prd_price'),
   stock: getContentById('prd_stock') === 'In Stock'
 }
};

// WebChatの初期化
window.botpressWebChat.init({
  extraStylesheet: 'api/v1/bots/ruka/media/webchat.css',
  host:'http://localhost:3000',
  botId:'ruka'
});

// プロアクティブ化
window.addEventListener('message', function(event) {
  if (event.data.payload && event.data.payload.type === 'visit') {
    window.botpressWebChat.sendEvent({
      type: 'proactive-trigger',
      channel: 'web',
      payload: { text:  JSON.stringify(webContext) }
    });
  }
});
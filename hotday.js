function getParams(params) {
  return Object.fromEntries(
    params
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

const params = getParams($argument);
const platform = params.platform || '微博';
const count = parseInt(params.count) || 10;
let platformValue;

switch (platform) {
  case '微博':
    platformValue = 'weibo';
    break;
  case '哔哩哔哩':
    platformValue = 'bilibili';
    break;
  case '抖音':
    platformValue = 'douyin';
    break;
  case '36氪':
    platformValue = '36kr';
    break;
  case '百度':
    platformValue = 'baidu';
    break;
  case '少数派':
    platformValue = 'sspai';
    break;
  case 'IT之家':
    platformValue = 'ithome';
    break;
  case '澎湃新闻':
    platformValue = 'thepaper';
    break;
  case '今日头条':
    platformValue = 'toutiao';
    break;
  case '百度贴吧':
    platformValue = 'tieba';
    break;
  case '稀土掘金':
    platformValue = 'juejin';
    break;
  case '腾讯新闻':
    platformValue = 'qq-news';
    break;
  case '网易新闻':
    platformValue = 'netease-news';
    break;
  case '微信读书':
    platformValue = 'weread';
    break;
  default:
    platformValue = '';
}

const url = `https://api-hot.imsyy.top/${platformValue}?cache=false`;

$httpClient.get(url, (error, response, body) => {
  if (error) {
    $notification.post('获取热榜失败', error, '');
    $done();
    return;
  }

  const notificationTitle = `${platform}热榜`;

  let notificationContent = '';
  const data = JSON.parse(body);
  for (let i = 0; i < data.data.length && i < count; i++) {
    const keyword = data.data[i].title || data.data[i].desc;
    notificationContent += `${i + 1}🔥${keyword}\n`;
  }

  $done({
    title: notificationTitle,
    content: notificationContent,
    icon: params.icon,
    'icon-color': params.color,
    platform: params.platform,
    count: params.count
  });
});
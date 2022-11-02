export const handleDate = (data) => {
  const publish = data.split("T")[0];
  const publishTime = data.split("T")[1];
  const publishYear = publish.split("-")[0];
  const publishMonth = publish.split("-")[1];
  const publishDate = publish.split("-")[2];
  const isPublishDate = new Date(
    `${publishMonth} ${publishDate} ${publishYear} ${publishTime}`
  ).getTime();
  const isNowDate = new Date().getTime();
  // 時間差(毫秒) = 目前日期 - 發布日期
  const timeLag = isNowDate - isPublishDate;
  // 相差幾年
  const year = new Date().getFullYear() - publishYear;
  // 相差幾月
  const month = new Date().getMonth() + 1 - publishYear;
  // 相差幾天
  const days = parseInt(timeLag / 1000 / 60 / 60 / 24);
  // 相差幾小時
  const hours = parseInt(timeLag / 1000 / 60 / 60);
  // 相差幾分鐘
  const minutes = parseInt(timeLag / 1000 / 60);
  // 相差幾秒鐘
  const secs = parseInt(timeLag / 1000);
  // parseInt         ( timeLag / 1000 / 60 / 60 / 24);
  // 將輸入的字串轉成整數( 相差毫秒數  豪秒    秒   分    時)
  // 1秒 = 1000毫秒
  // 60秒 = 1分
  // 60分 = 1時
  // 24時 = 1天

  if (year !== 0) {
    return `${publishMonth} 月, ${publishDate}, ${publishYear}`;
  } else if (month >= 0 && days === 31) {
    return `${publishMonth} 月, ${publishDate}`;
  } else if (days < 31 && days > 7) {
    return `${Math.floor(days / 7)} 週前`;
  } else if ((days <= 7 && days > 0) || (days === 0 && minutes === 60)) {
    return `${days} 天前`;
  } else if ((hours < 24 && hours > 0) || (hours === 0 && minutes === 60)) {
    return `${hours} 小時前`;
  } else if ((minutes < 60 && minutes > 0) || (minutes === 0 && secs === 60)) {
    return `${minutes} 分前`;
  } else {
    return `${secs} 秒前`;
  }
};

// 秒：
// 分：(分===0 而且 秒===60)或是 0<分<60
// 時：(時===0 而且 分===60)或是 0<時<24
// 日：(日 ===0 而且 時===24) 或是 0<日<=7
// 週：7<日<31
// 月：月>=0 日===31
// 年：年!=0

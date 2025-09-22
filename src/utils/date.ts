type Language = 'ja' | 'en';

export function getRelativeTimeString(
  date: Date | string | number,
  lang: Language = 'ja',
): string {
  const targetDate = new Date(date);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - targetDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  // Calculate months and years using proper date arithmetic
  let diffInMonths = (now.getFullYear() - targetDate.getFullYear()) * 12 +
                     (now.getMonth() - targetDate.getMonth());

  // Adjust if the day of month hasn't been reached yet
  if (now.getDate() < targetDate.getDate()) {
    diffInMonths--;
  }

  // Ensure diffInMonths is not negative and handle edge case for 29-31 days
  if (diffInMonths < 0) {
    diffInMonths = 0;
  }

  // If it's been more than 28 days but diffInMonths is 0, set it to 1
  // This handles months with 29-31 days
  if (diffInMonths === 0 && diffInDays >= 28) {
    diffInMonths = 1;
  }

  const diffInYears = Math.floor(diffInMonths / 12);

  const messages = {
    ja: {
      future: '未来',
      justNow: 'たった今',
      minute: (n: number) => `${n}分前`,
      hour: (n: number) => `${n}時間前`,
      yesterday: '昨日',
      day: (n: number) => `${n}日前`,
      week: (n: number) => `${n}週間前`,
      month: (n: number) => `${n}ヶ月前`,
      lastYear: '去年',
      year: (n: number) => `${n}年前`,
    },
    en: {
      future: 'future',
      justNow: 'just now',
      minute: (n: number) =>
        n === 1 ? 'a minute ago' : `${n} minutes ago`,
      hour: (n: number) => (n === 1 ? 'an hour ago' : `${n} hours ago`),
      yesterday: 'yesterday',
      day: (n: number) => (n === 1 ? 'yesterday' : `${n} days ago`),
      week: (n: number) => (n === 1 ? 'a week ago' : `${n} weeks ago`),
      month: (n: number) =>
        n === 1 ? 'a month ago' : `${n} months ago`,
      lastYear: 'last year',
      year: (n: number) => (n === 1 ? 'last year' : `${n} years ago`),
    },
  };

  const msg = messages[lang];

  if (diffInSeconds < 0) {
    return msg.future;
  }

  if (diffInSeconds < 60) {
    return msg.justNow;
  }

  if (diffInMinutes < 60) {
    return msg.minute(diffInMinutes);
  }

  if (diffInHours < 24) {
    return msg.hour(diffInHours);
  }

  if (diffInDays === 1) {
    return msg.yesterday;
  }

  if (diffInDays < 7) {
    return msg.day(diffInDays);
  }

  if (diffInWeeks < 4) {
    return msg.week(diffInWeeks);
  }

  if (diffInMonths < 12) {
    return msg.month(diffInMonths);
  }

  if (diffInYears === 1) {
    return msg.lastYear;
  }

  return msg.year(diffInYears);
}

export function formatDate(
  date: Date | string | number,
  lang: Language = 'ja',
  includeTime = false,
): string {
  const targetDate = new Date(date);

  if (lang === 'ja') {
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();

    let result = `${year}年${month}月${day}日`;

    if (includeTime) {
      const hours = targetDate.getHours().toString().padStart(2, '0');
      const minutes = targetDate
        .getMinutes()
        .toString()
        .padStart(2, '0');
      result += ` ${hours}:${minutes}`;
    }

    return result;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }

    return targetDate.toLocaleDateString('en-US', options);
  }
}

export function formatDateShort(
  date: Date | string | number,
  lang: Language = 'ja',
): string {
  const targetDate = new Date(date);

  if (lang === 'ja') {
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    return `${month}/${day}`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };
    return targetDate.toLocaleDateString('en-US', options);
  }
}

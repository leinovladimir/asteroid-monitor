export const formatDate = (dateStr) => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  const [year, month, day] = dateStr.split('-');
  return `${day} ${months[parseInt(month) - 1]} ${year}`;
};

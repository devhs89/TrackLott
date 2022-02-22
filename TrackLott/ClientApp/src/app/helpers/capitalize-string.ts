export const capitalizeString = (str: string): string => {
  const strArray = str.split(' ');
  let capitalizedStr = '';

  for (let i = 0; i < strArray.length; i++) {
    if (strArray[i] !== 'and' && strArray[i] !== '&') {
      if (strArray[i].charAt(0) === '(') {
        capitalizedStr += strArray[i].slice(0, 1);
        capitalizedStr += strArray[i].charAt(1).toUpperCase();
        capitalizedStr += strArray[i].slice(2);
      } else if (strArray[i].charAt(1) === "'") {
        capitalizedStr += strArray[i].slice(0, 2);
        capitalizedStr += strArray[i].charAt(2).toUpperCase();
        capitalizedStr += strArray[i].slice(3);
      } else {
        capitalizedStr += strArray[i].charAt(0).toUpperCase();
        capitalizedStr += strArray[i].slice(1);
      }
    } else {
      capitalizedStr += strArray[i];
    }

    if (i !== (strArray.length - 1)) {
      capitalizedStr += ' ';
    }
  }

  return capitalizedStr;
};

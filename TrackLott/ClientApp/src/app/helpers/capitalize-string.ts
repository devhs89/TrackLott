export const capitalizeString = (str: string): string => {
  const strArray = str.split(' ');
  let capitalizedStr = '';

  for (let i = 0; i < strArray.length; i++) {
    if (strArray[i] !== 'and' && strArray[i] !== '&') {
      capitalizedStr += strArray[i].charAt(0).toUpperCase();
      capitalizedStr += strArray[i].slice(1);
    } else {
      capitalizedStr += strArray[i];
    }

    if (i !== (strArray.length - 1)) {
      capitalizedStr += ' ';
    }
  }
  return capitalizedStr;
};

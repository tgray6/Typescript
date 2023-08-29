const Spongebob = (spongebob: string): string => {
  let UpLowArray: string[] = [];
  for (let i = 0; i < spongebob.length; i++) {
    if (i % 2 === 0) {
      if (UpLowArray[i + 1] === " ") {
        UpLowArray.push(spongebob[i].toLowerCase());
      }
      UpLowArray.push(spongebob[i].toLowerCase());
    } else {
      UpLowArray.push(spongebob[i].toUpperCase());
    }
  }
  return UpLowArray.join("");
};

console.log(Spongebob("Steven Is So Coo"));

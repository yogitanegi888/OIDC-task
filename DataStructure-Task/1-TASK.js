function firstNonRepeatingCharacter(str) {
    let charCountMap = new Map();
    console.log(charCountMap, "hii")
    for (let i = 0; i < str.length; i++) {
      let ch = str.charAt(i);
      if (!charCountMap.has(ch)) charCountMap.set(ch, 0);
      charCountMap.set(ch, charCountMap.get(ch) + 1);
    }
  
    for (let [key, value] of charCountMap.entries()) {
      if (value == 1) return key;
    }
  }
  
  let result = firstNonRepeatingCharacter("abcbadc");
  console.log(result);
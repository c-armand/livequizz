const accentMap = {
  'á': 'a',
  'à': 'a',
  'â': 'a',
  'ä': 'a',
  'ã': 'a',
  'é': 'e',
  'è': 'e',
  'ê': 'e',
  'ë': 'e',  
  'í': 'i',
  'ï': 'i',
  'î': 'i',
  'ó': 'o',
  'ô': 'o',
  'ö': 'o',
  'õ': 'o',
  'ú': 'u',
  'û': 'u',
  'ü': 'u',
  'ç': 'c',
  'œ': 'oe'
}

const accentFold = string => {
  if (!string) { return '' }
  let ret = ''
  for (let i = 0; i < string.length; i++) {
    ret += accentMap[string.charAt(i)] || string.charAt(i)
  }

  return ret
}

const verifyProposition = (proposition, acceptedAnswers) => {
  for (let acceptedAnswer of acceptedAnswers) {
    // Set in lower case, accents folded
    if (accentFold(proposition.toLowerCase()).indexOf(accentFold(acceptedAnswer.toLowerCase())) > -1) {
      return acceptedAnswers[0]
    }
  }

  return false
}

module.exports = verifyProposition
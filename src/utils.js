export const getRandomNumber = () => {
  return Math.floor(Math.random() * 999999);
};

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const smartenText = s => {
  // 5' or 5'' or 5" => prime symbols
  s = s.replace(/(\d)'(?!['"])/g, "$1\u2032");
  s = s.replace(/(\d)("|'')(?!['"])/g, "$1\u2033");

  // curly quotes
  s = s.replace(/"|'+|`+/g, (match, offset, string) => {
    if (match.length > 3) return match;
    if (match === "```") return "\u201C\u2018";
    if (match === "``") return "\u201C";
    if (match === "`") return "\u2018";
    let open =
      match === "'''" ? "\u201C\u2018" : match === "'" ? "\u2018" : "\u201C";
    let close =
      match === "'''" ? "\u2019\u201D" : match === "'" ? "\u2019" : "\u201D";
    let prev = string[offset - 1] || " ";
    let prev2 = string[offset - 2] || " ";
    let next = string[offset + match.length] || " ";
    let next2 = string[offset + match.length + 1] || " ";
    let alpha = /[0-9a-zA-Z\u00C0-\u024F\u0400-\u04FF]/; // digit + latin + latin extended + cyrillic
    let space = /[ \r\n\t]/;
    let quote = /['"\u2018\u201C\u00AB\u2039\u2019\u201D\u00BB\u203A]/;
    if (
      (prev.match(space) || (prev2.match(space) && prev.match(quote))) &&
      (next.match(space) || (next2.match(space) && next.match(quote)))
    )
      return match;
    if (match !== "'" && prev.match(alpha) && next.match(alpha)) return match;
    if (prev.match(alpha) || next.match(space)) return close;
    if (next.match(alpha) || prev.match(space)) return open;
    if (prev.match(/[({[]/)) return next.match(/[)}\]]/) ? match : open;
    if (
      prev.match(/['"\u2018\u201C\u00AB\u2039]/) &&
      prev2.match(/[ \r\n\t({[]/)
    )
      return open;
    return close;
  });

  // insert hair spaces between curly quotes
  s = s.replace(
    /(\u2018|\u2019|\u201C|\u201D)(?=\u2018|\u2019|\u201C|\u201D)/g,
    "$1\u200A"
  );

  // ... or .... or . . . => ellipsis
  s = s.replace(/\. ?\.( ?\.)+/g, s =>
    s.replace(/ /g, "").length < 5 ? "\u2026" : s
  );

  // +/- => plus or minus sign
  s = s.replace(/\+\/-/g, "\u00B1");

  // --- => em-dash (with hair spaces)
  s = s.replace(/ ?---+ ?/g, s =>
    s.trim().length == 3 ? "\u200A\u2014\u200A" : s
  );

  // -- => en-dash
  s = s.replace(/ ?--+ ?/g, s => (s.trim().length == 2 ? "\u2013" : s));

  // 3*4 or 3x4 => multiply sign
  s = s.replace(/(\d ?)[x*]( ?\d)/g, "$1\u00D7$2");

  // -1 => minus sign
  s = s.replace(/-(?= ?\.?\d)/g, "\u2212");

  // 1/2, 3/4 etc. => fractions
  if (s.match(/\d\/\d/)) {
    s = s.replace(/(^|\D)1\/2(?!\d)/g, "$1\u00BD");
    s = s.replace(/(^|\D)1\/3(?!\d)/g, "$1\u2153");
    s = s.replace(/(^|\D)2\/3(?!\d)/g, "$1\u2154");
    s = s.replace(/(^|\D)1\/4(?!\d)/g, "$1\u00BC");
    s = s.replace(/(^|\D)3\/4(?!\d)/g, "$1\u00BE");
    s = s.replace(/(^|\D)1\/8(?!\d)/g, "$1\u215B");
    s = s.replace(/(^|\D)3\/8(?!\d)/g, "$1\u215C");
    s = s.replace(/(^|\D)5\/8(?!\d)/g, "$1\u215D");
    s = s.replace(/(^|\D)7\/8(?!\d)/g, "$1\u215E");
  }

  // a.  A => a. A
  s = s.replace(/\. {2}(?! )/g, ". ");

  // non-breaking spaces
  s = s.replace(/(\u00AB|\u2039) | (?=[:;!?]|\u00BB|\u203A)/g, "$1\u00A0"); // French
  s = s.replace(/(\b[A-Za-z]\.) (?=[A-Za-z]\.)/g, "$1\u00A0"); // German

  return s;
};

const parser = new DOMParser();

function toPlainText(s) {
  s = s.replace(/<br ?\/?>(?=.)/g, "\n"); // convert br tags to line break (except at the end)
  return parser.parseFromString(s, "text/html").documentElement.textContent; // decodes all HTML entities
}

export function countChars(s) {
  return toPlainText(s).length;
}

export function countWords(s) {
  // Splitting on spaces (or whitespace) has some caveats, e.g "oh..." is 1 word but "oh ..." is 2 words.
  // To give a more reliable count, let's detect sequences of letters (or digits).
  // Of course it is never going to be bulletproof, because each language has its own way
  // to count words---some, like Japanese, don't even use spaces!
  // For CJK, we'll count individual characters as words.
  // For numbers, we'll count a sequence a consecutive digits as 1 word (e.g "123.45" is two words).

  let words = toPlainText(s).match(
    /[A-Za-z\u00C0-\u017F]+|[\u0400-\u04FF\u0500–\u052F]+|[\u0370-\u03FF\u1F00-\u1FFF]+|[\u4E00–\u9FFF]|\d+/g
  );
  return words ? words.length : 0;

  //   \u00C0-\u017F   Latin Extended
  //   \u0400-\u04FF   Cyrillic
  //   \u0500–\u052F   Cyrillic Supplement
  //   \u0370-\u03FF   Greek
  //   \u1F00-\u1FFF   Greek Extended
  //   \u4E00–\u9FFF   CJK
}

export const toFileName = text => {
  return text.replace(/[^a-zA-Z0-9]/g, "_");
};

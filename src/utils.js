export const isRunningElectron = window && window.process && window.process.type;
const { ipcRenderer } = isRunningElectron ? window.require("electron") : {};

class ElectronIPC {
    reload() {
        return isRunningElectron ? ipcRenderer.send("reload") : window.location.reload();
    }

    closeWindow() {
        ipcRenderer.send("close");
    }

    resizeWindow() {
        ipcRenderer.send("resize");
    }

    minimizeWindow() {
        ipcRenderer.send("minimize");
    }
}

export const electronIPC = new ElectronIPC();

export const getRandomNumber = () => {
    return Math.floor(Math.random() * 999999);
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const smartenText = (s) => {
    // 5' or 5'' or 5" => prime symbols
    s = s.replace(/(?<=\d)'(?!['"])/g, "\u2032");
    s = s.replace(/(?<=\d)("|'')(?!['"])/g, "\u2033");

    // curly quotes
    s = s.replace(/"|'+|`+/g, (match, offset, string) => {
        if (match.length > 3) return match;
        if (match === "```") return "\u201C\u2018";
        if (match === "``") return "\u201C";
        if (match === "`") return "\u2018";
        let open = match === "'''" ? "\u201C\u2018" : match === "'" ? "\u2018" : "\u201C";
        let close = match === "'''" ? "\u2019\u201D" : match === "'" ? "\u2019" : "\u201D";
        let prev = string[offset - 1] || " ";
        let prev2 = string[offset - 2] || " ";
        let next = string[offset + match.length] || " ";
        let next2 = string[offset + match.length + 1] || " ";
        let alpha = /[0-9a-zA-Z\u00C0-\u024F\u0400-\u04FF]/; // digit + latin + latin extended + cyrillic
        let space = /[ \r\n\t]/;
        let quote = /['"\u2018\u201C\u00AB\u2039\u2019\u201D\u00BB\u203A]/;
        if ((prev.match(space) || prev2.match(space) && prev.match(quote))
            && (next.match(space) || next2.match(space) && next.match(quote))) return match;
        if (match !== "'" && prev.match(alpha) && next.match(alpha)) return match;
        if (prev.match(alpha) || next.match(space)) return close;
        if (next.match(alpha) || prev.match(space)) return open;
        if (prev.match(/[({[]/)) return next.match(/[)}\]]/) ? match : open;
        if (prev.match(/['"\u2018\u201C\u00AB\u2039]/) && prev2.match(/[ \r\n\t({[]/)) return open;
        return close;
    });

    // insert hair spaces between curly quotes
    s = s.replace(/(?<=\u2018|\u2019|\u201C|\u201D)(?=\u2018|\u2019|\u201C|\u201D)/g, "\u200A");

    // ... or .... => ellipsis
    s = s.replace(/(?<!\. ?)\.( ?\.){2,3}(?! ?\.)/g, "\u2026");

    // +/- => plus or minus sign
    s = s.replace(/\+\/-/g, "\u00B1");

    // --- => em-dash (with hair spaces)
    s = s.replace(/ ?(?<!-)---(?!-) ?/g, "\u200A\u2014\u200A");

    // -- => en-dash
    s = s.replace(/ ?(?<!-)--(?!-) ?/g, "\u2013");

    // *2 or x2 => multiply sign
    s = s.replace(/((?<![a-zA-Z])x|(?<!(^|\n) *)\*)(?= ?-?\.?\d)/g, "\u00D7");

    // -1 => minus sign
    s = s.replace(/-(?= ?\.?\d)/g, "\u2212");

    // 1/2, 3/4 etc. => fractions
    if (s.match(/\d\/\d/)) {
        s = s.replace(/(?<!\d)1\/2(?!\d)/g, "\u00BD");
        s = s.replace(/(?<!\d)1\/3(?!\d)/g, "\u2153");
        s = s.replace(/(?<!\d)2\/3(?!\d)/g, "\u2154");
        s = s.replace(/(?<!\d)1\/4(?!\d)/g, "\u00BC");
        s = s.replace(/(?<!\d)3\/4(?!\d)/g, "\u00BE");
        s = s.replace(/(?<!\d)1\/8(?!\d)/g, "\u215B");
        s = s.replace(/(?<!\d)3\/8(?!\d)/g, "\u215C");
        s = s.replace(/(?<!\d)5\/8(?!\d)/g, "\u215D");
        s = s.replace(/(?<!\d)7\/8(?!\d)/g, "\u215E");
    }

    // a.  A => a. A
    s = s.replace(/\. {2}(?! )/g, ". ");

    // non-breaking spaces
    s = s.replace(/(?<=\u00AB|\u2039) | (?=[:;!?]|\u00BB|\u203A)/g, "\u00A0"); // French
    s = s.replace(/(?<=\b[A-Za-z]\.) (?=[A-Za-z]\.)/g, "\u00A0"); // German

    return s;
}

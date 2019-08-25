function getRandomIntInclusive(min, max) {
    min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const randomCite = function () {
    const cite = [
        { author: "Warren Buffet", cites: ["Na giełdzie kapitał płynie od aktywnych do cierpliwych", "Wall Street to miejsce, gdzie ludzie przyjeżdżający limuzynami proszą o rady tych przyjeżdżających metrem",] },
        { author: "dr Alexander Elder", cites: ["Rynek potrafi być dłużej irracjonalny niż inwestor wypłacalny", "Trend is your friend"] },
        { author: "George Soros", cites: ["Zwiększ stawkę gdy jesteś pewny siebie i skaluj w dół swoje pozycje, gdy brakuje Ci przekonania."] },
        { author: `Albert "Longterm" Rokicki`, cites: ['Z inwestorskim pozdrowieniem...'] },
        { author: "Miłosz Kuszczak", cites: ['Problemem większości inwestorów jest fakt iż chcą "grać an giełdzie" zamiast na niej inwestować'] },
        {author: "Benjamin Franklin", cites: ['Inwestycja w wiedzę wypłaca najlepsze odsetki']},
        {author: "Benjamin Graham", cites: ['W krótkim okresie, rynek jest jak jednoręki bandyta, ale w dłuższej perspektywie działa jak waga.']}];

    const citesArray = cite.map(element => [element.author, element.cites]);
    const authorNo = getRandomIntInclusive(0, citesArray.length - 1);
    const exactCite = citesArray[authorNo][1].map(element => element);
    return ({
        author: citesArray[authorNo][0],
        cite: exactCite[getRandomIntInclusive(0, exactCite.length - 1)],
    });
}



export const addSpace = function (number) {
    var rx = /(\d+)(\d{3})/;
    return String(number).replace(/^\d+/, function (w) {
        while (rx.test(w)) {
            w = w.replace(rx, '$1 $2');
        }
        return w;
    });

}


export const toThousand = function (number) {
    return (parseFloat(number) / 1000).toFixed(2);
}



export const capitalFirst = function (paragraph) {
    let firstWord = paragraph[0].split(' ')[0];
    return firstWord.charAt(0).toUpperCase() + paragraph[0].slice(1);
}

/**
 * Highlight Generative Art P5 Utils: V0
 * @version: 0.1.0
 * @description The script provides extra utils that make it easy to
 * use p5 with proper randomness.
 */

const hlP5= (function (hl) {

    function xmur3(str) {
        for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
            (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
                (h = (h << 13) | (h >>> 19));
        return function () {
            (h = Math.imul(h ^ (h >>> 16), 2246822507)),
                (h = Math.imul(h ^ (h >>> 13), 3266489909));
            return (h ^= h >>> 16) >>> 0;
        };
    }

    const seed = xmur3(hl.tx.hash + hl.tx.tokenId);

    const hlP5 = {
        seed: seed,
        initializeRandomness: () => {
            randomSeed(seed());
            noiseSeed(seed());
        },
    }

    return hlP5;
})(hl);


window.$hlP5 = hlP5;
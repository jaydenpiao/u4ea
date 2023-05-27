import React, { useState } from 'react';

const WordCount = () => {
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(null);
    const [wordFrequency, setWordFrequency] = useState([]);

    // for u4ea words
    const [u4eaFrequency, setU4eaFrequency] = useState([]);

    const [stringText, setStringText] = useState('');

    // word library
    const [wordLibrary, setWordLibrary] = useState(['word1', 'word2', 'word3', 'good-one']);

    //const positiveUnity = ['aware', 'alive', 'appreciative', 'apprehensive', 'attentive', 'awake', 'cognizant', 'conscious', 'familiar', 'informed', 'mindful', 'receptive', 'wise', 'acquainted', 'alert', 'appraised', 'apprised', 'au', 'courant', 'cool', 'enlightened', 'go-go', 'groovy', 'grounded', 'heedful', 'hip', 'in', 'the', 'know', 'in', 'the', 'picture', 'into', 'know', 'the', 'score', 'know', 'what's', 'what', 'know-how', 'knowing', 'latched', 'on', 'on', 'the', 'beam', 'on', 'to', 'perceptive', 'plugged', 'in', 'savvy', 'sensible', 'sentient', 'sharp', 'tuned-in', 'up', 'on', 'wise', 'to', 'wised', 'up', 'with', 'it', 'awareness', 'self-aware', 'open-minded', 'approachable', 'impartial', 'observant', 'tolerant', 'acceptant', 'acceptive', 'broad-minded', 'interested', 'open', 'to', 'suggestions', 'perceptive', 'persuadable', 'swayable', 'unbiased', 'understanding', 'open-mindedly', 'open-mindedness', 'spiritual', 'divine', 'metaphysical', 'sacred', 'devotional', 'holy', 'intangible', 'airy', 'asomatous', 'discarnate', 'disembodied', 'ethereal', 'extramundane', 'ghostly', 'immaterial', 'incorporeal', 'nonmaterial', 'nonphysical', 'platonic', 'pure', 'rarefied', 'refined', 'supernal', 'unfleshly', 'unphysical', 'nonspiritual', 'spiritually', 'unspiritual', 'wise', 'astute', 'aware', 'careful', 'educated', 'enlightened', 'experienced', 'informed', 'judicious', 'knowledgeable', 'perceptive', 'prudent', 'rational', 'sagacious', 'sane', 'sensible', 'smart', 'thoughtful', 'wary', 'well-informed', 'contemplative', 'keen', 'knowing', 'sage', 'sensing', 'sharp', 'sound', 'understanding', 'calculating', 'clever', 'cogitative', 'crafty', 'cunning', 'discerning', 'discreet', 'erudite', 'foresighted', 'insightful', 'intuitive', 'perspicacious', 'politic', 'reflective', 'sapient', 'scholarly', 'shrewd', 'sophic', 'tactful', 'taught', 'witty', 'wisely', 'wiser', 'wisest', 'miraculous', 'amazing', 'astonishing', 'astounding', 'awesome', 'extraordinary', 'freakish', 'incredible', 'inexplicable', 'magical', 'marvelous', 'monstrous', 'phenomenal', 'spectacular', 'strange', 'superhuman', 'supernatural', 'unbelievable', 'unreal', 'wondrous', 'anomalous', 'fabulous', 'heavy', 'numinous', 'preternatural', 'prodigious', 'staggering', 'stupefying', 'stupendous', 'superior', 'supermundane', 'supranatural', 'thaumaturgic', 'the', 'utmost', 'unaccountable', 'unearthly', 'unimaginable', 'wonderworking', 'miraculously', 'bliss', 'euphoria', 'happiness', 'joy', 'paradise', 'beatitude', 'blessedness', 'cool', 'felicity', 'gladness', 'heaven', 'rapture', 'empathy', 'affinity', 'appreciation', 'compassion', 'insight', 'pity', 'rapport', 'sympathy', 'warmth', 'communion', 'comprehension', 'concord', 'recognition', 'responsiveness', 'soul', 'being', 'on', 'same', 'wavelength', 'being', 'there', 'for', 'someone', 'community', 'of', 'interests', 'cottoning', 'to', 'good', 'vibrations', 'hitting', 'it', 'off', 'picking', 'up', 'on', 'cleansed', 'blank', 'bright', 'clear', 'elegant', 'fresh', 'graceful', 'hygienic', 'immaculate', 'neat', 'orderly', 'pure', 'simple', 'spotless', 'squeaky', 'clean', 'tidy', 'unblemished', 'washed', 'laundered', 'shining', 'sparkling', 'speckless', 'stainless', 'trim', 'vanilla', 'delicate', 'dirtless', 'faultless', 'flawless', 'neat', 'as', 'a', 'button', 'neat', 'as', 'a', 'pin', 'sanitary', 'snowy', 'spick-and-span', 'taintless', 'unpolluted', 'unsmudged', 'unsoiled', 'unspotted', 'unstained', 'unsullied', 'untarnished', 'well-kept', 'consciousness', 'alertness', 'apprehension', 'awareness', 'recognition', 'sensibility', 'care', 'carefulness', 'cognizance', 'concern', 'heed', 'heedfulness', 'mindfulness', 'realization', 'regard', 'underconsciousness'];
    const negativeUnity = ['cynical', 'contemptuous', 'derisive', 'ironic', 'misanthropic', 'misanthropical', 'mocking', 'pessimistic', 'sarcastic', 'sardonic', 'scoffing', 'scornful', 'skeptical', 'sneering', 'suspicious', 'unbelieving', 'wry', 'cynically', 'materialistic', 'greedy', 'profane', 'secular', 'sensual', 'temporal', 'acquisitive', 'banausic', 'carnal', 'earthly-minded', 'earthy', 'material', 'mundane', 'object-oriented', 'possessive', 'terrestrial', 'unspiritual', 'nonmaterialistic', 'confused', 'baffled', 'befuddled', 'bewildered', 'dazed', 'disorganized', 'distracted', 'muddled', 'perplexed', 'perturbed', 'puzzled', 'abashed', 'addled', 'discombobulated', 'disconcerted', 'flummoxed', 'flustered', 'gone', 'misled', 'nonplussed', 'stumped', 'thrown', 'unscrewed', 'unzipped', 'woolly', 'at a loss', 'at sea', 'at sixes and sevens', 'come apart', 'fouled-up', 'glassy-eyed', 'mixed up', 'not with it', 'out to lunch', 'punch-drunk', 'punchy', 'screwy', 'shook-up', 'shot to pieces', 'slaphappy', 'spaced out', 'taken aback', 'thrown off balance', 'unglued'];


    const positiveIntuition = [];
    const negativeIntuition = [];

    const positiveResolve = [];
    const negativeResolve = [];

    const positiveHarmony = [];
    const negativeHarmony = [];

    const positiveMiracles = [];
    const negativeMiracles = [];

    const positiveCleanse = [];
    const negativeCleanse = [];

    const positiveLiberate = [];
    const negativeLiberate = [];

    const countWords = () => {
        const cleanedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}?"=\_`~()]/g, '');
        const words = cleanedText.split(/\s+/).filter(Boolean);

        // converting u4ea words to string array form
        const stringWords = words.map(word => `'${word}'`);
        setStringText(stringWords.join(', '));

        setWordCount(words.length);

        let frequency = {};
        for (let word of words) {
            if (frequency[word]) {
                frequency[word]++;
            } else {
                frequency[word] = 1;
            }
        }

        const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
        const filteredFrequency = sortedFrequency.filter(([word, count]) => wordLibrary.includes(word));
        setWordFrequency(sortedFrequency);
        setU4eaFrequency(filteredFrequency);
    };

    return (
        <div>
            <textarea rows="10" cols="50" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text here..."></textarea>
            <button onClick={countWords}>Count Words</button>
            <div>Total Words: {wordCount}</div>
            <div id={"words"}>
                {wordFrequency.map(([word, count]) => (
                    <p key={word}>{word}: {count}</p>
                ))}
            </div>
            <div id={"u4ea"}>
                {u4eaFrequency.map(([word, count]) => (
                    <p key={word}>{word}: {count}</p>
                ))}
            </div>
            <div id={"array"}>
                [{stringText}];
            </div>
        </div>
    );
};

export default WordCount;

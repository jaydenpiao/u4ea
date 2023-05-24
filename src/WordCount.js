import React, { useState } from 'react';

const WordCount = () => {
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(null);
    const [wordFrequency, setWordFrequency] = useState([]);

    const countWords = () => {
        const cleanedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
        const words = cleanedText.split(/\s+/).filter(Boolean);

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
        setWordFrequency(sortedFrequency);
    };

    return (
        <div>
            <textarea rows="10" cols="50" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text here..."></textarea>
            <button onClick={countWords}>Count Words</button>
            <div>Total Words: {wordCount}</div>
            <div>
                {wordFrequency.map(([word, count]) => (
                    <p key={word}>{word}: {count}</p>
                ))}
            </div>
        </div>
    );
};

export default WordCount;

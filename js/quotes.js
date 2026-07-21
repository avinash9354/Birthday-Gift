/**
 * 🎂 Aradhana Birthday Website - 50 Romantic Love Quotes Dataset & Generator
 * Guarantees zero continuous repetition and smooth fade transitions
 */

const ROMANTIC_QUOTES_DATA = [
    { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
    { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou" },
    { text: "If I know what love is, it is because of you, Aradhana.", author: "Hermann Hesse" },
    { text: "You are every reason, every hope, and every dream I've ever had.", author: "Nicholas Sparks" },
    { text: "My soul and your soul are forever tangled in a breathtaking dance of starlight.", author: "N.R. Hart" },
    { text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.", author: "Leo Christopher" },
    { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.", author: "F. Scott Fitzgerald" },
    { text: "I look at you and see the rest of my life right before my eyes.", author: "Unknown" },
    { text: "To the world you may be one person, but to me you are the entire world.", author: "Bill Wilson" },
    { text: "I wish I could turn back the clock so I could find you sooner and love you longer.", author: "Unknown" },
    { text: "You are the poem I never knew how to write, and this life is the story I always wanted to tell.", author: "Tyler Knott Gregson" },
    { text: "When I look into your eyes, I know I have found the mirror to my soul.", author: "Joey Watts" },
    { text: "You have bewitched me body and soul, and I love, I love, I love you.", author: "Jane Austen" },
    { text: "Thinking of you keeps me awake. Dreaming of you keeps me asleep. Being with you keeps me alive.", author: "Unknown" },
    { text: "Because of you, my world is now whole, my heart is full, and my soul is at peace.", author: "Unknown" },
    { text: "Yours is the light by which my spirit's born: you are my sun, my moon, and all my stars.", author: "E.E. Cummings" },
    { text: "I fell in love with your smile, but I stayed in love with your beautiful heart.", author: "Unknown" },
    { text: "You are my today and all of my tomorrows, Aradhana.", author: "Leo Christopher" },
    { text: "Everything I have ever done has led me straight to your loving embrace.", author: "Unknown" },
    { text: "I would rather spend one lifetime with you than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
    { text: "Love is when the other person's happiness is more important than your own.", author: "H. Jackson Brown, Jr." },
    { text: "You make my heart smile in a way that nothing else in this universe can.", author: "Unknown" },
    { text: "No matter where I went, I always knew my way back to you. You are my compass star.", author: "Diana Peterfreund" },
    { text: "I chose you then, I choose you now, and I will keep choosing you without a pause, in a heartbeat, for eternity.", author: "Unknown" },
    { text: "Your love shines through my heart as the sun shines upon the earth.", author: "Eleanor Diillo" },
    { text: "Every morning when I wake up, my first grateful thought is that you exist.", author: "Unknown" },
    { text: "It was love at first sight, at last sight, at ever and ever sight.", author: "Vladimir Nabokov" },
    { text: "If you remember me, then I don't care if everyone else forgets.", author: "Haruki Murakami" },
    { text: "I found my home inside your heartbeat and my sanctuary inside your arms.", author: "Unknown" },
    { text: "Together with you is my absolute favorite place to be.", author: "Unknown" },
    { text: "Your voice is my favorite symphony, and your laughter is my favorite celebration.", author: "Unknown" },
    { text: "Whenever you touch me, my entire universe aligns in perfect harmony.", author: "Unknown" },
    { text: "There is no remedy for love but to love more deeply.", author: "Henry David Thoreau" },
    { text: "You are the magic that makes every ordinary morning feel like a miracle.", author: "Unknown" },
    { text: "True love is eternal, infinite, and always like itself.", author: "Honoré de Balzac" },
    { text: "I love you as certain dark things are to be loved, in secret, between the shadow and the soul.", author: "Pablo Neruda" },
    { text: "My heart is and always will be yours, Aradhana.", author: "Jane Austen" },
    { text: "You are the answer to every prayer I have ever offered to the cosmos.", author: "Nicholas Sparks" },
    { text: "I want to hold your hand when we are eighty and say, 'We made it through everything together.'", author: "Unknown" },
    { text: "Being deeply loved by you gives me strength, while loving you deeply gives me courage.", author: "Lao Tzu" },
    { text: "You are my paradise, and I would happily get stranded on you for a million lifetimes.", author: "Unknown" },
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
    { text: "Every love story is beautiful, but ours is my favorite fairy tale come true.", author: "Unknown" },
    { text: "You are my anchor in rough seas and my sails in the open ocean.", author: "Unknown" },
    { text: "In your smile, I see something more beautiful than the brightest aurora borealis.", author: "Unknown" },
    { text: "And suddenly all the love songs were about you, my sweet Aradhana.", author: "Unknown" },
    { text: "You are the missing piece of the puzzle I have been searching for my entire existence.", author: "Unknown" },
    { text: "Love is the bridge between two hearts, and ours is built of unbreakable pure gold.", author: "Unknown" },
    { text: "Thank you for walking into my life and turning it into a masterpiece of love.", author: "Unknown" },
    { text: "May your birthday today be half as breathtaking and exquisite as your soul.", author: "Your Eternal Love" }
];

class RomanticQuotesManager {
    constructor() {
        this.quoteEl = document.getElementById('quote-text');
        this.authorEl = document.getElementById('quote-author');
        this.btnEl = document.getElementById('next-quote-btn');
        this.lastIndex = -1;

        this.init();
    }

    init() {
        if (!this.quoteEl || !this.btnEl) return;

        this.btnEl.addEventListener('click', () => {
            if (window.audioEngine) window.audioEngine.playBtnSound();
            this.showNextRandomQuote();
        });

        // Show initial random quote
        this.showNextRandomQuote(false);
    }

    showNextRandomQuote(animate = true) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * ROMANTIC_QUOTES_DATA.length);
        } while (randomIndex === this.lastIndex && ROMANTIC_QUOTES_DATA.length > 1);

        this.lastIndex = randomIndex;
        const selectedQuote = ROMANTIC_QUOTES_DATA[randomIndex];

        if (!animate) {
            this.quoteEl.textContent = `"${selectedQuote.text}"`;
            this.authorEl.textContent = `— ${selectedQuote.author}`;
            return;
        }

        // Smooth fade out & fade in
        this.quoteEl.style.opacity = '0';
        this.authorEl.style.opacity = '0';
        this.quoteEl.style.transform = 'translateY(-10px)';
        this.authorEl.style.transform = 'translateY(-10px)';
        this.quoteEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.authorEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(() => {
            this.quoteEl.textContent = `"${selectedQuote.text}"`;
            this.authorEl.textContent = `— ${selectedQuote.author}`;

            this.quoteEl.style.opacity = '1';
            this.authorEl.style.opacity = '1';
            this.quoteEl.style.transform = 'translateY(0px)';
            this.authorEl.style.transform = 'translateY(0px)';
        }, 320);
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.quotesManager = new RomanticQuotesManager();
});

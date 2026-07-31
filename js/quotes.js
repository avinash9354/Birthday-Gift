/**
 * 🎂 Roshu Birthday Website - 50 Beautiful Birthday Blessings & Quotes Dataset & Generator
 * Guarantees zero continuous repetition and smooth fade transitions
 */

const ROMANTIC_QUOTES_DATA = [
    { text: "May your life be filled with joy, peace, and endless blessings every single day.", author: "Birthday Blessings" },
    { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon" },
    { text: "The more you praise and celebrate your life, the more there is in life to celebrate.", author: "Oprah Winfrey" },
    { text: "Every year on your birthday, you get a chance to start new and achieve new dreams.", author: "Sammy Hagar" },
    { text: "Your smile brightens the world and your kindness inspires everyone who knows you.", author: "Family Wishes" },
    { text: "May all the joy you have spread in the past come back to bless you on this wonderful day.", author: "Birthday Blessings" },
    { text: "Life is a gorgeous canvas—paint every day with bright colors of happiness and laughter.", author: "Inspiration" },
    { text: "May your birthday be surrounded with happiness, filled with laughter, and wrapped in warmth.", author: "Best Wishes" },
    { text: "Never stop dreaming, never stop growing, and never stop shining your extraordinary light.", author: "Inspiration" },
    { text: "You bring so much cheer and positive energy to your family and friends every day.", author: "Family Wishes" },
    { text: "May the year ahead bring you success, good health, and wonderful new adventures.", author: "Birthday Blessings" },
    { text: "A birthday is not just another year older, but another year wiser, stronger, and more wonderful.", author: "Wisdom" },
    { text: "May every moment of your birthday be filled with the same joy you bring to others.", author: "Best Wishes" },
    { text: "Your genuine heart and caring spirit make you one of the most cherished people in the world.", author: "Family Wishes" },
    { text: "Shine on, beautiful soul! The universe has incredible things planned for your future.", author: "Inspiration" },
    { text: "May your birthday mark the beginning of a year full of grand accomplishments and happiness.", author: "Birthday Blessings" },
    { text: "Happiness is not something ready-made; it comes from your own actions and kind heart.", author: "Dalai Lama" },
    { text: "Keep moving forward with grace, confidence, and the unwavering support of those who care for you.", author: "Inspiration" },
    { text: "May today be the start of a wonderful journey that leads you to your highest goals.", author: "Best Wishes" },
    { text: "You are a living proof that kindness, dedication, and grace can make the world a better place.", author: "Family Wishes" },
    { text: "Let your smile change the world, but never let the world change your beautiful smile.", author: "Inspiration" },
    { text: "May God shower you with abundant health, prosperity, and peace on your birthday.", author: "Divine Blessings" },
    { text: "You have a remarkable way of making every occasion feel special and full of cheer.", author: "Family Wishes" },
    { text: "Celebrate all that you are today and all the amazing things you will accomplish tomorrow.", author: "Inspiration" },
    { text: "May your path be always illuminated by hope, wisdom, and the love of your family.", author: "Birthday Blessings" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "May your heart always remain as pure and vibrant as the freshest morning bloom.", author: "Best Wishes" },
    { text: "With every passing year, your grace and wisdom continue to inspire us all.", author: "Family Wishes" },
    { text: "May the memories of today warm your heart and bring a smile to your face all year long.", author: "Birthday Blessings" },
    { text: "You don't need magic to be special; your authentic goodness is the greatest magic of all.", author: "Inspiration" },
    { text: "May success follow your steps wherever you go, and peace reside wherever you stay.", author: "Best Wishes" },
    { text: "Every day is a gift, and watching you thrive is one of the greatest gifts to your family.", author: "Family Wishes" },
    { text: "May your birthday be just the beginning of a year filled with happy memories and wonderful surprises.", author: "Birthday Blessings" },
    { text: "Do what makes your soul happy, and never lose the wonder in your bright eyes.", author: "Inspiration" },
    { text: "May your life always be blessed with good health, loyal friends, and endless joy.", author: "Best Wishes" },
    { text: "You are destined for greatness because you do everything with hard work and sincerity.", author: "Inspiration" },
    { text: "May your inner peace be unshakable and your happiness be boundless today and always.", author: "Divine Blessings" },
    { text: "Thank you for bringing so much positivity and warmth to all our lives.", author: "Family Wishes" },
    { text: "May the upcoming year exceed all your expectations and fulfill your grandest aspirations.", author: "Birthday Blessings" },
    { text: "Be proud of who you are, what you have learned, and all that you have achieved.", author: "Inspiration" },
    { text: "May every morning bring new hope, and every evening bring relaxing peace to your heart.", author: "Best Wishes" },
    { text: "Your generosity and warmth create a ripple effect of happiness everywhere you go.", author: "Family Wishes" },
    { text: "May you always find joy in the simple moments and triumph in the big endeavors.", author: "Birthday Blessings" },
    { text: "You are a treasure to your family and friends—cherished today and every single day.", author: "Family Wishes" },
    { text: "May the stars guide you to new heights of success and unending personal fulfillment.", author: "Inspiration" },
    { text: "Live life with passion, lead with kindness, and celebrate every moment with joy.", author: "Best Wishes" },
    { text: "May the candles on your cake burn brightly with hopes that come true in the year ahead.", author: "Birthday Blessings" },
    { text: "You have an extraordinary spirit that touches everyone lucky enough to know you.", author: "Family Wishes" },
    { text: "Here is to another year of laughing together, celebrating big milestones, and making great memories.", author: "Best Wishes" },
    { text: "May your 2026 birthday be as wonderful, vibrant, and special as you truly are, Roshu!", author: "Family & Friends" }
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

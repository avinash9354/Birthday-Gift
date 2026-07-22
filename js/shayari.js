/**
 * 🎂 Aradhana Birthday Website - 25 Hindi Romantic Shayari & 30 Positive Thoughts Manager
 * Features interactive typing animations and smooth slide transitions
 */

const HINDI_SHAYARI_DATA = [
    "तेरी मुस्कान से रोशन रहे यह दुनिया सारी,\nखुशियों से सजी रहे तेरी हर एक सुबह और शाम प्यारी।\nजन्मदिन की अनंत शुभकामनाएं आराधना,\nसदा हंसती रहे तू, यही है दुआ हमारी। ✨",
    "खुदा ने तुझे बड़े प्यार से तराशा होगा,\nतेरे व्यक्तित्व में सितारों का नूर बांटा होगा।\nआज तेरे जन्मदिन पर सारा जहाँ मुस्कुराया है,\nकि ज़मीन पर एक अनमोल सितारा उतरा होगा। 🌟",
    "तेरे होने से ही घर-परिवार में खुशियों का मेला है,\nतेरी सादगी और अच्छाई ने सबका दिल जीता है।\nजन्मदिन की अनंत बधाइयाँ प्यारी आराधना! 🎉",
    "दुआओं में हम सदा तुम्हारी खुशी मांगते हैं,\nतुम्हारे होठों पर हमेशा मुस्कान की लड़ी मांगते हैं।\nतुम जियो हज़ारों साल, हर साल हो बेमिसाल,\nहम खुदा से बस यही एक घड़ी मांगते हैं। 🌸",
    "हवाओं ने भी आज तेरे नाम का गीत गाया है,\nसितारों ने आज आसमान में जश्न मनाया है।\nमुबारक हो तुम्हें यह खूबसूरत जन्मदिन,\nजो हम सबके जीवन में खुशियों की बहार लाया है। 🎂",
    "तेरी हर कदम पर कामयाबी का पहरा हो,\nतेरे चेहरे पर सदा खुशियों का सेहरा हो।\nजन्मदिन की ढेर सारी शुभकामनाएं आराधना! ✨",
    "जब से तुम इस दुनिया में आई हो,\nहर सुबह ने एक नई रोशनी पाई है।\nसदा महकती रहो तुम यूँ ही गुलाब की तरह,\nहम सबके दिल से यही दुआ आई है। 🌹",
    "तुम्हारी सोच और विचार हैं इतने सुंदर,\nजैसे खुशियों से भरा कोई गहरा समंदर।\nजन्मदिन मुबारक हो प्यारी आराधना! 👑",
    "फूलों सा महकता रहे तुम्हारा हर सवेरा,\nसितारों सा चमकता रहे जीवन का हर डेरा।\nहैप्पी बर्थडे आराधना! 🎉",
    "तुम हमारे परिवार का वह अनमोल गौरव हो,\nजिसके होने से हर तरफ खुशियों का उत्सव हो। 🌸",
    "तेरे चेहरे की मुस्कान कभी कम ना हो,\nतेरी आँखों में कभी कोई नम ना हो।\nजन्मदिन की लाख-लाख बधाइयाँ आराधना! 💖",
    "हर लम्हा खुशियों से भरा और सुहाना सा लगे,\nतुम्हारा हर एक बड़ा सपना पूरा सा लगे।\nहैप्पी बर्थडे आराधना! 💫",
    "खुशियों का हर खजाना तुम्हारे कदमों में हो,\nदुनिया की हर कामयाबी तुम्हारे हक़ में हो।\nमुबारक हो तुम्हें यह जन्मदिन का प्यारा दिन! 🎂",
    "तुम्हारी अच्छाई और मेहनत का हर कोई कायल है,\nतुम्हारी सादगी से हर एक दिल घायल है।\nजन्मदिन की हार्दिक शुभकामनाएं! 🌺",
    "तेरी हँसी हम सबकी सबसे बड़ी दौलत है,\nतेरी खुशी ही हम सबके लिए सबसे बड़ी जन्नत है। 🌹",
    "आसमान के सारे सितारे भी चमकते रहें तेरे आगे,\nसफलता के सारे रंग जुड़े रहें तेरे धागे। ✨",
    "तेरी बातों में जो सुकून और सच्चाई है,\nउसी ने तुझे सबसे अलग पहचान दिलाई है। 💖",
    "जन्मदिन का यह पावन दिन बार-बार आए,\nतेरे जीवन में खुशियों की अनंत बहार लाए। 🎉",
    "जब भी देखते हैं तुम्हें, गर्व और बढ़ जाता है,\nयह मन तुम्हारी काबिलियत पर खुश हो जाता है। 😊",
    "हमारी हर दुआ का खूबसूरत लफ्ज़ हो तुम,\nइस परिवार की सबसे हसीन नज़्म हो तुम। 💐",
    "खुदा करे तुम्हारी हर तमन्ना पूरी हो जाए,\nकोई भी अच्छी ख्वाहिश कभी ना अधूरी रह जाए। 🌠",
    "तुम इस जीवन बगिया का वह खूबसूरत फूल हो,\nजिससे महक रहा हमारा हर एक उसूल हो। 🌸",
    "तेरी एक मुस्कान से सबका दिन बन जाता है,\nतेरी सफलता से हर किसी का सिर गर्व से उठ जाता है। ✨",
    "कामयाबी की हर मंजिल पर तुम्हारा नाम हो,\nतुम्हारे हर कदम पर दुनिया का सलाम हो। हैप्पी बर्थडे आराधना! 👑",
    "तेरे नाम से ही हम सबके जीवन में सवेरा है,\nखुदा करे तेरे जीवन में खुशियों का ही बसेरा है। जन्मदिन मुबारक आराधना! 🎉"
];

const POSITIVE_THOUGHTS_DATA = [
    "Believe in the extraordinary magic inside you, Aradhana. The universe conspired to make you extraordinary.",
    "Your kindness creates ripples of joy that touch everyone fortunate enough to cross your path.",
    "Every day is a fresh blank canvas, and your beautiful heart is the brush that paints it with joy.",
    "You possess an inner strength and grace that can overcome any storm with a smile.",
    "Never underestimate the light you bring into this world simply by being unapologetically yourself.",
    "Your dreams are valid, powerful, and destined to materialize into wonderful reality.",
    "Shine bright like the diamond you are. Your potential has absolutely no boundaries.",
    "The world is a much kinder, warmer, and more vibrant place because Aradhana is in it.",
    "Every step you take forward is a step closer to your grandest aspirations and desires.",
    "Your heart is a sanctuary of pure kindness, and that purity attracts infinite blessings to you.",
    "Embrace the magic of today. You are cherished deeply by all your family and friends.",
    "You have the power to create happiness wherever you go, just by sharing your genuine laugh.",
    "No matter how big the goal, your dedication and intelligence will always guide you to victory.",
    "Let go of any doubts, because your spirit is unbreakable and truly magnificent.",
    "You are worthy of every single piece of happiness, prosperity, and peace this life offers.",
    "Like a rare pearl formed in the depths of the ocean, your beauty and character are truly priceless.",
    "Keep shining your authentic light. Your family and friends will always stand by your side.",
    "Your presence alone turns ordinary moments into cherished lifelong memories.",
    "Today celebrates not just your birth, but the boundless kindness and warmth you give freely every day.",
    "Radiate confidence and joy, because you are a queen whose grace inspires everyone.",
    "Trust the journey of your life. The best chapters of your story are just beginning to unfold.",
    "Your smile is a beacon of hope that brightens even the darkest of rooms.",
    "May your heart always remain as pure, gentle, and radiant as an aurora sky.",
    "You are capable of achieving miracles because you do everything with passion and heart.",
    "Cherish who you are today, while eagerly welcoming the amazing person you are evolving into.",
    "Your soul vibrates with positivity and harmony, attracting endless miracles to your doorstep.",
    "Every new year of your life adds another layer of wisdom, elegance, and pure enchantment.",
    "You don't need magic to be special; your authentic soul is the greatest magic of all.",
    "May your thoughts always be peaceful, your heart joyful, and your path illuminated with blessings.",
    "Aradhana, you are a living, breathing masterpiece of pure joy and happiness."
];

class ShayariAndThoughtsController {
    constructor() {
        this.shayariIndex = 0;
        this.thoughtIndex = 0;
        
        // DOM elements
        this.shayariEl = document.getElementById('shayari-text');
        this.shayariCounterEl = document.getElementById('shayari-counter');
        this.prevShayariBtn = document.getElementById('prev-shayari-btn');
        this.nextShayariBtn = document.getElementById('next-shayari-btn');

        this.thoughtEl = document.getElementById('thought-text');
        this.thoughtCounterEl = document.getElementById('thought-counter');
        this.nextThoughtBtn = document.getElementById('next-thought-btn');

        this.typingLetterEl = document.getElementById('typing-letter');
        this.letterText = `Dearest Aradhana,\n\nOn this wonderful day of July 22nd, 2026, we celebrate the birthday of a truly extraordinary and kind-hearted person. From the warmth of your smile to the positive energy you bring wherever you go, you are a blessing to your family, friends, and everyone lucky enough to know you.\n\nYou have a heart full of compassion, a mind full of brilliant ideas, and a spirit that inspires those around you. Your dedication, grace, and cheerfulness make every celebration brighter and every challenge easier to overcome.\n\nAs you step into another glorious year of life, we wish you boundless happiness, great health, and ultimate success in all your endeavors. May every dream you hold dear turn into reality, and may you continue to shine with confident grace.\n\nHappy Birthday, Aradhana! May your special day and the entire year ahead be filled with wonderful memories and joyous moments shared with your loved ones. ✨🎉`;
        this.isTypingLetter = false;

        this.init();
    }

    init() {
        if (this.nextShayariBtn) {
            this.nextShayariBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                this.shayariIndex = (this.shayariIndex + 1) % HINDI_SHAYARI_DATA.length;
                this.renderShayari();
            });
        }

        if (this.prevShayariBtn) {
            this.prevShayariBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                this.shayariIndex = (this.shayariIndex - 1 + HINDI_SHAYARI_DATA.length) % HINDI_SHAYARI_DATA.length;
                this.renderShayari();
            });
        }

        if (this.nextThoughtBtn) {
            this.nextThoughtBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                this.thoughtIndex = (this.thoughtIndex + 1) % POSITIVE_THOUGHTS_DATA.length;
                this.renderThought();
            });
        }

        // Render initial content
        this.renderShayari(false);
        this.renderThought(false);

        // Setup Letter Typing trigger when tab is clicked or unlocked
        this.setupLetterTypingTriggers();
    }

    renderShayari(animate = true) {
        if (!this.shayariEl || !this.shayariCounterEl) return;

        const currentShayari = HINDI_SHAYARI_DATA[this.shayariIndex];
        this.shayariCounterEl.textContent = `${this.shayariIndex + 1} / ${HINDI_SHAYARI_DATA.length}`;

        if (!animate) {
            this.shayariEl.innerHTML = currentShayari.replace(/\n/g, '<br>');
            return;
        }

        this.shayariEl.style.opacity = '0';
        this.shayariEl.style.transform = 'scale(0.96)';
        this.shayariEl.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            this.shayariEl.innerHTML = currentShayari.replace(/\n/g, '<br>');
            this.shayariEl.style.opacity = '1';
            this.shayariEl.style.transform = 'scale(1)';
        }, 300);
    }

    renderThought(animate = true) {
        if (!this.thoughtEl || !this.thoughtCounterEl) return;

        const currentThought = POSITIVE_THOUGHTS_DATA[this.thoughtIndex];
        this.thoughtCounterEl.textContent = `${this.thoughtIndex + 1} / ${POSITIVE_THOUGHTS_DATA.length}`;

        if (!animate) {
            this.thoughtEl.textContent = `"${currentThought}"`;
            return;
        }

        this.thoughtEl.style.opacity = '0';
        this.thoughtEl.style.transform = 'translateY(8px)';
        this.thoughtEl.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            this.thoughtEl.textContent = `"${currentThought}"`;
            this.thoughtEl.style.opacity = '1';
            this.thoughtEl.style.transform = 'translateY(0px)';
        }, 300);
    }

    setupLetterTypingTriggers() {
        const unlockLetterBtn = document.getElementById('unlock-letter-btn');
        const instantUnlockBtn = document.getElementById('instant-unlock-btn');

        const triggerTyping = () => {
            const letterLock = document.getElementById('letter-lock');
            const letterContent = document.getElementById('letter-content');
            if (letterLock) letterLock.classList.add('hidden');
            if (letterContent) {
                letterContent.classList.remove('hidden');
                letterContent.classList.add('bounce-in');
            }
            if (window.audioEngine) window.audioEngine.playGiftSound();
            this.startLetterTyping();
        };

        if (unlockLetterBtn) unlockLetterBtn.addEventListener('click', triggerTyping);
        if (instantUnlockBtn) instantUnlockBtn.addEventListener('click', triggerTyping);

        // Also trigger if navigating directly or clicking letter tab
        const letterTabs = document.querySelectorAll('.letter-tab');
        letterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                if (window.audioEngine) window.audioEngine.playBtnSound();
                letterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const tabTarget = tab.getAttribute('data-tab');
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                const pane = document.getElementById(tabTarget);
                if (pane) pane.classList.add('active');

                if (tabTarget === 'tab-letter' && !this.isTypingLetter && this.typingLetterEl && this.typingLetterEl.textContent.trim() === '') {
                    this.startLetterTyping();
                }
            });
        });

        // Diary flip page action
        const diaryFlipBtn = document.getElementById('diary-flip-btn');
        const diaryContent = document.getElementById('diary-page-content');
        const diaryEntries = [
            { title: "Diary Entry #1: The Smile That Changed My World", text: '"Whenever you smile, Aradhana, the entire room lights up. It is as if the stars decided to reside in your eyes. Today on your birthday, I reaffirm my promise to cherish every heartbeat we share."' },
            { title: "Diary Entry #2: The Magic of Your Voice", text: '"Listening to you speak brings a profound serenity to my spirit. Whether we are discussing grand future dreams or sharing quiet moments, every second with you is precious golden treasure."' },
            { title: "Diary Entry #3: My Eternal Gratitude", text: '"I thank destiny every single day for bringing you into my life. You make me a better person simply by loving me. Happy Birthday, my angel!"' }
        ];
        let diaryIndex = 0;

        if (diaryFlipBtn && diaryContent) {
            diaryFlipBtn.addEventListener('click', () => {
                if (window.audioEngine) window.audioEngine.playCardSound();
                diaryIndex = (diaryIndex + 1) % diaryEntries.length;
                diaryContent.style.opacity = '0';
                diaryContent.style.transform = 'rotateY(90deg)';
                diaryContent.style.transition = 'all 0.3s ease';

                setTimeout(() => {
                    diaryContent.innerHTML = `<h4>${diaryEntries[diaryIndex].title}</h4><p>${diaryEntries[diaryIndex].text}</p>`;
                    diaryContent.style.opacity = '1';
                    diaryContent.style.transform = 'rotateY(0deg)';
                }, 300);
            });
        }
    }

    startLetterTyping() {
        if (!this.typingLetterEl || this.isTypingLetter) return;
        this.isTypingLetter = true;
        this.typingLetterEl.textContent = '';
        
        let charIndex = 0;
        const speed = 25; // ms per character

        const typeChar = () => {
            if (charIndex < this.letterText.length) {
                this.typingLetterEl.textContent += this.letterText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, speed);
            } else {
                this.isTypingLetter = false;
            }
        };

        typeChar();
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.shayariController = new ShayariAndThoughtsController();
});

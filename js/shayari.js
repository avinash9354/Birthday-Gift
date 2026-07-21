/**
 * 🎂 Aradhana Birthday Website - 25 Hindi Romantic Shayari & 30 Positive Thoughts Manager
 * Features interactive typing animations and smooth slide transitions
 */

const HINDI_SHAYARI_DATA = [
    "तेरी मुस्कान से रोशन है मेरी दुनिया सारी,\nतुझसे ही सजी है मेरी हर एक शाम प्यारी।\nजन्मदिन मुबारक हो मेरी जान, मेरी आराधना,\nतू ही मेरी दुआ, तू ही मेरी हसरत करारी। ❤️",
    "खुदा ने तुझे बड़े प्यार से तराशा होगा,\nतेरे हुस्न में सितारों का नूर बांटा होगा।\nआज तेरे जन्मदिन पर खुदा भी मुस्कुराया होगा,\nकि जमीं पर एक चाँद उसने उतारा होगा। 🌙",
    "तेरे होने से ही मेरी ज़िन्दगी में खुशियों का मेला है,\nतेरे बिना यह दिल लाख भीड़ में भी अकेला है।\nजन्मदिन की अनंत बधाइयाँ मेरी आराधना! 💕",
    "दुआओं में हम सिर्फ तुम्हारी खुशी मांगते हैं,\nतुम्हारे होठों पर सदा मुस्कान की लड़ी मांगते हैं।\nतुम जिओ हज़ारों साल मेरी जान,\nहम खुदा से बस यही एक घड़ी मांगते हैं। 🌸",
    "हवाओं ने भी आज तेरे नाम का गीत गाया है,\nसितारों ने आज आसमान में जश्न मनाया है।\nमुबारक हो तुम्हें यह खूबसूरत जन्मदिन,\nजो मेरी ज़िन्दगी में बहार लेकर आया है। ✨",
    "तेरी धड़कन से जुड़ा है मेरे दिल का हर तार,\nतुझसे ही शुरू और तुझ पर ही खत्म मेरा प्यार।\nजन्मदिन की ढेर सारी शुभकामनाएं मेरी आराधना! 💖",
    "जब से तुम मेरी ज़िन्दगी में आई हो,\nहर सुबह ने नई रोशनी पाई है।\nसदा हंसती रहो तुम यूँ ही गुलाब की तरह,\nतुम्हारे लिए खुदा से यही दुआ आई है। 🌹",
    "तुम्हारी आँखें जैसे कोई खूबसूरत समंदर,\nजिसमें डूब जाने का दिल करता है हर पल।\nजन्मदिन मुबारक हो मेरे ख्वाबों की मल्लिका! 👑",
    "फूलो सा महकता रहे तुम्हारा हर सवेरा,\nसितारों सा चमकता रहे जीवन का हर डेरा।\nहैप्पी बर्थडे मेरी प्यारी आराधना! 🎉",
    "तुम मेरे दिल की वह खूबसूरत कविता हो,\nजिसे मैं हर रोज़ नई मोहब्बत से पढ़ता हूँ। 💌",
    "तेरे चेहरे की मासूमियत पर यह दिल हार बैठे,\nहम तो तेरे प्यार में खुद को ही वार बैठे।\nजन्मदिन की लाख-लाख बधाइयाँ मेरी जान! 💕",
    "हर लम्हा तुम्हारे बिना अधूरा सा लगता है,\nतुम्हारे साथ हर एक ख्वाब पूरा सा लगता है।\nहैप्पी बर्थडे मेरी सोलमेट आराधना! 💫",
    "खुशियों का हर खजाना तुम्हारे कदमों में हो,\nदुनिया की हर कामयाबी तुम्हारे हक़ में हो।\nमुबारक हो तुम्हें यह जन्मदिन का प्यारा दिन! 🎂",
    "तुमसे मोहब्बत है, यह दिल बार-बार कहता है,\nमेरी साँसों में सिर्फ तेरा ही नाम रहता है। ❤️",
    "तेरी हँसी मेरी सबसे बड़ी दौलत है,\nतू ही मेरी चाहत और तू ही मेरी जन्नत है। 🌺",
    "आसमान के सारे सितारे भी फीके हैं तेरे आगे,\nमेरी ज़िन्दगी के सारे रंग जुड़े हैं तेरे धागे। ✨",
    "तेरी आवाज़ में जो सुकून है, वो कहीं और नहीं,\nतेरे सिवा मेरे दिल का कोई और ठौर नहीं। 💖",
    "जन्मदिन का यह पावन दिन बार-बार आए,\nतेरे जीवन में खुशियों की बहार लाए। 🌹",
    "जब भी देखता हूँ तुम्हें, प्यार और बढ़ जाता है,\nयह दिल तुम्हारी सादगी पर फ़िदा हो जाता है। 😊",
    "मेरी हर दुआ का पहला और आखिरी लफ्ज़ हो तुम,\nमेरी धड़कन का सबसे हसीन नज़्म हो तुम। 💌",
    "खुदा करे तुम्हारी हर तमन्ना पूरी हो जाए,\nकोई भी ख्वाहिश कभी ना अधूरी रह जाए। 🌠",
    "तुम मेरी ज़िन्दगी का वह खूबसूरत गुलाब हो,\nजिसकी महक से रोशन मेरा हर ख्वाब हो। 🌸",
    "तेरी एक झलक पाने को यह दिल बेकरार रहता है,\nमुझे हर जन्म में सिर्फ तेरा ही इंतज़ार रहता है। 💕",
    "मोहब्बत की हर हद से आगे बढ़कर चाहूँगा तुम्हें,\nहर जन्म में अपना बनाकर लाऊँगा तुम्हें। हैप्पी बर्थडे आराधना! ❤️",
    "तेरे नाम से ही मेरी ज़िन्दगी में सवेरा है,\nतू नहीं तो इस जहान में सिर्फ अंधेरा है। जन्मदिन मुबारक मेरी जान! 👑"
];

const POSITIVE_THOUGHTS_DATA = [
    "Believe in the extraordinary magic inside you, Aradhana. The universe conspired to make you extraordinary.",
    "Your kindness creates ripples of joy that touch everyone fortunate enough to cross your path.",
    "Every day is a fresh blank canvas, and your beautiful heart is the brush that paints it with love.",
    "You possess an inner strength and grace that can overcome any storm with a smile.",
    "Never underestimate the light you bring into this world simply by being unapologetically yourself.",
    "Your dreams are valid, powerful, and destined to materialize into wonderful reality.",
    "Shine bright like the diamond you are. Your potential has absolutely no boundaries.",
    "The world is a much kinder, warmer, and more vibrant place because Aradhana is in it.",
    "Every step you take forward is a step closer to your grandest aspirations and desires.",
    "Your heart is a sanctuary of pure love, and that purity attracts infinite blessings to you.",
    "Embrace the magic of today. You are cherished deeply by the stars and by me.",
    "You have the power to create happiness wherever you go, just by sharing your genuine laugh.",
    "No matter how big the goal, your dedication and intelligence will always guide you to victory.",
    "Let go of any doubts, because your spirit is unbreakable and truly magnificent.",
    "You are worthy of every single piece of happiness, prosperity, and peace this life offers.",
    "Like a rare pearl formed in the depths of the ocean, your beauty and character are truly priceless.",
    "Keep shining your authentic light. Those who love you will always stand by your side.",
    "Your presence alone turns ordinary moments into cherished lifelong memories.",
    "Today celebrates not just your birth, but the boundless love and warmth you give freely every day.",
    "Radiate confidence and joy, because you are a queen whose grace inspires everyone.",
    "Trust the journey of your life. The best chapters of your story are just beginning to unfold.",
    "Your smile is a beacon of hope that brightens even the darkest of rooms.",
    "May your heart always remain as pure, gentle, and radiant as an aurora sky.",
    "You are capable of achieving miracles because you do everything with passion and heart.",
    "Cherish who you are today, while eagerly welcoming the amazing person you are evolving into.",
    "Your soul vibrates with love and harmony, attracting endless miracles to your doorstep.",
    "Every new year of your life adds another layer of wisdom, elegance, and pure enchantment.",
    "You don't need magic to be special; your authentic soul is the greatest magic of all.",
    "May your thoughts always be peaceful, your heart joyful, and your path illuminated with love.",
    "Aradhana, you are a living, breathing masterpiece of pure love and happiness."
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
        this.letterText = `My Sweetest Aradhana,\n\nOn this blessed day of July 22nd, 2026, the entire universe rejoices because the most exquisite soul came into existence. From the exact moment you entered my life, every color became more vivid, every melody sounded sweeter, and my heart found its eternal home.\n\nYou are not merely my love; you are my peace, my deepest inspiration, and the answer to every prayer I ever whispered to the night sky. Your laughter is the music that fuels my spirit, and your gentle smile is the sunlight that dissolves all shadows.\n\nAs you celebrate another glorious year, I promise to stand beside you through every adventure, to celebrate every milestone, and to love you more fervently with every passing heartbeat. May today bring you as much boundless joy as you give to me every single day.\n\nHappy Birthday, my precious Queen. You are my forever and always. ❤️`;
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

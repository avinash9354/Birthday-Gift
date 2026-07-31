/**
 * 🎂 Roshu Birthday Website - Animated Love Timeline Manager
 * Animate timeline nodes and progress bar with smooth intersection observer
 */

class LoveTimelineManager {
    constructor() {
        this.timelineContainer = document.getElementById('timeline-container');
        this.progressBar = document.getElementById('timeline-progress');
        this.nodes = document.querySelectorAll('.timeline-node');

        this.init();
    }

    init() {
        if (!this.timelineContainer || !this.nodes.length) return;

        // Intersection Observer to animate timeline nodes as they enter view
        const observerOptions = {
            root: document.getElementById('page-timeline'),
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('bounce-in');
                    this.updateProgressBar();
                }
            });
        }, observerOptions);

        this.nodes.forEach(node => observer.observe(node));

        // Also listen to scroll within timeline section
        const pageTimeline = document.getElementById('page-timeline');
        if (pageTimeline) {
            pageTimeline.addEventListener('scroll', () => this.updateProgressBar());
        }

        // Trigger check when entering page
        setTimeout(() => this.updateProgressBar(), 300);
    }

    updateProgressBar() {
        if (!this.progressBar) return;
        const pageTimeline = document.getElementById('page-timeline');
        if (!pageTimeline) return;

        const scrollTop = pageTimeline.scrollTop;
        const scrollHeight = pageTimeline.scrollHeight - pageTimeline.clientHeight;
        const percentage = Math.min(100, Math.max(15, (scrollTop / (scrollHeight || 1)) * 100));

        this.progressBar.style.height = `${percentage}%`;
    }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    window.timelineController = new LoveTimelineManager();
});

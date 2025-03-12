const loadingScreen = document.getElementById('loading-screen');
const glitchScreen = document.getElementById('glitch-screen');
const promptScreen = document.getElementById('prompt-screen');
const bbsContent = document.getElementById('bbs-content');

const loadingLines = [
    // Your loading text (copy-paste your full list here)
    "~$ bash --version",
    "NEOPORTAL_OS, version 8.4.46(2)-release (x8664_32-cyb-matrix-os)",
    "License ZGOmtx_v4",
    "",
    "C:\\PORTAL\\SYSTEM32",
    "CHDIR Z:\\",
    "UN/LOAD Megadeck",
    "LOADING. . .",
    "LOADING. . .",
    "Z:\\MEGADECK\\",
    "RUN_BOOT ASIST_VM",
    "LOADING. . . ",
    "INTERSRV SHADOWLANDS",
    "",
    "struct group_info init_groups = { .usage = ATOMIC_INIT(2) };",
    "",
    "struct group_info *groups_alloc(int gidsetsize){",
    "    struct group_info *group_info;",
    "    int nblocks;",
    "    nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;",
    "    group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER);",
    "    if (!group_info)",
    "        return NULL;",
    "    group_info->ngroups = gidsetsize;",
    "",
    "ENTERING -> SHADOWLANDS_BBS",
    "",
    "<<LET YOUR EYES ADJUST TO THE SHADOWS>>",
    "",
    "Z:\\MEGADECK\\ASIST_VM\\DIAL\\SH4D0WL4ND_2",
    "CMD CHAT"
];

let lineIndex = 0;
const maxVisibleLines = 4; // Only show 4 lines at a time

function updateTerminal() {
    if (lineIndex < loadingLines.length) {
        // Add new line and trim old lines
        loadingScreen.textContent = [
            ...loadingScreen.textContent.split('\n').slice(-maxVisibleLines),
            loadingLines[lineIndex]
        ].join('\n');

        lineIndex++;
        loadingScreen.scrollTop = loadingScreen.scrollHeight; // Auto-scroll

        // Slow down for final section
        const delay = lineIndex > 25 ? 1000 : 500;
        setTimeout(updateTerminal, delay);
    } else {
        // Show glitch screen
        loadingScreen.classList.add('hidden');
        glitchScreen.classList.remove('hidden');
        
        // After 3 seconds, show prompt
        setTimeout(() => {
            glitchScreen.classList.add('hidden');
            promptScreen.classList.remove('hidden');
            setupPrompt(); // Initialize keyboard input
        }, 3000);
    }
}

function setupPrompt() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'y' || e.key === 'Y') {
            promptScreen.classList.add('hidden');
            bbsContent.classList.remove('hidden');
        } else if (e.key === 'n' || e.key === 'N') {
            promptScreen.innerHTML += '\n>_ Disconnecting...';
            setTimeout(() => window.close(), 1000);
        }
    });
}

// Start the sequence
updateTerminal();
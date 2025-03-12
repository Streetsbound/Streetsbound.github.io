// script.js
const loadingScreen = document.getElementById('loading-screen');
const bbsContent = document.getElementById('bbs-content');

const loadingText = [
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
    "CMD CHAT",
    "",
    ">_ . . .",
    ">_ . . .",
    ">_ . . .",
    ">_ . . . .",
    ">_ Hello ィヤね there ChUMmeRs",
    ">_ Do you want 異 to see just 唄茨 how DEEP the RaBbit hOle Goes?",
    "",
    ">[Y]es",
    ">[N]o"
];

let lineIndex = 0;

function simulateLoading() {
    if (lineIndex < loadingText.length) {
        // Add line and a line break
        loadingScreen.textContent += loadingText[lineIndex] + '\n';
        lineIndex++;
        setTimeout(simulateLoading, 500); // Adjust speed here (500ms = 0.5s delay)
    } else {
        // Hide loading screen, show BBS content
        loadingScreen.style.display = 'none';
        bbsContent.style.display = 'block';
    }
}

// Start the loading animation
simulateLoading();
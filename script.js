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
const maxVisibleLines = 4;

function updateTerminal() {
  if (lineIndex < loadingLines.length) {
    loadingScreen.textContent = [
      ...loadingScreen.textContent.split('\n').slice(-maxVisibleLines),
      loadingLines[lineIndex]
    ].join('\n');

    lineIndex++;
    loadingScreen.scrollTop = loadingScreen.scrollHeight;

    const delay = lineIndex > 25 ? 1000 : 500;
    setTimeout(updateTerminal, delay);
  } else {
    loadingScreen.classList.add('hidden');
    glitchScreen.classList.remove('hidden');
    
    setTimeout(() => {
      glitchScreen.classList.add('hidden');
      promptScreen.classList.remove('hidden');
      setupPrompt(); // Initialize prompt typing
    }, 3000);
  }
}

function setupPrompt() {
  const promptLines = [
    ">_ . . .",
    ">_ . . .",
    ">_ . . .",
    ">_ . . . .",
    ">_ Hello ィヤね there ChUMmeRs",
    ">_ Do you want 異 to see just 唄茨 how DEEP the RaBbit hOle Goes?"
  ];

  const promptText = document.getElementById('prompt-text');
  let currentLine = 0;

  function typePrompt() {
    if (currentLine < promptLines.length) {
      promptText.textContent += promptLines[currentLine] + '\n';
      currentLine++;
      setTimeout(typePrompt, 500);
    } else {
      promptText.textContent += '\n[Y]es / [N]o';
      setupInputHandler();
    }
  }

  // Start fresh
  promptText.textContent = '';
  typePrompt();
}

function setupInputHandler() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'y' || e.key === 'Y') {
      promptScreen.classList.add('hidden');
      bbsContent.classList.remove('hidden');
    } else if (e.key === 'n' || e.key === 'N') {
      const promptText = document.getElementById('prompt-text');
      promptText.textContent += '\n\n>_ ';
      typeRedirectMessage();
    }
  });
}

function typeRedirectMessage() {
  const glitchMessage = "S0RrY, CHUMMerS 0nlyy. . . SeND1ng YOu sOm3wHEr3 TREND f0r C0rps";
  const promptText = document.getElementById('prompt-text');
  let charIndex = 0;

  function typeGlitch() {
    if (charIndex < glitchMessage.length) {
      promptText.textContent += glitchMessage[charIndex];
      charIndex++;
      setTimeout(typeGlitch, 50);
    } else {
      setTimeout(() => {
        window.location.href = "https://www.dndbeyond.com";
      }, 2000);
    }
  }

  typeGlitch();
}

// Start the sequence
updateTerminal();
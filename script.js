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
    // Add new line and trim old lines
    loadingScreen.textContent = [
      ...loadingScreen.textContent.split('\n').slice(-maxVisibleLines),
      loadingLines[lineIndex]
    ].join('\n');

    lineIndex++;
    loadingScreen.scrollTop = loadingScreen.scrollHeight;

    const delay = lineIndex > 25 ? 1000 : 500;
    setTimeout(updateTerminal, delay);
  } else {
    // Hide loading, show glitch
    loadingScreen.classList.add('hidden');
    glitchScreen.classList.remove('hidden');
    
    // After 3 seconds, hide glitch and show prompt
    setTimeout(() => {
      glitchScreen.classList.add('hidden');
      promptScreen.classList.remove('hidden');
      setupPrompt();
    }, 3000);
  }
}

// In script.js
function setupPrompt() {
  const promptLines = [
    ">_ . . .",
    ">_ . . .",
    ">_ . . .",
    ">_ . . . .",
    ">_ Hello ィヤね there ChUMmeRs",
    ">_ Do you want 異 to see just 唄茨 how DEEP the RaBbit hOle Goes?"
  ];

  const optionsText = "[Y]es / [N]o";
  let currentLine = 0;
  const promptText = document.getElementById('prompt-text');

  function typePrompt() {
    if (currentLine < promptLines.length) {
      promptText.textContent += promptLines[currentLine] + '\n';
      currentLine++;
      setTimeout(typePrompt, 500); // Typing speed
    } else {
      // Add options after last line
      promptText.textContent += '\n' + optionsText;
      setupInputHandler();
    }
  }

  function setupInputHandler() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'y' || e.key === 'Y') {
        promptScreen.classList.add('hidden');
        bbsContent.classList.remove('hidden');
      } else if (e.key === 'n' || e.key === 'N') {
        promptText.textContent += '\n\n>_ ';
        typeRedirectMessage();
      }
    });
  }

  function typeRedirectMessage() {
    const glitchMessage = "S0RrY, CHUMMerS 0nlyy. . . S3nding Y0u s0m3wh3r3 TR3NDY f0r C0rps";
    let charIndex = 0;
    
    function typeGlitch() {
      if (charIndex < glitchMessage.length) {
        promptText.textContent += glitchMessage[charIndex];
        charIndex++;
        setTimeout(typeGlitch, 50); // Faster typing for glitch message
      } else {
        setTimeout(() => {
          window.location.href = "https://www.dndbeyond.com"; // Redirect to D&D Beyond
        }, 2000);
      }
    }
    
    typeGlitch();
  }

  // Start typing prompt
  promptText.textContent = '';
  typePrompt();
}
  });
}

// Start the sequence here
updateTerminal();
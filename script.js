const { createClient } = window.supabase;
const loadingScreen = document.getElementById('loading-screen');
const glitchScreen = document.getElementById('glitch-screen');
const promptScreen = document.getElementById('prompt-screen');
const bbsContent = document.getElementById('bbs-content');
const supabase = createClient(
  'https://ipvfeclixygixmncgnag.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwdmZlY2xpeHlnaXhtbmNnbmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTg0NDUsImV4cCI6MjA2MTE3NDQ0NX0.b8OxCME8o6VWAVT6w5ZkOOQwn2FrAstNNyp0Ay9ccXo'
);
const mainInterface = document.getElementById('main-interface');
// Add to state variables at top
let currentUser = null;
let currentCategory = '#OPEN_ALL';

const loadingLines = [
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

// Modify the existing setupInputHandler
function setupInputHandler() {
  // define a named function so we can remove it
  function handlePromptKey(e) {
    // only act if promptScreen is still visible
    if (promptScreen.classList.contains('hidden')) return;

    if (e.key === 'y' || e.key === 'Y') {
      document.removeEventListener('keydown', handlePromptKey);
      promptScreen.classList.add('dimmed');
      showLoginModal();
    } 
    else if (e.key === 'n' || e.key === 'N') {
      document.removeEventListener('keydown', handlePromptKey);
      typeRedirectMessage();
    }
  }

  setTimeout(() => {
  document.addEventListener("keydown", handlePromptKey);
}, 200);
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

// Add new functions
function showLoginModal() {
  const modal = document.getElementById('login-modal');
  modal.classList.remove('hidden');
  document.getElementById('handle-input').focus();

  // capture Enter, perform async login check
  const handleLoginKeypress = async (e) => {
    if (e.key !== 'Enter') return;
    try {
      const handle = document.getElementById('handle-input').value;
      const password = document.getElementById('password-input').value;

      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('handle', handle)
        .eq('password', password);

      if (error) throw error;

      if (data.length > 0) {
        currentUser = data[0];
        modal.classList.add('hidden');
        promptScreen.classList.add('hidden');
        initializeMainInterface();
        document.removeEventListener('keydown', handleLoginKeypress);
      } else {
        alert('AUTH FAILURE: CHECK YOUR CREDS CHUMMER');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('AUTH FAILURE: CHECK YOUR CREDS CHUMMER');
    }
  };

  document.addEventListener('keydown', handleLoginKeypress);
}




function initializeMainInterface() {
  document.getElementById('main-interface').classList.remove('hidden');
  loadDirectory();
  loadPosts(currentCategory);
}

// Add directory loading
async function loadDirectory() {
  const categories = [
    '#OPEN_ALL', '#PRIORITY_ALL', '#MIAMIJACKETS_ALL', 
    '#BISCAYNEBUMPS', '#TAGSALE', '#WIZNESSBIZARD',
    '#MIAMIHAXX_ALL', '#USER_DIR', '#WAREZ_DIR'
  ];

  const directory = document.getElementById('directory');
  directory.innerHTML = categories.map(cat => 
    `<div class="category" onclick="loadPosts('${cat}')">${cat}</div>`
  ).join('\n');
}

// Add post loading
async function loadPosts(category) {
  currentCategory = category;
  let query = supabase
    .from('posts')
    .select()
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (category.startsWith('#USER')) {
    query = query.or(`handle.eq.${currentUser.handle},category.eq.#PRIORITY_ALL`);
  }

  const { data } = await query;
  renderPosts(data);
}

function renderPosts(posts) {
  const container = document.getElementById('posts-container');
  container.innerHTML = posts.map(post => `
    <div class="post">
      <div class="post-header">${post.id} | ${post.title}</div>
      <div class="meta">${post.handle} @ ${new Date(post.created_at).toLocaleDateString()}</div>
      <div class="content">${formatContent(post.content)}</div>
    </div>
  `).join('');
}

function formatContent(text) {
  return text.match(/.{1,80}/g).map(line => `> ${line}`).join('\n');
}

// Add this before keyboard handler
async function newPost() {
  const title = prompt('Post Title (30 chars max):');
  const content = prompt('Post Content:');
  
  if (!content) return;

  await supabase.from('posts').insert([{
    id: generatePostId(),
    title: title || content.slice(0,30),
    content,
    category: currentCategory,
    handle: currentUser.handle
  }]);
  
  loadPosts(currentCategory);
}

function generatePostId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({length:3}, () => chars[Math.floor(Math.random()*36)]).join('');
}

document.addEventListener('keydown', (e) => {
  if (!currentUser) return;
  
  switch(e.key.toLowerCase()) {
    case 'h': showHelp(); break;
    case 'n': newPost(); break;
    case 'c': loadDirectory(); break;
    case 'q': logout(); break;
  }
});

function showHelp() {
  alert(`SHADOWNET COMMANDS:
H - Show help
N - New post
C - Return to directory
Q - Logout

MOUSE CONTROLS:
Click categories to browse
Click posts to view details`);
}

function logout() {
  currentUser = null;
  document.getElementById('main-interface').classList.add('hidden');
  showLoginModal();
}


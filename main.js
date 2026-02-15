const themeToggleText = document.getElementById('theme-toggle-text'); // Changed to themeToggleText

// Theme switching logic
function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
    themeToggleText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode'; // Update text
}

themeToggleText.addEventListener('click', () => { // Changed event listener
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme); // Set theme and update text on load

// Quiz Data
const quizData = [
  {
    id: 1,
    question_ko: "큰 수익을 위해 큰 위험을 감수할 의향이 있습니까?",
    question_en: "Are you willing to take significant risks for potentially high returns?",
    options: [
      { text_ko: "네, 큰 보상을 위해 기꺼이 위험을 감수합니다.", text_en: "Yes, I'm comfortable with high risks for high rewards.", impact: { risk: 2, horizon: 0, signal: 0, portfolio: 0 } },
      { text_ko: "적당한 위험과 적당한 보상을 선호합니다.", text_en: "I prefer moderate risks for moderate returns.", impact: { risk: 1, horizon: 0, signal: 0, portfolio: 0 } },
      { text_ko: "아니요, 저는 자본 보존을 최우선으로 생각합니다.", text_en: "No, I prioritize capital preservation.", impact: { risk: -2, horizon: 0, signal: 0, portfolio: 0 } }
    ]
  },
  {
    id: 2,
    question_ko: "투자는 보통 얼마나 오래 보유하시나요?",
    question_en: "How long do you typically hold your investments?",
    options: [
      { text_ko: "수년 이상, 장기적인 성장을 목표로 합니다.", text_en: "Several years or more, aiming for long-term growth.", impact: { risk: 0, horizon: 2, signal: 0, portfolio: 0 } },
      { text_ko: "몇 달에서 1년 정도, 단기 및 중기적 기회를 노립니다.", text_en: "A few months to a year, targeting short to medium-term opportunities.", impact: { risk: 0, horizon: 1, signal: 0, portfolio: 0 } },
      { text_ko: "몇 주 또는 며칠, 빠른 시장 움직임을 활용합니다.", text_en: "A few weeks or days, capitalizing on quick market movements.", impact: { risk: 0, horizon: -2, signal: 0, portfolio: 0 } }
    ]
  },
  {
    id: 3,
    question_ko: "투자 결정을 내릴 때 가장 중요하게 생각하는 것은 무엇입니까?",
    question_en: "What is most important to you when making investment decisions?",
    options: [
      { text_ko: "기술적 분석, 차트 패턴 및 시장 지표.", text_en: "Technical analysis, chart patterns, and market indicators.", impact: { risk: 0, horizon: 0, signal: 2, portfolio: 0 } },
      { text_ko: "펀더멘털 분석, 프로젝트의 기술과 백서.", text_en: "Fundamental analysis, project technology, and whitepapers.", impact: { risk: 0, horizon: 0, signal: 1, portfolio: 0 } },
      { text_ko: "뉴스, 소셜 미디어 트렌드 및 커뮤니티 정서.", text_en: "News, social media trends, and community sentiment.", impact: { risk: 0, horizon: 0, signal: -1, portfolio: 0 } }
    ]
  },
  {
    id: 4,
    question_ko: "포트폴리오 다각화에 대해 어떻게 생각하십니까?",
    question_en: "What is your approach to portfolio diversification?",
    options: [
      { text_ko: "다양한 자산에 걸쳐 광범위하게 다각화하여 위험을 분산합니다.", text_en: "Diversify broadly across many assets to spread risk.", impact: { risk: 0, horizon: 0, signal: 0, portfolio: 2 } },
      { text_ko: "선택적으로 다각화하고, 몇 가지 유망한 자산에 집중합니다.", text_en: "Diversify selectively, concentrating on a few promising assets.", impact: { risk: 0, horizon: 0, signal: 0, portfolio: 1 } },
      { text_ko: "소수의 고수익 자산에 집중하여 높은 수익을 추구합니다.", text_en: "Concentrate on a few high-conviction assets for potentially higher gains.", impact: { risk: 0, horizon: 0, signal: 0, portfolio: -2 } }
    ]
  }
];

// Persona Definitions (Placeholders - will be expanded)
const personas = {
  "VisionaryHodler": {
    name_ko: "선구적인 HODLer", name_en: "Visionary HODLer",
    description_ko: "당신은 장기적인 비전을 가지고 있으며, 시장의 단기적인 변동성에 흔들리지 않고 가치 있는 프로젝트를 꾸준히 보유합니다.",
    description_en: "You have a long-term vision, holding valuable projects steadily, unfazed by short-term market fluctuations."
  },
  "AgileTrader": {
    name_ko: "민첩한 트레이더", name_en: "Agile Trader",
    description_ko: "당신은 시장의 흐름을 빠르게 읽고 단기적인 기회를 포착하여 민첩하게 움직이는 투자자입니다.",
    description_en: "You are an investor who quickly reads market trends and seizes short-term opportunities with agility."
  },
  "CautiousConservative": {
    name_ko: "신중한 보수주의자", name_en: "Cautious Conservative",
    description_ko: "당신은 위험을 최소화하고 자본을 보존하는 것을 최우선으로 생각하며, 안정적인 투자를 선호합니다.",
    description_en: "You prioritize minimizing risk and preserving capital, preferring stable investments."
  },
  "OpportunisticDegen": {
    name_ko: "기회주의적 디젠", name_en: "Opportunistic Degen",
    description_ko: "당신은 높은 위험을 감수하고 빠르게 변동하는 시장에서 큰 수익을 노리는 기회주의적인 투자자입니다.",
    description_en: "You are an opportunistic investor who takes high risks to chase big returns in volatile markets."
  }
};

// Quiz State Variables
let currentQuestionIndex = 0;
let userScores = {
  risk: 0,
  horizon: 0,
  signal: 0,
  portfolio: 0
};
let userLanguage = localStorage.getItem('lang') || 'ko'; // 'ko' or 'en'

// DOM Elements
const qbox = document.getElementById('content');
const progBar = document.getElementById('progBar');
const qNoSpan = document.getElementById('qNo');
const mainCard = document.getElementById('mainCard');
const actionsDiv = document.getElementById('actions');
const btnResetTop = document.getElementById('btnResetTop');
const langSel = document.getElementById('langSel');

// Helper to update text based on language
function updateTextContent(id, keyKo, keyEn) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = userLanguage === 'ko' ? keyKo : keyEn;
  }
}

// Function to initialize or reset the quiz
function initializeQuiz() {
  currentQuestionIndex = 0;
  userScores = {
    risk: 0,
    horizon: 0,
    signal: 0,
    portfolio: 0
  };
  // Set language from localStorage or default
  userLanguage = localStorage.getItem('lang') || 'ko';
  langSel.value = userLanguage;

  // Update static texts
  updateTextContent('t_title', '코인 페르소나', 'Coin Persona');
  updateTextContent('t_sub', '30문항으로 보는 나의 투자 성향 (오락용)', '30-question quiz to find your investment persona (for fun)');
  updateTextContent('t_qno', '문항', 'Question');
  updateTextContent('t_axis', '축(4D)', 'Axes (4D)');
  updateTextContent('t_reset', '초기화', 'Reset');
  updateTextContent('t_disclaimer', '이 테스트는 재미를 위한 것이며 투자 조언이 아닙니다.', 'This test is for entertainment purposes and is not financial advice.');
  updateTextContent('t_stage', '진단 중', 'Diagnosing');
  updateTextContent('t_sideTitle', '오늘의 콘텐츠', 'Today\'s Content');
  updateTextContent('t_sideDesc', '결과 페이지에서 “나에게 맞는 학습/콘텐츠”를 추천합니다. (오락/학습용)', 'Recommended learning/content on the results page. (for entertainment/learning)');
  updateTextContent('t_side1', '✅ 3분: 수익률 vs 변동성 감각 테스트', '✅ 3 min: Returns vs. Volatility Sensitivity Test');
  updateTextContent('t_side2', '✅ 2분: 내 리스크 허용도 레벨', '✅ 2 min: My Risk Tolerance Level');
  updateTextContent('t_side3', '✅ 1분: “나는 분산파?” 체크', '✅ 1 min: "Am I a Diversifier?" Check');
  updateTextContent('t_footer1', '본 페이지는 샘플 템플릿입니다. 개인정보를 수집하지 않습니다(기본값).', 'This page is a sample template. No personal information is collected (default).');
  updateTextContent('t_footer2', '광고/분석 도구를 붙일 경우, 쿠키/개인정보 고지 및 동의 UX는 법적 요구사항을 확인해야 합니다.', 'If ad/analytics tools are attached, cookie/privacy notice and consent UX must comply with legal requirements.');

  mainCard.innerHTML = `
    <div class="hero">
      <div class="row">
        <div>
          <div class="badge"><span aria-hidden="true">⚠️</span><span id="t_disclaimer">이 테스트는 재미를 위한 것이며 투자 조언이 아닙니다.</span></div>
          <div class="progress" aria-label="Progress"><div class="bar" id="progBar"></div></div>
          <div class="kpi">
            <div class="k">
              <div class="t" id="t_qno">문항</div>
              <div class="v" id="qNo">1 / ${quizData.length}</div>
            </div>
            <div class="k">
              <div class="t" id="t_axis">축(4D)</div>
              <div class="v" id="axisHint">Risk • Horizon • Signal • Portfolio</div>
            </div>
          </div>
        </div>
        <div class="badge" id="stageBadge"><span aria-hidden="true">🧠</span><span id="t_stage">진단 중</span></div>
      </div>
    </div>
    <div class="qbox" id="content"></div>
    <div class="actions" id="actions"></div>
  `;

  renderQuestion();
}

// Function to render the current question
function renderQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  if (!currentQuestion) {
    displayResults(); // If no more questions, display results
    return;
  }

  qbox.innerHTML = `
    <h2 class="qtitle">${userLanguage === 'ko' ? currentQuestion.question_ko : currentQuestion.question_en}</h2>
    <div class="options">
      ${currentQuestion.options.map((option, index) => `
        <div class="opt" data-option-index="${index}">
          <input type="radio" id="q${currentQuestion.id}o${index}" name="question${currentQuestion.id}" value="${index}" class="hidden-radio">
          <label for="q${currentQuestion.id}o${index}" class="lbl">${userLanguage === 'ko' ? option.text_ko : option.text_en}</label>
        </div>
      `).join('')}
    </div>
  `;

  actionsDiv.innerHTML = `
    <button class="btn-primary" id="nextQuestionBtn">${userLanguage === 'ko' ? '다음 문항' : 'Next Question'}</button>
  `;

  qNoSpan.textContent = `${currentQuestionIndex + 1} / ${quizData.length}`;
  progBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;

  // Attach event listeners to options
  document.querySelectorAll('.opt').forEach(optionElement => {
    optionElement.addEventListener('click', () => {
      // Remove selected class from all options of the current question
      document.querySelectorAll('.opt').forEach(opt => opt.classList.remove('selected'));
      // Add selected class to the clicked option
      optionElement.classList.add('selected');
      // Set the radio button as checked
      const radioButton = optionElement.querySelector('input[type="radio"]');
      if (radioButton) {
        radioButton.checked = true;
      }
    });
  });

  document.getElementById('nextQuestionBtn').addEventListener('click', handleAnswerClick);
}

// Function to handle answer click
function handleAnswerClick() {
  const selectedOptionElement = document.querySelector('.opt.selected');
  if (!selectedOptionElement) {
    alert(userLanguage === 'ko' ? '답변을 선택해주세요!' : 'Please select an answer!');
    return;
  }

  const optionIndex = parseInt(selectedOptionElement.dataset.optionIndex);
  const currentQuestion = quizData[currentQuestionIndex];
  const selectedOption = currentQuestion.options[optionIndex];

  // Apply impact to user scores
  for (const dimension in selectedOption.impact) {
    if (userScores.hasOwnProperty(dimension)) {
      userScores[dimension] += selectedOption.impact[dimension];
    }
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    renderQuestion();
  } else {
    displayResults();
  }
}

// Function to display results
function displayResults() {
  // Simple logic to determine persona based on highest score in each dimension
  // This can be made more sophisticated later with ranges or combinations
  let finalPersonaKey = "VisionaryHodler"; // Default

  // Example simple mapping
  if (userScores.risk > 0 && userScores.horizon > 0) {
    finalPersonaKey = "VisionaryHodler";
  } else if (userScores.risk > 0 && userScores.signal > 0) {
    finalPersonaKey = "AgileTrader";
  } else if (userScores.risk < 0 && userScores.portfolio > 0) {
    finalPersonaKey = "CautiousConservative";
  } else if (userScores.risk > 0 && userScores.portfolio < 0) {
    finalPersonaKey = "OpportunisticDegen";
  }


  const finalPersona = personas[finalPersonaKey];

  qbox.innerHTML = `
    <h2 class="resultType">${userLanguage === 'ko' ? finalPersona.name_ko : finalPersona.name_en}</h2>
    <p class="resultName">${userLanguage === 'ko' ? finalPersona.description_ko : finalPersona.description_en}</p>
    <div class="kpi">
      <div class="k">
        <div class="t">Risk</div>
        <div class="v">${userScores.risk}</div>
      </div>
      <div class="k">
        <div class="t">Horizon</div>
        <div class="v">${userScores.horizon}</div>
      </div>
      <div class="k">
        <div class="t">Signal</div>
        <div class="v">${userScores.signal}</div>
      </div>
      <div class="k">
        <div class="t">Portfolio</div>
        <div class="v">${userScores.portfolio}</div>
      </div>
    </div>
  `;

  actionsDiv.innerHTML = `
    <button class="btn-primary" id="restartQuizBtn">${userLanguage === 'ko' ? '다시 시작' : 'Restart Quiz'}</button>
  `;

  document.getElementById('restartQuizBtn').addEventListener('click', initializeQuiz);

  // Update progress bar to 100%
  progBar.style.width = `100%`;
  qNoSpan.textContent = `${quizData.length} / ${quizData.length}`;
  updateTextContent('t_stage', '결과', 'Results'); // Update the stage badge
}

// Event Listeners
langSel.addEventListener('change', (event) => {
  userLanguage = event.target.value;
  localStorage.setItem('lang', userLanguage);
  initializeQuiz(); // Re-render quiz with new language
});

btnResetTop.addEventListener('click', initializeQuiz);

// Initialize the quiz when the script loads
initializeQuiz();

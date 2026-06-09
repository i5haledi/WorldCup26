const GROUPS = [
  { letter: "A", teams: [["Mexico", "mx"], ["South Africa", "za"], ["Korea Republic", "kr"], ["Czechia", "cz"]] },
  { letter: "B", teams: [["Canada", "ca"], ["Switzerland", "ch"], ["Qatar", "qa"], ["Bosnia & Herzegovina", "ba"]] },
  { letter: "C", teams: [["Brazil", "br"], ["Morocco", "ma"], ["Haiti", "ht"], ["Scotland", "gb-sct"]] },
  { letter: "D", teams: [["United States", "us"], ["Paraguay", "py"], ["Australia", "au"], ["Türkiye", "tr"]] },
  { letter: "E", teams: [["Germany", "de"], ["Curaçao", "cw"], ["Côte d'Ivoire", "ci"], ["Ecuador", "ec"]] },
  { letter: "F", teams: [["Netherlands", "nl"], ["Japan", "jp"], ["Tunisia", "tn"], ["Sweden", "se"]] },
  { letter: "G", teams: [["Belgium", "be"], ["Egypt", "eg"], ["IR Iran", "ir"], ["New Zealand", "nz"]] },
  { letter: "H", teams: [["Spain", "es"], ["Cabo Verde", "cv"], ["Saudi Arabia", "sa"], ["Uruguay", "uy"]] },
  { letter: "I", teams: [["France", "fr"], ["Senegal", "sn"], ["Norway", "no"], ["Iraq", "iq"]] },
  { letter: "J", teams: [["Argentina", "ar"], ["Algeria", "dz"], ["Austria", "at"], ["Jordan", "jo"]] },
  { letter: "K", teams: [["Portugal", "pt"], ["Uzbekistan", "uz"], ["Colombia", "co"], ["DR Congo", "cd"]] },
  { letter: "L", teams: [["England", "gb-eng"], ["Croatia", "hr"], ["Ghana", "gh"], ["Panama", "pa"]] },
].map((group) => ({
  ...group,
  teams: group.teams.map(([name, code]) => ({ name, code, group: group.letter })),
}));

const ARABIC_TEAM_NAMES = {
  mx: "المكسيك", za: "جنوب أفريقيا", kr: "كوريا الجنوبية", cz: "التشيك",
  ca: "كندا", ch: "سويسرا", qa: "قطر", ba: "البوسنة والهرسك",
  br: "البرازيل", ma: "المغرب", ht: "هايتي", "gb-sct": "اسكتلندا",
  us: "الولايات المتحدة", py: "باراغواي", au: "أستراليا", tr: "تركيا",
  de: "ألمانيا", cw: "كوراساو", ci: "ساحل العاج", ec: "الإكوادور",
  nl: "هولندا", jp: "اليابان", tn: "تونس", se: "السويد",
  be: "بلجيكا", eg: "مصر", ir: "إيران", nz: "نيوزيلندا",
  es: "إسبانيا", cv: "الرأس الأخضر", sa: "السعودية", uy: "الأوروغواي",
  fr: "فرنسا", sn: "السنغال", no: "النرويج", iq: "العراق",
  ar: "الأرجنتين", dz: "الجزائر", at: "النمسا", jo: "الأردن",
  pt: "البرتغال", uz: "أوزبكستان", co: "كولومبيا", cd: "الكونغو الديمقراطية",
  "gb-eng": "إنجلترا", hr: "كرواتيا", gh: "غانا", pa: "بنما",
};

const THIRD_PLACE_WINNER_GROUPS = ["A", "B", "D", "E", "G", "I", "K", "L"];
const OFFICIAL_THIRD_PLACE_ASSIGNMENTS =
  "EJIFHGLKHGIDJFLKEJIDHGLKEJIDHFLKEGIDJFLKEGJDHFLKEGIDHFLKEGJDHFLIEGJDHFIKHGICJFLKEJICHGLKEJICHFLKEGICJFLKEGJCHFLKEGICHFLKEGJCHFLIEGJCHFIKHGICJDLKCJIDHFLKCGIDJFLKCGJDHFLKCGIDHFLKCGJDHFLICGJDHFIKEJICHDLKEGICJDLKEGJCHDLKEGICHDLKEGJCHDLIEGJCHDIKCJEDIFLKCJEDHFLKCEIDHFLKCJEDHFLICJEDHFIKCGEDJFLKCGEDIFLKCGEDJFLICGEDJFIKCGEDHFLKCGJDHFLECGJDHFEKCGEDHFLICGEDHFIKCGJDHFEIHJBFIGLKEJIBHGLKEJBFIHLKEJBFIGLKEJBFHGLKEGBFIHLKEJBFHGLIEJBFHGIKHJBDIGLKHJBDIFLKIGBDJFLKHGBDJFLKHGBDIFLKHGBDJFLIHGBDJFIKEJBDIHLKEJBDIGLKEJBDHGLKEGBDIHLKEJBDHGLIEJBDHGIKEJBDIFLKEJBDHFLKEIBDHFLKEJBDHFLIEJBDHFIKEGBDJFLKEGBDIFLKEGBDJFLIEGBDJFIKEGBDHFLKHGBDJFLEHGBDJFEKEGBDHFLIEGBDHFIKHGBDJFEIHJBCIGLKHJBCIFLKIGBCJFLKHGBCJFLKHGBCIFLKHGBCJFLIHGBCJFIKEJBCIHLKEJBCIGLKEJBCHGLKEGBCIHLKEJBCHGLIEJBCHGIKEJBCIFLKEJBCHFLKEIBCHFLKEJBCHFLIEJBCHFIKEGBCJFLKEGBCIFLKEGBCJFLIEGBCJFIKEGBCHFLKHGBCJFLEHGBCJFEKEGBCHFLIEGBCHFIKHGBCJFEIHJBCIDLKIGBCJDLKHGBCJDLKHGBCIDLKHGBCJDLIHGBCJDIKCJBDIFLKCJBDHFLKCIBDHFLKCJBDHFLICJBDHFIKCGBDJFLKCGBDIFLKCGBDJFLICGBDJFIKCGBDHFLKCGBDHFLJHGBCJFDKCGBDHFLICGBDHFIKHGBCJFDIEJBCIDLKEJBCHDLKEIBCHDLKEJBCHDLIEJBCHDIKEGBCJDLKEGBCIDLKEGBCJDLIEGBCJDIKEGBCHDLKHGBCJDLEHGBCJDEKEGBCHDLIEGBCHDIKHGBCJDEICJBDEFLKCEBDIFLKCJBDEFLICJBDEFIKCEBDHFLKCJBDHFLECJBDHFEKCEBDHFLICEBDHFIKCJBDHFEICGBDEFLKCGBDJFLECGBDJFEKCGBDEFLICGBDEFIKCGBDJFEICGBDHFLECGBDHFEKHGBCJFDECGBDHFEIHJIFAGLKEJIAHGLKEJIFAHLKEJIFAGLKEGJFAHLKEGIFAHLKEGJFAHLIEGJFAHIKHJIDAGLKHJIDAFLKIGJDAFLKHGJDAFLKHGIDAFLKHGJDAFLIHGJDAFIKEJIDAHLKEJIDAGLKEGJDAHLKEGIDAHLKEGJDAHLIEGJDAHIKEJIDAFLKHJEDAFLKHEIDAFLKHJEDAFLIHJEDAFIKEGJDAFLKEGIDAFLKEGJDAFLIEGJDAFIKHGEDAFLKHGJDAFLEHGJDAFEKHGEDAFLIHGEDAFIKHGJDAFEIHJICAGLKHJICAFLKIGJCAFLKHGJCAFLKHGICAFLKHGJCAFLIHGJCAFIKEJICAHLKEJICAGLKEGJCAHLKEGICAHLKEGJCAHLIEGJCAHIKEJICAFLKHJECAFLKHEICAFLKHJECAFLIHJECAFIKEGJCAFLKEGICAFLKEGJCAFLIEGJCAFIKHGECAFLKHGJCAFLEHGJCAFEKHGECAFLIHGECAFIKHGJCAFEIHJICADLKIGJCADLKHGJCADLKHGICADLKHGJCADLIHGJCADIKCJIDAFLKHJFCADLKHFICADLKHJFCADLIHJFCADIKCGJDAFLKCGIDAFLKCGJDAFLICGJDAFIKHGFCADLKCGJDAFLHHGJCAFDKHGFCADLIHGFCADIKHGJCAFDIEJICADLKHJECADLKHEICADLKHJECADLIHJECADIKEGJCADLKEGICADLKEGJCADLIEGJCADIKHGECADLKHGJCADLEHGJCADEKHGECADLIHGECADIKHGJCADEICJEDAFLKCEIDAFLKCJEDAFLICJEDAFIKHEFCADLKHJFCADLEHJECAFDKHEFCADLIHEFCADIKHJECAFDICGEDAFLKCGJDAFLECGJDAFEKCGEDAFLICGEDAFIKCGJDAFEIHGFCADLEHGECAFDKHGJCAFDEHGECAFDIHJBAIGLKHJBAIFLKIJBFAGLKHJBFAGLKHGBAIFLKHJBFAGLIHJBFAGIKEJBAIHLKEJBAIGLKEJBAHGLKEGBAIHLKEJBAHGLIEJBAHGIKEJBAIFLKEJBFAHLKEIBFAHLKEJBFAHLIEJBFAHIKEJBFAGLKEGBAIFLKEJBFAGLIEJBFAGIKEGBFAHLKHJBFAGLEHJBFAGEKEGBFAHLIEGBFAHIKHJBFAGEIIJBDAHLKIJBDAGLKHJBDAGLKIGBDAHLKHJBDAGLIHJBDAGIKIJBDAFLKHJBDAFLKHIBDAFLKHJBDAFLIHJBDAFIKFJBDAGLKIGBDAFLKFJBDAGLIFJBDAGIKHGBDAFLKHGBDAFLJHGBDAFJKHGBDAFLIHGBDAFIKHGBDAFIJEJBAIDLKEJBDAHLKEIBDAHLKEJBDAHLIEJBDAHIKEJBDAGLKEGBAIDLKEJBDAGLIEJBDAGIKEGBDAHLKHJBDAGLEHJBDAGEKEGBDAHLIEGBDAHIKHJBDAGEIEJBDAFLKEIBDAFLKEJBDAFLIEJBDAFIKHEBDAFLKHJBDAFLEHJBDAFEKHEBDAFLIHEBDAFIKHJBDAFEIEGBDAFLKEGBDAFLJEGBDAFJKEGBDAFLIEGBDAFIKEGBDAFIJHGBDAFLEHGBDAFEKHGBDAFEJHGBDAFEIIJBCAHLKIJBCAGLKHJBCAGLKIGBCAHLKHJBCAGLIHJBCAGIKIJBCAFLKHJBCAFLKHIBCAFLKHJBCAFLIHJBCAFIKCJBFAGLKIGBCAFLKCJBFAGLICJBFAGIKHGBCAFLKHGBCAFLJHGBCAFJKHGBCAFLIHGBCAFIKHGBCAFIJEJBAICLKEJBCAHLKEIBCAHLKEJBCAHLIEJBCAHIKEJBCAGLKEGBAICLKEJBCAGLIEJBCAGIKEGBCAHLKHJBCAGLEHJBCAGEKEGBCAHLIEGBCAHIKHJBCAGEIEJBCAFLKEIBCAFLKEJBCAFLIEJBCAFIKHEBCAFLKHJBCAFLEHJBCAFEKHEBCAFLIHEBCAFIKHJBCAFEIEGBCAFLKEGBCAFLJEGBCAFJKEGBCAFLIEGBCAFIKEGBCAFIJHGBCAFLEHGBCAFEKHGBCAFEJHGBCAFEIIJBCADLKHJBCADLKHIBCADLKHJBCADLIHJBCADIKCJBDAGLKIGBCADLKCJBDAGLICJBDAGIKHGBCADLKHGBCADLJHGBCADJKHGBCADLIHGBCADIKHGBCADIJCJBDAFLKCIBDAFLKCJBDAFLICJBDAFIKHFBCADLKCJBDAFLHHJBCAFDKHFBCADLIHFBCADIKHJBCAFDICGBDAFLKCGBDAFLJCGBDAFJKCGBDAFLICGBDAFIKCGBDAFIJCGBDAFLHHGBCAFDKHGBCAFDJHGBCAFDIEJBCADLKEIBCADLKEJBCADLIEJBCADIKHEBCADLKHJBCADLEHJBCADEKHEBCADLIHEBCADIKHJBCADEIEGBCADLKEGBCADLJEGBCADJKEGBCADLIEGBCADIKEGBCADIJHGBCADLEHGBCADEKHGBCADEJHGBCADEICEBDAFLKCJBDAFLECJBDAFEKCEBDAFLICEBDAFIKCJBDAFEIHFBCADLEHEBCAFDKHJBCAFDEHEBCAFDICGBDAFLECGBDAFEKCGBDAFEJCGBDAFEIHGBCAFDE";

const STORAGE_KEY = "road-to-26-predictions";
const state = loadState();
let toastTimer;

const groupsGrid = document.querySelector("#groupsGrid");
const buildBracketButton = document.querySelector("#buildBracketButton");
const quickFillButton = document.querySelector("#quickFillButton");
const resetButton = document.querySelector("#resetButton");
const editGroupsButton = document.querySelector("#editGroupsButton");
const exportButton = document.querySelector("#exportButton");
const sharePanel = document.querySelector("#sharePanel");
const usernameInput = document.querySelector("#usernameInput");
const bracketBoard = document.querySelector("#bracketBoard");
const bracketShell = document.querySelector("#bracketShell");
const mobileRoundNav = document.querySelector("#mobileRoundNav");
let activeMobileRound = 0;

function initialState() {
  return {
    picks: Object.fromEntries(GROUPS.map((group) => [group.letter, []])),
    wildcards: [],
    bracket: null,
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !saved.picks) return initialState();

    GROUPS.forEach((group) => {
      const picks = saved.picks[group.letter] || [];
      if (picks.length === 3) {
        const fourthTeam = group.teams.find((team) => !picks.includes(team.code));
        if (fourthTeam) picks.push(fourthTeam.code);
      }
      saved.picks[group.letter] = picks;
    });

    if (saved.bracket?.version !== 2) saved.bracket = null;
    return saved;
  } catch {
    return initialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function flagUrl(code, width = 80) {
  return `assets/flags/${code}.png`;
}

function teamName(team) {
  return ARABIC_TEAM_NAMES[team.code] || team.name;
}

function teamKey(team) {
  return `${team.group}:${team.code}`;
}

function findTeam(key) {
  const [groupLetter, code] = key.split(":");
  return GROUPS.find((group) => group.letter === groupLetter)?.teams.find((team) => team.code === code);
}

function renderGroups() {
  groupsGrid.innerHTML = GROUPS.map((group) => {
    const picks = state.picks[group.letter] || [];
    const complete = picks.length === 4;
    const manualPicks = Math.min(picks.length, 3);

    return `
      <article class="group-card ${complete ? "complete" : ""}">
        <div class="group-heading">
          <strong>المجموعة ${group.letter}</strong>
          <span>${complete ? "اسحب لإعادة الترتيب" : `تم اختيار ${manualPicks} من 3`}</span>
        </div>
        <div class="flag-picker" aria-label="منتخبات المجموعة ${group.letter}">
          ${group.teams.map((team) => renderFlagChoice(team, picks)).join("")}
        </div>
        <div class="selected-order">
          <div class="order-caption">
            <span>الترتيب المتوقع</span>
            <span>${complete ? "اسحب أو استخدم الأسهم" : "اختر الأعلام أعلاه"}</span>
          </div>
          <div class="order-list">
            ${[0, 1, 2, 3].map((index) => renderOrderSlot(group, picks, index)).join("")}
          </div>
        </div>
      </article>
    `;
  }).join("");

  groupsGrid.querySelectorAll(".flag-choice").forEach((button) => {
    button.addEventListener("click", () => selectTeam(button.dataset.group, button.dataset.code));
  });

  groupsGrid.querySelectorAll(".order-move").forEach((button) => {
    button.addEventListener("click", () => {
      movePick(button.dataset.group, Number(button.dataset.index), Number(button.dataset.direction));
    });
  });

  groupsGrid.querySelectorAll(".remove-pick").forEach((button) => {
    button.addEventListener("click", () => selectTeam(button.dataset.group, button.dataset.code));
  });

  groupsGrid.querySelectorAll(".wildcard-toggle").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleWildcard(button.dataset.group);
    });
  });

  bindOrderDragging();
  updateProgress();
}

function renderFlagChoice(team, picks) {
  const index = picks.indexOf(team.code);
  const selected = index >= 0;

  return `
    <button
      type="button"
      class="flag-choice ${selected ? "selected" : ""}"
      data-group="${team.group}"
      data-code="${team.code}"
      aria-pressed="${selected}"
      aria-label="${selected ? `إزالة ${teamName(team)} من المركز ${index + 1}` : `إضافة ${teamName(team)} في المركز التالي`}"
    >
      <span class="flag-choice-image"><img src="${flagUrl(team.code, 160)}" alt="علم ${teamName(team)}" loading="lazy"></span>
      <span class="flag-choice-name">${teamName(team)}</span>
      ${selected ? `<span class="flag-choice-rank">${index + 1}</span>` : ""}
    </button>
  `;
}

function renderOrderSlot(group, picks, index) {
  const code = picks[index];
  const team = code ? group.teams.find((candidate) => candidate.code === code) : null;
  const labels = ["متصدر المجموعة", "وصيف المجموعة", "المركز الثالث", "خارج المنافسة"];
  const isWildcard = index === 2 && state.wildcards.includes(group.letter);

  if (!team) {
    return `
      <div class="order-slot empty">
        <span class="position-number">${index + 1}</span>
        <span class="empty-position">${labels[index]}</span>
      </div>
    `;
  }

  return `
    <div
      class="order-slot rank-${index + 1}"
      draggable="true"
      data-group="${group.letter}"
      data-index="${index}"
    >
      <span class="drag-handle" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i><i></i>
      </span>
      <span class="position-number">${index + 1}</span>
      <span class="order-flag"><img src="${flagUrl(team.code)}" alt="علم ${teamName(team)}"></span>
      <span class="order-team">
        <strong>${teamName(team)}</strong>
        <small>${labels[index]}</small>
      </span>
      ${index === 2
        ? `<button
            type="button"
            class="wildcard-toggle ${isWildcard ? "active" : ""}"
            data-group="${group.letter}"
            aria-label="${isWildcard ? "إلغاء تأهل" : "تأهيل"} ${teamName(team)} ضمن أفضل الثوالث"
          >${isWildcard ? "متأهل" : "غير متأهل"}</button>`
        : ""
      }
      <span class="order-actions">
        <button type="button" class="order-move" data-group="${group.letter}" data-index="${index}" data-direction="-1" ${index === 0 ? "disabled" : ""} aria-label="نقل ${teamName(team)} للأعلى">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 10 4-4 4 4"></path></svg>
        </button>
        <button type="button" class="order-move" data-group="${group.letter}" data-index="${index}" data-direction="1" ${index === picks.length - 1 ? "disabled" : ""} aria-label="نقل ${teamName(team)} للأسفل">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"></path></svg>
        </button>
        <button type="button" class="remove-pick" data-group="${group.letter}" data-code="${team.code}" aria-label="إزالة ${teamName(team)}">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8"></path></svg>
        </button>
      </span>
    </div>
  `;
}

function selectTeam(groupLetter, code) {
  const picks = state.picks[groupLetter] || [];
  const currentIndex = picks.indexOf(code);

  if (currentIndex >= 0) {
    picks.splice(currentIndex, 1);
    if (picks.length < 4) {
      state.wildcards = state.wildcards.filter((letter) => letter !== groupLetter);
    }
  } else if (picks.length < 3) {
    picks.push(code);
    if (picks.length === 3) {
      const group = GROUPS.find((candidate) => candidate.letter === groupLetter);
      const fourthTeam = group.teams.find((team) => !picks.includes(team.code));
      if (fourthTeam) picks.push(fourthTeam.code);
    }
  } else if (picks.length === 3) {
    picks.push(code);
  }

  state.picks[groupLetter] = picks;
  state.bracket = null;
  saveState();
  renderGroups();
}

function movePick(groupLetter, fromIndex, direction) {
  const picks = state.picks[groupLetter] || [];
  const toIndex = fromIndex + direction;
  if (toIndex < 0 || toIndex >= picks.length) return;

  [picks[fromIndex], picks[toIndex]] = [picks[toIndex], picks[fromIndex]];
  state.bracket = null;
  saveState();
  renderGroups();
}

function reorderPick(groupLetter, fromIndex, toIndex) {
  const picks = state.picks[groupLetter] || [];
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || toIndex >= picks.length) return;

  const [moved] = picks.splice(fromIndex, 1);
  picks.splice(toIndex, 0, moved);
  state.bracket = null;
  saveState();
  renderGroups();
}

function bindOrderDragging() {
  let draggedGroup = null;
  let draggedIndex = null;

  groupsGrid.querySelectorAll(".order-slot[draggable='true']").forEach((slot) => {
    slot.addEventListener("dragstart", (event) => {
      draggedGroup = slot.dataset.group;
      draggedIndex = Number(slot.dataset.index);
      slot.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
    });

    slot.addEventListener("dragend", () => {
      slot.classList.remove("dragging");
      groupsGrid.querySelectorAll(".order-slot").forEach((item) => item.classList.remove("drag-over"));
    });

    slot.addEventListener("dragover", (event) => {
      if (slot.dataset.group !== draggedGroup) return;
      event.preventDefault();
      slot.classList.add("drag-over");
    });

    slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));

    slot.addEventListener("drop", (event) => {
      event.preventDefault();
      slot.classList.remove("drag-over");
      if (slot.dataset.group === draggedGroup) {
        reorderPick(draggedGroup, draggedIndex, Number(slot.dataset.index));
      }
    });
  });
}

function toggleWildcard(groupLetter) {
  if ((state.picks[groupLetter] || []).length < 4) return;

  if (state.wildcards.includes(groupLetter)) {
    state.wildcards = state.wildcards.filter((letter) => letter !== groupLetter);
  } else if (state.wildcards.length < 8) {
    state.wildcards.push(groupLetter);
  } else {
    showToast("تم اختيار ثمانية منتخبات بالفعل ضمن أفضل الثوالث.");
    return;
  }

  state.bracket = null;
  saveState();
  renderGroups();
}

function updateProgress() {
  const completeGroups = GROUPS.filter((group) => (state.picks[group.letter] || []).length === 4).length;
  const groupPickCount = Object.values(state.picks).reduce((sum, picks) => sum + Math.min(picks.length, 3), 0);
  const totalSteps = 36 + 8;
  const completedSteps = groupPickCount + state.wildcards.length;
  const percent = Math.round((completedSteps / totalSteps) * 100);
  const ready = completeGroups === 12 && state.wildcards.length === 8;

  document.querySelector("#progressPercent").textContent = `${percent}%`;
  document.querySelector("#progressBar").style.width = `${percent}%`;
  document.querySelector("#groupsComplete").textContent = completeGroups;
  document.querySelector("#thirdsSelected").textContent = `${state.wildcards.length}/8`;
  document.querySelector("#qualifierCount").textContent = completeGroups * 2 + state.wildcards.length;
  buildBracketButton.disabled = !ready;

  const dockTitle = document.querySelector("#dockTitle");
  const dockCopy = document.querySelector("#dockCopy");

  if (ready) {
    dockTitle.textContent = "اكتملت قائمة دور الـ32";
    dockCopy.textContent = "أنشئ الأدوار الإقصائية واختر بطلك حتى النهائي.";
  } else if (completeGroups < 12) {
    dockTitle.textContent = `تبقى ${12 - completeGroups} من المجموعات`;
    dockCopy.textContent = "اختر ثلاثة أعلام وسيُضاف المنتخب المتبقي رابعاً تلقائياً.";
  } else {
    dockTitle.textContent = `اختر ${8 - state.wildcards.length} من أفضل الثوالث`;
    dockCopy.textContent = "استخدم زر التأهيل بجانب منتخب المركز الثالث.";
  }
}

function quickFill() {
  GROUPS.forEach((group, index) => {
    state.picks[group.letter] = group.teams.map((team) => team.code);
    if (index < 8) {
      if (!state.wildcards.includes(group.letter)) state.wildcards.push(group.letter);
    }
  });
  state.wildcards = GROUPS.slice(0, 8).map((group) => group.letter);
  state.bracket = null;
  saveState();
  renderGroups();
  showToast("تمت إضافة توقع تجريبي كامل.");
}

function getQualifiers() {
  const winners = {};
  const runnersUp = {};
  const thirds = {};

  GROUPS.forEach((group) => {
    const picks = state.picks[group.letter];
    winners[group.letter] = findTeam(`${group.letter}:${picks[0]}`);
    runnersUp[group.letter] = findTeam(`${group.letter}:${picks[1]}`);
    if (state.wildcards.includes(group.letter)) {
      thirds[group.letter] = findTeam(`${group.letter}:${picks[2]}`);
    }
  });

  return { winners, runnersUp, thirds };
}

function buildBracket() {
  const { winners, runnersUp, thirds } = getQualifiers();
  const thirdAssignments = getOfficialThirdPlaceAssignments(Object.keys(thirds));
  const match = (number, teamA, teamB) => ({
    id: `m${number}`,
    number,
    teams: [teamKey(teamA), teamKey(teamB)],
    winner: null,
  });

  // يحافظ هذا الترتيب البصري على مسارات فيفا الرسمية من المباراة 89 حتى 104.
  const firstRound = [
    match(74, winners.E, thirds[thirdAssignments.E]),
    match(77, winners.I, thirds[thirdAssignments.I]),
    match(73, runnersUp.A, runnersUp.B),
    match(75, winners.F, runnersUp.C),
    match(83, runnersUp.K, runnersUp.L),
    match(84, winners.H, runnersUp.J),
    match(81, winners.D, thirds[thirdAssignments.D]),
    match(82, winners.G, thirds[thirdAssignments.G]),
    match(76, winners.C, runnersUp.F),
    match(78, runnersUp.E, runnersUp.I),
    match(79, winners.A, thirds[thirdAssignments.A]),
    match(80, winners.L, thirds[thirdAssignments.L]),
    match(86, winners.J, runnersUp.H),
    match(88, runnersUp.D, runnersUp.G),
    match(85, winners.B, thirds[thirdAssignments.B]),
    match(87, winners.K, thirds[thirdAssignments.K]),
  ];

  state.bracket = {
    version: 2,
    rounds: [
      firstRound,
      createEmptyRound([89, 90, 93, 94, 91, 92, 95, 96]),
      createEmptyRound([97, 98, 99, 100]),
      createEmptyRound([101, 102]),
      createEmptyRound([104]),
    ],
    champion: null,
  };

  saveState();
  showView("bracket");
  renderBracket();
}

function getOfficialThirdPlaceAssignments(qualifiedGroups) {
  const combinations = [];

  function choose(start, selected) {
    if (selected.length === 8) {
      combinations.push(selected.join(""));
      return;
    }

    for (let index = start; index <= 12 - (8 - selected.length); index += 1) {
      choose(index + 1, [...selected, GROUPS[index].letter]);
    }
  }

  choose(0, []);
  combinations.reverse();

  const key = [...qualifiedGroups].sort().join("");
  const optionIndex = combinations.indexOf(key);
  if (optionIndex < 0) throw new Error(`توليفة غير صحيحة لأفضل الثوالث: ${key}`);

  const assignment = OFFICIAL_THIRD_PLACE_ASSIGNMENTS.slice(optionIndex * 8, optionIndex * 8 + 8);
  return Object.fromEntries(THIRD_PLACE_WINNER_GROUPS.map((group, index) => [group, assignment[index]]));
}

function createEmptyRound(matchNumbers) {
  return matchNumbers.map((number) => ({
    id: `m${number}`,
    number,
    teams: [null, null],
    winner: null,
  }));
}

function chooseWinner(roundIndex, matchIndex, winnerKey) {
  const match = state.bracket.rounds[roundIndex][matchIndex];
  clearAdvancementFrom(roundIndex, matchIndex);
  match.winner = winnerKey;

  if (roundIndex === state.bracket.rounds.length - 1) {
    state.bracket.champion = winnerKey;
  } else {
    const nextMatch = state.bracket.rounds[roundIndex + 1][Math.floor(matchIndex / 2)];
    nextMatch.teams[matchIndex % 2] = winnerKey;
  }

  saveState();
  renderBracket();
}

function clearAdvancementFrom(roundIndex, matchIndex) {
  if (!state.bracket || roundIndex >= state.bracket.rounds.length - 1) {
    state.bracket.champion = null;
    return;
  }

  const nextRoundIndex = roundIndex + 1;
  const nextMatchIndex = Math.floor(matchIndex / 2);
  const nextMatch = state.bracket.rounds[nextRoundIndex][nextMatchIndex];
  nextMatch.teams[matchIndex % 2] = null;
  nextMatch.winner = null;
  state.bracket.champion = null;
  clearAdvancementFrom(nextRoundIndex, nextMatchIndex);
}

function renderBracket() {
  if (!state.bracket) {
    bracketBoard.innerHTML = emptyBracketMessage();
    sharePanel.hidden = true;
    return;
  }

  const previousScrollLeft = bracketShell.scrollLeft;
  const previousScrollTop = bracketShell.scrollTop;
  const rounds = state.bracket.rounds;
  const left = [
    rounds[0].slice(0, 8),
    rounds[1].slice(0, 4),
    rounds[2].slice(0, 2),
    rounds[3].slice(0, 1),
  ];
  const right = [
    rounds[3].slice(1),
    rounds[2].slice(2),
    rounds[1].slice(4),
    rounds[0].slice(8),
  ];

  bracketBoard.innerHTML = `
    <svg class="bracket-connectors" id="bracketConnectors" aria-hidden="true"></svg>
    ${left.map((matches, roundIndex) => renderRoundColumn(matches, roundIndex, false, roundIndex)).join("")}
    ${renderFinalColumn(rounds[4][0])}
    ${right.map((matches, visualIndex) => renderRoundColumn(matches, 3 - visualIndex, true, 3 - visualIndex)).join("")}
  `;

  bindMatchSelection(bracketBoard);

  const champion = state.bracket.champion ? findTeam(state.bracket.champion) : null;
  document.querySelector("#bracketStatus").textContent = champion
    ? `${teamName(champion)} بطل توقعاتك`
    : "اختر الفائز في كل مباراة";
  sharePanel.hidden = !champion;
  updateMobileRoundNavigation();
  requestAnimationFrame(() => {
    bracketShell.scrollLeft = previousScrollLeft;
    bracketShell.scrollTop = previousScrollTop;
    drawBracketConnectors();
  });
}

function renderRoundColumn(matches, roundIndex, rightSide, mobileRound) {
  return `
    <div class="round-column ${rightSide ? "right-side" : ""}" data-mobile-round="${mobileRound}">
      ${matches.map((match) => {
        const actualIndex = state.bracket.rounds[roundIndex].indexOf(match);
        return renderMatch(match, roundIndex, actualIndex);
      }).join("")}
    </div>
  `;
}

function renderFinalColumn(match) {
  const champion = state.bracket.champion ? findTeam(state.bracket.champion) : null;

  return `
    <div class="round-column final-column" data-mobile-round="4">
      <div class="trophy">
        ${champion
          ? `<img class="winner-trophy" src="trophy.png" alt="كأس العالم 2026">
             <img class="champion-flag" src="${flagUrl(champion.code, 160)}" alt="علم ${teamName(champion)}">`
          : `<div class="trophy-ring">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M15 8h18v8c0 9-4 14-9 14s-9-5-9-14V8Z"></path>
                <path d="M15 12H8c0 8 3 12 9 12M33 12h7c0 8-3 12-9 12M24 30v7M16 41h16"></path>
              </svg>
            </div>`
        }
        <small>${champion ? "بطل العالم" : "النهائي"}</small>
        <strong>${champion ? teamName(champion) : "منتخب واحد يتبقى"}</strong>
      </div>
      ${renderMatch(match, 4, 0)}
    </div>
  `;
}

function renderMatch(match, roundIndex, matchIndex) {
  return `
    <div class="match-card" data-round="${roundIndex}" data-match="${matchIndex}">
      ${match.number ? `<span class="match-number">M${match.number}</span>` : ""}
      ${match.teams.map((key) => {
        const team = key ? findTeam(key) : null;
        const isWinner = key && match.winner === key;

        return `
          <button
            type="button"
            class="match-team ${isWinner ? "winner" : ""}"
            ${team ? `data-team="${key}" data-round="${roundIndex}" data-match="${matchIndex}"` : "disabled"}
          >
            ${team
              ? `<span class="mini-flag"><img src="${flagUrl(team.code)}" alt="علم ${teamName(team)}"></span>
                 <span>${teamName(team)}</span>`
              : `<span class="mini-flag"></span><span>لم يتحدد بعد</span>`
            }
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function setMobileRound(roundIndex) {
  activeMobileRound = roundIndex;
  mobileRoundNav.querySelectorAll("button").forEach((button) => {
    const active = Number(button.dataset.mobileRound) === roundIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });

  const visualColumnIndexes = [0, 1, 2, 3, 4];
  const columns = [...bracketBoard.querySelectorAll(".round-column")];
  const targetColumn = columns[visualColumnIndexes[roundIndex]];
  if (!targetColumn) return;

  const targetCenter = targetColumn.offsetLeft + targetColumn.offsetWidth / 2;
  const maxScroll = bracketShell.scrollWidth - bracketShell.clientWidth;
  const targetScroll = Math.max(0, Math.min(maxScroll, targetCenter - bracketShell.clientWidth / 2));
  bracketShell.scrollTo({ left: targetScroll, behavior: "smooth" });
}

function updateMobileRoundNavigation() {
  if (!state.bracket) return;

  mobileRoundNav.querySelectorAll("button").forEach((button) => {
    const roundIndex = Number(button.dataset.mobileRound);
    const round = state.bracket.rounds[roundIndex];
    const completed = round.every((match) => match.winner);
    const available = roundIndex === 0 || round.some((match) => match.teams.some(Boolean));
    button.classList.toggle("complete", completed);
    button.disabled = !available;
  });

  mobileRoundNav.querySelectorAll("button").forEach((button) => {
    const active = Number(button.dataset.mobileRound) === activeMobileRound;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });
}

function bindMatchSelection(container) {
  container.querySelectorAll(".match-team[data-team]").forEach((button) => {
    button.addEventListener("click", () => {
      chooseWinner(Number(button.dataset.round), Number(button.dataset.match), button.dataset.team);
    });
  });
}

function drawBracketConnectors() {
  const svg = document.querySelector("#bracketConnectors");
  if (!svg) return;

  const boardRect = bracketBoard.getBoundingClientRect();
  const columns = [...bracketBoard.querySelectorAll(".round-column")];
  const paths = [];

  const connectColumns = (sourceColumnIndex, targetColumnIndex) => {
    const sourceCards = [...columns[sourceColumnIndex].querySelectorAll(".match-card")];
    const targetCards = [...columns[targetColumnIndex].querySelectorAll(".match-card")];

    sourceCards.forEach((sourceCard, index) => {
      const targetCard = targetCards[Math.floor(index / 2)];
      if (!targetCard) return;

      const source = sourceCard.getBoundingClientRect();
      const target = targetCard.getBoundingClientRect();
      const goesRight = target.left > source.left;
      const startX = (goesRight ? source.right : source.left) - boardRect.left;
      const endX = (goesRight ? target.left : target.right) - boardRect.left;
      const startY = source.top + source.height / 2 - boardRect.top;
      const endY = target.top + target.height / 2 - boardRect.top;
      const middleX = (startX + endX) / 2;

      paths.push(`<path d="M ${startX} ${startY} H ${middleX} V ${endY} H ${endX}"></path>`);
    });
  };

  for (let column = 0; column < 4; column += 1) connectColumns(column, column + 1);
  for (let column = 8; column > 4; column -= 1) connectColumns(column, column - 1);

  svg.setAttribute("viewBox", `0 0 ${bracketBoard.scrollWidth} ${bracketBoard.scrollHeight}`);
  svg.innerHTML = paths.join("");
}

function emptyBracketMessage() {
  return `
    <div class="round-column final-column" style="grid-column: 1 / -1;">
      <div class="trophy">
        <div class="trophy-ring">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M15 8h18v8c0 9-4 14-9 14s-9-5-9-14V8Z"></path>
            <path d="M15 12H8c0 8 3 12 9 12M33 12h7c0 8-3 12-9 12M24 30v7M16 41h16"></path>
          </svg>
        </div>
        <small>الأدوار الإقصائية مقفلة</small>
        <strong>أكمل توقعات المجموعات أولاً</strong>
      </div>
    </div>
  `;
}

async function exportBracketPng() {
  if (!state.bracket?.champion) return;

  exportButton.disabled = true;
  exportButton.textContent = "جارٍ تجهيز الصورة...";
  let flagImages = {};
  let trophyImage = null;

  try {
    await document.fonts.ready;
    const rounds = state.bracket.rounds;
    const teamKeys = [...new Set(rounds.flat(2).flatMap((item) => item?.teams || []).filter(Boolean))];
    const imageEntries = await Promise.all(teamKeys.map(async (key) => {
      const team = findTeam(key);
      return [key, await loadCanvasImage(EMBEDDED_FLAGS[team.code]).catch(() => null)];
    }));
    flagImages = Object.fromEntries(imageEntries);
    const logo = await loadCanvasImage("fifa-world-cup-2026-logo-alt.png").catch(() => null);
    trophyImage = await loadCanvasImage(EMBEDDED_TROPHY).catch(() => null);
    const canvas = createExportCanvas(flagImages, logo, trophyImage);
    await downloadCanvas(canvas, "توقعات-كأس-العالم-2026.png");
    showToast("تم حفظ صورة توقعاتك بنجاح.");
  } catch (error) {
    console.warn(error);

    try {
      const fallbackCanvas = createExportCanvas(flagImages, null, trophyImage);
      await downloadCanvas(fallbackCanvas, "توقعات-كأس-العالم-2026.png");
      showToast("تم حفظ الصورة بنجاح.");
    } catch (fallbackError) {
      console.error(fallbackError);
      showToast("تعذر حفظ الصورة. حاول لاحقاً.");
    }
  } finally {
    exportButton.disabled = false;
    exportButton.textContent = "حفظ كصورة PNG";
  }
}

function createExportCanvas(flagImages, logo, trophyImage) {
  const canvas = document.createElement("canvas");
  canvas.width = 2000;
  canvas.height = 1200;
  const context = canvas.getContext("2d");
  const rounds = state.bracket.rounds;
  const champion = findTeam(state.bracket.champion);
  const visualColumns = [
    rounds[0].slice(0, 8),
    rounds[1].slice(0, 4),
    rounds[2].slice(0, 2),
    rounds[3].slice(0, 1),
    [rounds[4][0]],
    rounds[3].slice(1),
    rounds[2].slice(2),
    rounds[1].slice(4),
    rounds[0].slice(8),
  ];
  const roundLabels = [
    "دور الـ32", "دور الـ16", "ربع النهائي", "نصف النهائي", "النهائي",
    "نصف النهائي", "ربع النهائي", "دور الـ16", "دور الـ32",
  ];

    const gradient = context.createLinearGradient(0, 0, 2000, 1200);
    gradient.addColorStop(0, "#071019");
    gradient.addColorStop(0.5, "#05090e");
    gradient.addColorStop(1, "#07131a");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 2000, 1200);

    context.strokeStyle = "rgba(255,255,255,.025)";
    context.lineWidth = 1;
    for (let x = 0; x <= 2000; x += 50) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, 1200);
      context.stroke();
    }
    for (let y = 0; y <= 1200; y += 50) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(2000, y);
      context.stroke();
    }

    context.textAlign = "center";
    const username = usernameInput.value.trim() || "مستخدم";
    context.fillStyle = "#f5f7f9";
    context.font = "800 38px Cairo";
    context.fillText(`توقعات ${username} لكأس العالم 2026`, 1000, 88, 1500);
    if (logo) context.drawImage(logo, 1865, 18, 64, 100);

    context.textAlign = "left";
    context.fillStyle = "#83909d";
    context.font = "600 18px Cairo";
    context.fillText("الأدوار الإقصائية الرسمية", 74, 88);

    const columnWidth = 190;
    const columnGap = 27;
    const startX = 30;
    roundLabels.forEach((label, index) => {
      context.textAlign = "center";
      context.fillStyle = index === 4 ? "#d6ff5e" : "#82909c";
      context.font = "700 14px Cairo";
      context.fillText(label, startX + index * (columnWidth + columnGap) + columnWidth / 2, 174);
    });

    drawCanvasConnectors(context, visualColumns, startX, columnWidth, columnGap);

    visualColumns.forEach((matches, columnIndex) => {
      const x = startX + columnIndex * (columnWidth + columnGap);
      if (columnIndex === 4) {
        drawChampionPanel(
          context,
          champion,
          flagImages[state.bracket.champion],
          trophyImage,
          x,
          220,
          columnWidth,
        );
        drawCanvasFinal(context, matches[0], flagImages, x - 24, 620, columnWidth + 48);
        return;
      }

      const availableHeight = 920;
      const top = 215;
      matches.forEach((match, matchIndex) => {
        const centerY = top + ((matchIndex + 0.5) * availableHeight) / matches.length;
        drawCanvasMatch(context, match, flagImages, x, centerY - 34, columnWidth);
      });
    });

    context.textAlign = "center";
    context.fillStyle = "#53606c";
    context.font = "500 13px Cairo";
    context.fillText("تم إنشاء هذه الصورة من توقعات المستخدم", 1000, 1170);

  return canvas;
}

function drawCanvasConnectors(context, visualColumns, startX, columnWidth, columnGap) {
  const cardHeight = 68;
  const availableHeight = 920;
  const top = 215;
  const centerFor = (columnIndex, matchIndex) => {
    if (columnIndex === 4) return 620 + 106 / 2;
    return top + ((matchIndex + 0.5) * availableHeight) / visualColumns[columnIndex].length;
  };
  const xFor = (columnIndex) => startX + columnIndex * (columnWidth + columnGap);

  context.strokeStyle = "rgba(0,213,140,.68)";
  context.lineWidth = 2;

  const connect = (sourceColumn, targetColumn) => {
    visualColumns[sourceColumn].forEach((_, matchIndex) => {
      const targetIndex = Math.floor(matchIndex / 2);
      const goesRight = targetColumn > sourceColumn;
      const startXValue = xFor(sourceColumn) + (goesRight ? columnWidth : 0);
      const endXValue = xFor(targetColumn) + (goesRight ? 0 : columnWidth);
      const startY = centerFor(sourceColumn, matchIndex);
      const endY = centerFor(targetColumn, targetIndex);
      const middleX = (startXValue + endXValue) / 2;

      context.beginPath();
      context.moveTo(startXValue, startY);
      context.lineTo(middleX, startY);
      context.lineTo(middleX, endY);
      context.lineTo(endXValue, endY);
      context.stroke();
    });
  };

  for (let column = 0; column < 4; column += 1) connect(column, column + 1);
  for (let column = 8; column > 4; column -= 1) connect(column, column - 1);
}

function loadCanvasImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (source.startsWith("http")) image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

async function downloadCanvas(canvas, filename) {
  if (canvas.toBlob) {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (blob) {
      const url = URL.createObjectURL(blob);
      triggerDownload(url, filename);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      return;
    }
  }

  triggerDownload(canvas.toDataURL("image/png"), filename);
}

function triggerDownload(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function drawCanvasMatch(context, match, flagImages, x, y, width) {
  context.fillStyle = "#0e1720";
  roundedRect(context, x, y, width, 68, 9);
  context.fill();
  context.strokeStyle = "rgba(255,255,255,.1)";
  context.stroke();

  context.textAlign = "left";
  context.fillStyle = "#596570";
  context.font = "700 8px Manrope";
  context.fillText(`M${match.number}`, x + 8, y + 11);

  match.teams.forEach((key, index) => {
    const rowY = y + 17 + index * 25;
    const team = key ? findTeam(key) : null;
    const winner = key && match.winner === key;
    if (winner) {
      context.fillStyle = "rgba(0,213,140,.12)";
      context.fillRect(x + 1, rowY - 1, width - 2, 25);
    }
    if (team && flagImages[key]) context.drawImage(flagImages[key], x + 8, rowY + 3, 28, 18);
    context.textAlign = "right";
    context.fillStyle = winner ? "#00d58c" : team ? "#f5f7f9" : "#66727d";
    context.font = "700 11px Cairo";
    context.fillText(team ? teamName(team) : "لم يتحدد", x + width - 8, rowY + 17, width - 50);
  });
}

function drawCanvasFinal(context, match, flagImages, x, y, width) {
  context.fillStyle = "#111d26";
  roundedRect(context, x, y, width, 106, 14);
  context.fill();
  context.strokeStyle = "rgba(214,255,94,.42)";
  context.lineWidth = 2;
  context.stroke();

  context.textAlign = "center";
  context.fillStyle = "#d6ff5e";
  context.font = "800 11px Cairo";
  context.fillText(`النهائي · M${match.number}`, x + width / 2, y + 20);

  match.teams.forEach((key, index) => {
    const rowY = y + 29 + index * 36;
    const team = key ? findTeam(key) : null;
    const winner = key && match.winner === key;

    if (winner) {
      context.fillStyle = "rgba(0,213,140,.14)";
      roundedRect(context, x + 7, rowY - 2, width - 14, 34, 7);
      context.fill();
    }

    if (team && flagImages[key]) {
      context.drawImage(flagImages[key], x + 13, rowY + 3, 43, 27);
    }

    context.textAlign = "right";
    context.fillStyle = winner ? "#00d58c" : team ? "#f5f7f9" : "#66727d";
    context.font = "800 15px Cairo";
    context.fillText(team ? teamName(team) : "لم يتحدد", x + width - 13, rowY + 23, width - 82);
  });
}

function drawChampionPanel(context, champion, flag, trophyImage, x, y, width) {
  context.textAlign = "center";
  const trophySize = 150;
  const flagPanelY = y + trophySize + 24;

  if (trophyImage) {
    context.drawImage(trophyImage, x + (width - trophySize) / 2, y, trophySize, trophySize);
  }

  if (flag) {
    context.fillStyle = "rgba(214,255,94,.1)";
    roundedRect(context, x + 25, flagPanelY, width - 50, 108, 18);
    context.fill();
    context.strokeStyle = "rgba(214,255,94,.3)";
    context.lineWidth = 2;
    context.stroke();
    context.drawImage(flag, x + 35, flagPanelY + 12, width - 70, 76);
  }
  context.fillStyle = "#d6ff5e";
  context.font = "800 15px Cairo";
  context.fillText("بطل العالم", x + width / 2, flagPanelY + 138);
  context.fillStyle = "#f5f7f9";
  context.font = "800 27px Cairo";
  context.fillText(teamName(champion), x + width / 2, flagPanelY + 180, width + 70);
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function showView(viewName) {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
  document.querySelector(`#${viewName}View`).classList.add("active");
  document.querySelector(`.nav-item[data-view="${viewName}"]`).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function resetAll() {
  if (!window.confirm("هل تريد إعادة تعيين جميع توقعات المجموعات والأدوار الإقصائية؟")) return;
  Object.assign(state, initialState());
  saveState();
  renderGroups();
  renderBracket();
  showView("groups");
}

quickFillButton.addEventListener("click", quickFill);
buildBracketButton.addEventListener("click", buildBracket);
editGroupsButton.addEventListener("click", () => showView("groups"));
exportButton.addEventListener("click", exportBracketPng);
usernameInput.addEventListener("input", () => {
  localStorage.setItem("road-to-26-username", usernameInput.value);
});
mobileRoundNav.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => setMobileRound(Number(button.dataset.mobileRound)));
});
window.addEventListener("resize", () => {
  if (state.bracket) requestAnimationFrame(drawBracketConnectors);
});
resetButton.addEventListener("click", resetAll);
document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.view === "bracket" && !state.bracket) {
      showToast("أكمل دور المجموعات لفتح الأدوار الإقصائية.");
      return;
    }
    showView(button.dataset.view);
    if (button.dataset.view === "bracket") renderBracket();
  });
});

renderGroups();
renderBracket();
usernameInput.value = localStorage.getItem("road-to-26-username") || "";

let currentFolder = "";

const backToFolders =
document.getElementById("backToFolders");

const initialLeft = 80;
const initialTop = 100;

const usb = document.getElementById("usb");
const port = document.getElementById("usbPort");

const overlay = document.getElementById("archiveOverlay");
const closeBtn = document.getElementById("closeOverlay");

const folderView =
document.getElementById("folderView");

const fileView =
document.getElementById("fileView");

const youtubeFile =
document.getElementById("youtubeFile");

const youtubeThumb =
document.getElementById("youtubeThumb");

const roleFile =
document.getElementById("roleFile");

const selectionNote =
document.getElementById("selectionNote");

let dragging = false;
let offsetX = 0;
let offsetY = 0;
let usbPlaceholder = null;

/* =========================
   Folder Data
========================= */

const folders = {

  folder1: {
    thumb: "images/youtube.png",
    url: "https://www.youtube.com/watch?v=xuiwJHdE3aY&t=5s"
  },

  folder2: {
    thumb: "images/youtube2.png",
    url: "https://www.youtube.com/watch?v=7LhU2SRzRIs&t=189s"
  },

  folder3: {
    thumb: "images/youtube3.png",
    url: "https://www.youtube.com/watch?v=ana0t75xXX0"
  }

};

/* =========================
   Archive
========================= */

function openArchive() {

  overlay.classList.add("active");

  folderView.style.display = "flex";

  fileView.classList.remove("active");

  backToFolders.style.display = "none";
}

function resetUSB(){

  usb.style.position = "relative";

  if(window.innerWidth <= 768){

    usb.style.left = "0";
    usb.style.top = "0";

  }else{

    usb.style.left = initialLeft + "px";
    usb.style.top = initialTop + "px";

  }

  usb.style.transform = "";

}

function closeArchive() {

  hideMemos();

  overlay.classList.remove("active");

  showFolderView();

  currentFolder = "";

  port.classList.remove("highlight");

  resetUSB();

}

/* =========================
   USB Drag Start
========================= */

function startUSBDrag(clientX, clientY) {

  dragging = true;

  if (!usbPlaceholder) {

    usbPlaceholder = document.createElement("div");
    usbPlaceholder.className = "usb-placeholder";

    usb.parentNode.insertBefore(
      usbPlaceholder,
      usb
    );

  }

  usb.classList.add("dragging");

  const rect = usb.getBoundingClientRect();

  offsetX = clientX - rect.left;
  offsetY = clientY - rect.top;

  usb.style.position = "fixed";
  usb.style.left = rect.left + "px";
  usb.style.top = rect.top + "px";

  port.classList.add("highlight");

}

usb.addEventListener("mousedown", (e) => {

    e.preventDefault();

  startUSBDrag(
    e.clientX,
    e.clientY
  );

});

usb.addEventListener("touchstart", (e) => {

  const touch = e.touches[0];

  startUSBDrag(
    touch.clientX,
    touch.clientY
  );

}, { passive: false });

const placeholder =
  document.createElement("div");

placeholder.className =
  "usb-placeholder";

usb.parentNode.insertBefore(
  placeholder,
  usb
);

/* =========================
   USB Move
========================= */

function moveUSB(clientX, clientY) {

  usb.style.left =
    (clientX - offsetX) + "px";

  usb.style.top =
    (clientY - offsetY) + "px";

}

document.addEventListener("mousemove", (e) => {

  if (!dragging) return;

  moveUSB(
    e.clientX,
    e.clientY
  );

});

document.addEventListener("touchmove", (e) => {

  if (!dragging) return;

  e.preventDefault();

  const touch = e.touches[0];

  moveUSB(
    touch.clientX,
    touch.clientY
  );

}, { passive: false });

/* =========================
   USB Drop
========================= */

function finishUSBDrag() {

  dragging = false;

  usb.classList.remove("dragging");

  const usbRect =
    usb.getBoundingClientRect();

  const portRect =
    port.getBoundingClientRect();

  const hit =
    usbRect.right > portRect.left &&
    usbRect.left < portRect.right &&
    usbRect.bottom > portRect.top &&
    usbRect.top < portRect.bottom;

  if (hit) {

    openArchive();

  } else {

    port.classList.remove("highlight");

    resetUSB();

  }

}

document.addEventListener("mouseup", () => {

  if (!dragging) return;

  finishUSBDrag();

});

document.addEventListener("touchend", () => {

  if (!dragging) return;

  finishUSBDrag();

});

/* =========================
   Folder Click
========================= */

document
.querySelectorAll(".folder")
.forEach(folder => {

  if(folder.id === "selectionNote") return;

  folder.addEventListener("click", () => {

    hideMemos();

    currentFolder = folder.id;

    const data = folders[currentFolder];

    youtubeThumb.src = data.thumb;
    youtubeFile.href = data.url;

    folderView.style.display = "none";

  requestAnimationFrame(() => {

  fileView.classList.add("active");

  backToFolders.style.display = "block";

});

  });

});

/* =========================
   Memo
========================= */

const roleMemo =
document.getElementById("roleMemo");

const roleMemoBody =
document.getElementById("roleMemoBody");

const roleMemoTitle =
document.querySelector(
  "#roleMemo .memo-title"
);

const selectionMemo =
document.getElementById("selectionMemo");

const selectionMemoBody =
document.getElementById("selectionMemoBody");

const roleData = {

  folder1: {

    title: "NCT WISH / M2 / 팅글썰롱",

    notes: [
      "프로모션 콘텐츠 리스트업",
      "외부 채널 커뮤니케이션",
      "촬영 현장 모니터링",
      "가편 피드백 전달",
      "이미지 보정"
    ]

  },

  folder2: {

    title:
      "NCT 127 / 기념일 라이브 방송 / 미래 전략 회의",

    notes: [
      "라이브 콘셉트 아이데이션",
      "외주 업체 커뮤니케이션",
      "라이브 현장 모니터링",
      "녹화본 및 자막 피드백 전달"
    ]

  },

  folder3: {

    title:
      "카이 / ootb STUDIO / 전과자",

    notes: [
      "외부 채널 커뮤니케이션",
      "촬영 현장 모니터링 및 피드백 전달",
      "릴리즈 실시간 모니터링"
    ]

  }

};

const selectionNotes = [

  "콘텐츠의 기획, 제작, 릴리즈 과정에 기여도가 높은 업무를 중심으로 선정",

  "유형이 겹치지 않도록 서로 다른 운영 환경의 프로젝트로 구성"

];

/* =========================
   Memo Toggle
========================= */

function toggleMemo(memo){

    if(memo.style.display==="block"){

        memo.style.display="none";
        resetMemo(memo);
        return;

    }

    resetMemo(memo);

    memo.style.display="block";

}

/* 선정기준 메모 */

selectionNote.addEventListener("click", () => {

  roleMemo.style.display = "none";
  resetMemo(roleMemo);

  selectionMemoBody.innerHTML = "";

  selectionNotes.forEach(text => {

    selectionMemoBody.appendChild(
      createMemoLine(text)
    );

  });

  toggleMemo(selectionMemo);

});

/* 담당역할 메모 */

roleFile.addEventListener("click", () => {

  selectionMemo.style.display = "none";
  resetMemo(selectionMemo);

  const data = roleData[currentFolder];

  roleMemoTitle.textContent =
  data.title;

  roleMemoBody.innerHTML = "";

  data.notes.forEach(line => {

  roleMemoBody.appendChild(
    createMemoLine(line)
  );

});

  toggleMemo(roleMemo);

});

/* =========================
   Memo UI
========================= */

let isResizing = false;
let currentHandle = null;

function createMemoLine(text = ""){

  const line =
    document.createElement("div");

  line.className = "memo-line";

  line.innerHTML = `
    <div class="memo-bullet">•</div>
    <div
      class="memo-text"
      contenteditable="true">${text}</div>
  `;

  return line;

}

function setupMemoEditor(editor){

  editor.addEventListener("beforeinput",(e)=>{

    if(e.inputType !== "insertParagraph")
      return;

    const memoText =
      e.target.closest(".memo-text");

    if(!memoText) return;

    e.preventDefault();

    if(memoText.textContent.trim() === "")
      return;

    const newLine =
      createMemoLine();

    memoText
      .closest(".memo-line")
      .insertAdjacentElement(
        "afterend",
        newLine
      );

    placeCaretAtEnd(
      newLine.querySelector(".memo-text")
    );

  });

  editor.addEventListener("keydown",(e)=>{

    if(e.key !== "Backspace")
      return;

    const memoText =
      e.target.closest(".memo-text");

    if(!memoText) return;

    const currentLine =
      memoText.closest(".memo-line");

    const prevLine =
      currentLine.previousElementSibling;

    const html =
      memoText.innerHTML
        .replace(/<br>/g,"")
        .trim();

    if(html !== "") return;

    if(!prevLine) return;

    e.preventDefault();

    currentLine.remove();

    placeCaretAtEnd(
      prevLine.querySelector(".memo-text")
    );

  });

}

function resetMemo(memo){

  console.log("reset", memo.id);
  const isMobile =
    window.innerWidth <= 768;

  if(isMobile){

    memo.style.left = "50%";
    memo.style.top = "50%";
    memo.style.transform = "translate(-50%,-50%)";

  }

  else{

    const target =
      memo.id === "roleMemo"
        ? roleFile
        : selectionNote;

    const rect = target.getBoundingClientRect();

memo.style.left = (rect.right + 50) + "px";
memo.style.top = (rect.top - 250) + "px";
memo.style.transform = "";


    memo.style.transform = "";

  }

  memo.style.width = "";
  memo.style.height = "";

  memo.classList.remove("minimized");

  const minBtn =
    memo.querySelector(".min-btn");

  if(minBtn){

    minBtn.textContent = "−";

  }

}
document.querySelectorAll(".memo").forEach(memo => {

   memo.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const textArea =
  memo.querySelector(".memo-text");

  const header =
  memo.querySelector(".memo-header");

  const closeBtn =
  memo.querySelector(".close-btn");

  const minBtn =
  memo.querySelector(".min-btn");

  let isDragging = false;

  let dragOffsetX = 0;
  let dragOffsetY = 0;

  if(textArea){

  textArea.addEventListener(
    "mousedown",
    e => e.stopPropagation()
  );

}

  /* =========================
     Memo Drag
  ========================= */

  function startMemoDrag(clientX, clientY) {

  isDragging = true;

  dragOffsetX = clientX - memo.offsetLeft;
  dragOffsetY = clientY - memo.offsetTop;

}

  function moveMemo(clientX, clientY) {

    memo.style.left =
      (clientX - dragOffsetX) + "px";

    memo.style.top =
      (clientY - dragOffsetY) + "px";

  }

  function stopMemoDrag() {

    isDragging = false;

  }

  header.addEventListener("mousedown", (e) => {

    if (
      e.target === closeBtn ||
      e.target === minBtn
    ) return;

    startMemoDrag(
      e.clientX,
      e.clientY
    );

  });

  header.addEventListener("touchstart", (e) => {

    if (
      e.target === closeBtn ||
      e.target === minBtn
    ) return;

    const touch = e.touches[0];

    startMemoDrag(
      touch.clientX,
      touch.clientY
    );

  }, { passive: true });

  document.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    moveMemo(
      e.clientX,
      e.clientY
    );

  });

  document.addEventListener("touchmove", (e) => {

    if (!isDragging) return;

    const touch = e.touches[0];

    moveMemo(
      touch.clientX,
      touch.clientY
    );

  }, { passive: true });

  document.addEventListener("mouseup", stopMemoDrag);

  document.addEventListener("touchend", stopMemoDrag);

  /* 닫기 */

  closeBtn.addEventListener("click",()=>{

  memo.style.display = "none";

  resetMemo(memo);

});

/* =========================
   Resize
========================= */

const resizeHandles =
  memo.querySelectorAll(".resize-handle");

const MIN_W = 300;
const MIN_H = 180;

resizeHandles.forEach(handle => {

  handle.addEventListener("mousedown", (e) => {

    e.preventDefault();
    e.stopPropagation();

    isResizing = true;
    currentHandle = handle;

    document.body.style.userSelect = "none";

  });

});

resizeHandles.forEach(handle => {

  handle.addEventListener("mouseup", (e) => {
    e.stopPropagation();
  });

});

function resizeMemo(rect, x, y) {

  if (currentHandle.classList.contains("right")) {

    memo.style.width =
      Math.max(
        MIN_W,
        x - rect.left
      ) + "px";

    return;

  }

  if (currentHandle.classList.contains("left")) {

    const width =
      Math.max(
        MIN_W,
        rect.right - x
      );

    memo.style.width = width + "px";
    memo.style.left =
      (rect.right - width) + "px";

    return;

  }

  if (currentHandle.classList.contains("bottom")) {

    memo.style.height =
      Math.max(
        MIN_H,
        y - rect.top
      ) + "px";

    return;

  }

  if (currentHandle.classList.contains("top")) {

    const height =
      Math.max(
        MIN_H,
        rect.bottom - y
      );

    memo.style.height = height + "px";
    memo.style.top =
      (rect.bottom - height) + "px";

    return;

  }

  if (currentHandle.classList.contains("br")) {

    memo.style.width =
      Math.max(
        MIN_W,
        x - rect.left
      ) + "px";

    memo.style.height =
      Math.max(
        MIN_H,
        y - rect.top
      ) + "px";

    return;

  }

  if (currentHandle.classList.contains("bl")) {

    const width =
      Math.max(
        MIN_W,
        rect.right - x
      );

    memo.style.width = width + "px";
    memo.style.left =
      (rect.right - width) + "px";

    memo.style.height =
      Math.max(
        MIN_H,
        y - rect.top
      ) + "px";

    return;

  }

  if (currentHandle.classList.contains("tr")) {

    const height =
      Math.max(
        MIN_H,
        rect.bottom - y
      );

    memo.style.height = height + "px";
    memo.style.top =
      (rect.bottom - height) + "px";

    memo.style.width =
      Math.max(
        MIN_W,
        x - rect.left
      ) + "px";

    return;

  }

  if (currentHandle.classList.contains("tl")) {

    const width =
      Math.max(
        MIN_W,
        rect.right - x
      );

    const height =
      Math.max(
        MIN_H,
        rect.bottom - y
      );

    memo.style.width = width + "px";
    memo.style.left =
      (rect.right - width) + "px";

    memo.style.height = height + "px";
    memo.style.top =
      (rect.bottom - height) + "px";

  }

}

document.addEventListener("mousemove", (e) => {

  if (!isResizing) return;

  resizeMemo(
    memo.getBoundingClientRect(),
    e.clientX,
    e.clientY
  );

});

document.addEventListener("mouseup", () => {

  setTimeout(() => {

    isResizing = false;
    currentHandle = null;

    document.body.style.userSelect = "";

  }, 0);

});

/* 최소화 */

minBtn.addEventListener("click",()=>{

  const isMinimized =
    memo.classList.contains("minimized");

  if(!isMinimized){

    memo.dataset.prevHeight =
      memo.offsetHeight;

    memo.classList.add("minimized");

    minBtn.textContent = "+";

  }

  else{

    memo.classList.remove("minimized");

    if(memo.dataset.prevHeight){

      memo.style.height =
        memo.dataset.prevHeight + "px";

    }

    minBtn.textContent = "−";

  }

});

});

setupMemoEditor(roleMemoBody);

setupMemoEditor(selectionMemoBody);

/* =========================
   View Helpers
========================= */

function hideMemos() {

  roleMemo.style.display = "none";
  selectionMemo.style.display = "none";

  resetMemo(roleMemo);
  resetMemo(selectionMemo);

}

function showFolderView() {

  console.trace("showFolderView 호출");

  fileView.classList.remove("active");

  folderView.style.display = "flex";

  backToFolders.style.display = "none";

}

/* =========================
   Overlay Close
========================= */

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    closeArchive();

  }

});

/* =========================
   Close Button
========================= */

closeBtn.addEventListener("click", () => {

  closeArchive();

});

overlay.addEventListener("click", (e) => {

  if (isResizing) return;

  if (e.target !== overlay) return;

  if (fileView.classList.contains("active")) {

    hideMemos();
    showFolderView();

  } else {

    closeArchive();

  }

});

backToFolders.addEventListener("click", () => {

  hideMemos();

  showFolderView();

});

function placeCaretAtEnd(el){

  el.focus();

  const range =
    document.createRange();

  range.selectNodeContents(el);

  range.collapse(false);

  const sel =
    window.getSelection();

  sel.removeAllRanges();

  sel.addRange(range);

}
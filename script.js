const saves = [
  {
    name: "세이브 명",
    date: "xxxx.xx.xx",
    time: "nn:nn:nn",
    image: null,
    imageX: 50,
    imageY: 50,
    imageZoom: 1,
    credit: ""
  },
  {
    name: "세이브 명",
    date: "xxxx.xx.xx",
    time: "nn:nn:nn",
    image: null,
    imageX: 50,
    imageY: 50,
    imageZoom: 1,
    credit: ""
  },
  {
    name: "세이브 명",
    date: "xxxx.xx.xx",
    time: "nn:nn:nn",
    image: null,
    imageX: 50,
    imageY: 50,
    imageZoom: 1,
    credit: ""
  },
  {
    name: "세이브 명",
    date: "xxxx.xx.xx",
    time: "nn:nn:nn",
    image: null,
    imageX: 50,
    imageY: 50,
    imageZoom: 1,
    credit: ""
  }
];

let selectedSave = 3;


/* =========================
   요소 가져오기
========================= */

const pairNameInput =
  document.getElementById("pairName");

const pairNamePreview =
  document.getElementById("pairNamePreview");

const saveNameInput =
  document.getElementById("saveName");

const saveDateInput =
  document.getElementById("saveDate");

const saveTimeInput =
  document.getElementById("saveTime");

  const saveCreditInput =
  document.getElementById("saveCredit");

  const backgroundColorInput =
  document.getElementById("backgroundColor");

  const backgroundHexInput =
  document.getElementById("backgroundHex");

  const highlightColorInput =
  document.getElementById("highlightColor");

const highlightHexInput =
  document.getElementById("highlightHex");

  const textColorInput =
  document.getElementById("textColor");

const textHexInput =
  document.getElementById("textHex");

  const saveCard =
  document.getElementById("saveCard");

  const downloadButton =
  document.getElementById("downloadButton");

const editingTitle =
  document.getElementById("editingTitle");

const mainSaveNumber =
  document.getElementById("mainSaveNumber");

const mainSaveName =
  document.getElementById("mainSaveName");

const mainSaveDate =
  document.getElementById("mainSaveDate");

const mainPlayTime =
  document.getElementById("mainPlayTime");

const saveSlots =
  document.querySelectorAll(".save-slot");

const selectorButtons =
  document.querySelectorAll("[data-select-save]");

  const saveImageInput =
  document.getElementById("saveImage");

const mainImage =
  document.querySelector(".main-image");

  const imageXInput =
  document.getElementById("imageX");

const imageYInput =
  document.getElementById("imageY");

const imageZoomInput =
  document.getElementById("imageZoom");

  const fontSelect = document.getElementById("fontSelect");


/* =========================
   숫자 01 / 02 형식
========================= */

function saveNumber(number) {
  return String(number).padStart(2, "0");
}


/* =========================
   페어명
========================= */

pairNameInput.addEventListener("input", () => {

  pairNamePreview.textContent =
    pairNameInput.value || "페어명";

});


/* =========================
   슬롯 화면 갱신
========================= */

function updateSlots() {

  saveSlots.forEach((slot, index) => {

    const save = saves[index];

    const slotCredit =
  slot.querySelector(".slot-credit");

if (slotCredit) {
  slotCredit.textContent =
    save.credit ? `© ${save.credit}` : "";
}

    slot.querySelector(".slot-name").textContent =
      save.name || "세이브 명";

      const slotImage =
  slot.querySelector(".slot-image");

if (save.image) {
  slotImage.innerHTML = `
    <img
      src="${save.image}"
      alt=""
      style="
  object-position: ${save.imageX}% ${save.imageY}%;
  transform: scale(${save.imageZoom});
"
    >
  `;
} else {
  slotImage.textContent = "";
}

    slot.querySelector(".slot-date").textContent =
      "DATE " + (save.date || "xxxx.xx.xx");

    slot.querySelector(".slot-time").textContent =
      save.time || "nn:nn:nn";


    if (index + 1 === selectedSave) {
      slot.classList.add("selected");
    } else {
      slot.classList.remove("selected");
    }

  });

}


/* =========================
   메인 SAVE 갱신
========================= */

function updateMainSave() {

  const save = saves[selectedSave - 1];

  if (save.image) {
  mainImage.innerHTML = `
    <img
      src="${save.image}"
      alt=""
      style="
  object-position: ${save.imageX}% ${save.imageY}%;
  transform: scale(${save.imageZoom});
"
    >
  `;
} else {
  mainImage.textContent = "";
}

  mainSaveNumber.textContent =
    "SAVE " + saveNumber(selectedSave);
    

  mainSaveName.textContent =
    save.name || "세이브 명";

  mainSaveDate.textContent =
    save.date || "xxxx.xx.xx";

  mainPlayTime.textContent =
    save.time || "nn:nn:nn";

}


/* =========================
   편집창 갱신
========================= */

function updateEditor() {

  const save = saves[selectedSave - 1];

  imageXInput.value = save.imageX;
imageYInput.value = save.imageY;
imageZoomInput.value = save.imageZoom;

  editingTitle.textContent =
    "SAVE " + saveNumber(selectedSave);

  saveNameInput.value =
  save.name === "세이브 명" ? "" : save.name;

  saveDateInput.value =
  save.date === "xxxx.xx.xx" ? "" : save.date;

  saveTimeInput.value =
  save.time === "nn:nn:nn" ? "" : save.time;

    saveCreditInput.value = save.credit;


  selectorButtons.forEach(button => {

    const number =
      Number(button.dataset.selectSave);

    if (number === selectedSave) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }

  });

}


/* =========================
   SAVE 선택
========================= */

function selectSave(number) {

  selectedSave = number;

  updateSlots();
  updateMainSave();
  updateEditor();

}


selectorButtons.forEach(button => {

  button.addEventListener("click", () => {

    selectSave(
      Number(button.dataset.selectSave)
    );

  });

});


/* 아래 미리보기 슬롯을 눌러도 선택 */

saveSlots.forEach(slot => {

  slot.addEventListener("click", () => {

    selectSave(
      Number(slot.dataset.save)
    );

  });

});


/* =========================
   세이브 명 입력
========================= */

saveNameInput.addEventListener("input", () => {

  saves[selectedSave - 1].name =
    saveNameInput.value;

  updateSlots();
  updateMainSave();

});


/* =========================
   날짜 입력
========================= */

saveDateInput.addEventListener("input", () => {

  saves[selectedSave - 1].date =
    saveDateInput.value;

  updateSlots();
  updateMainSave();

});


/* =========================
   플레이타임 입력
========================= */

saveTimeInput.addEventListener("input", () => {

  saves[selectedSave - 1].time =
    saveTimeInput.value;

  updateSlots();
  updateMainSave();

});

saveCreditInput.addEventListener("input", () => {
  saves[selectedSave - 1].credit =
    saveCreditInput.value;

  updateSlots();
});

saveImageInput.addEventListener("change", () => {

  const file = saveImageInput.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    saves[selectedSave - 1].image =
      reader.result;

    updateSlots();
    updateMainSave();

  };

  reader.readAsDataURL(file);

});

function updateSelectedImageStyle() {
  const save = saves[selectedSave - 1];

  const mainImg = mainImage.querySelector("img");

  if (mainImg) {
    mainImg.style.objectPosition =
      `${save.imageX}% ${save.imageY}%`;

    mainImg.style.transform =
      `scale(${save.imageZoom})`;
  }

  const selectedSlot =
    saveSlots[selectedSave - 1];

  const slotImg =
    selectedSlot.querySelector(".slot-image img");

  if (slotImg) {
    slotImg.style.objectPosition =
      `${save.imageX}% ${save.imageY}%`;

    slotImg.style.transform =
      `scale(${save.imageZoom})`;
  }
}

imageXInput.addEventListener("input", () => {
  saves[selectedSave - 1].imageX =
    Number(imageXInput.value);

  updateSelectedImageStyle();
});

imageYInput.addEventListener("input", () => {
  saves[selectedSave - 1].imageY =
    Number(imageYInput.value);

  updateSelectedImageStyle();
});

imageZoomInput.addEventListener("input", () => {
  saves[selectedSave - 1].imageZoom =
    Number(imageZoomInput.value);

  updateSelectedImageStyle();
});

backgroundColorInput.addEventListener("input", () => {
  saveCard.style.setProperty(
    "--background-color",
    backgroundColorInput.value
  );

  backgroundHexInput.value =
    backgroundColorInput.value;
});

backgroundHexInput.addEventListener("input", () => {
  let value = backgroundHexInput.value;

  // 사용자가 입력한 #은 제거하고 색상 문자만 남김
  value = value.replace(/#/g, "");

  // HEX에 사용할 수 있는 문자만 허용
  value = value.replace(/[^0-9A-Fa-f]/g, "");

  // 최대 6자리
  value = value.slice(0, 6);

  // 맨 앞에 # 자동 고정
  backgroundHexInput.value = "#" + value;

  // 6자리가 완성됐을 때 색상 적용
  if (value.length === 6) {
    const color = "#" + value;

    backgroundColorInput.value = color;

    saveCard.style.setProperty(
      "--background-color",
      color
    );
  }
});

highlightColorInput.addEventListener("input", () => {
  saveCard.style.setProperty(
    "--highlight-color",
    highlightColorInput.value
  );

  highlightHexInput.value =
    highlightColorInput.value;
});

highlightHexInput.addEventListener("input", () => {
  let value = highlightHexInput.value;

  value = value.replace(/#/g, "");
  value = value.replace(/[^0-9A-Fa-f]/g, "");
  value = value.slice(0, 6);

  highlightHexInput.value = "#" + value;

  if (value.length === 6) {
    const color = "#" + value;

    highlightColorInput.value = color;

    saveCard.style.setProperty(
      "--highlight-color",
      color
    );
  }
});

textColorInput.addEventListener("input", () => {
  saveCard.style.color =
    textColorInput.value;

  textHexInput.value =
    textColorInput.value;
});

textHexInput.addEventListener("input", () => {
  let value = textHexInput.value;

  value = value.replace(/#/g, "");
  value = value.replace(/[^0-9A-Fa-f]/g, "");
  value = value.slice(0, 6);

  textHexInput.value = "#" + value;

  if (value.length === 6) {
    const color = "#" + value;

    textColorInput.value = color;
    saveCard.style.color = color;
  }
});

downloadButton.addEventListener("click", async () => {
  if (downloadButton.disabled) return;

  downloadButton.disabled = true;
  const originalText = downloadButton.textContent;
  downloadButton.textContent = "저장 중...";

  try {
    const dataUrl = await htmlToImage.toPng(saveCard, {
      pixelRatio: 1,
      cacheBust: false,
      skipFonts: true
    });

    const blob = await fetch(dataUrl).then(response => response.blob());

    const url = URL.createObjectURL(blob);

    const pairName =
      pairNameInput.value.trim() || "PAIR";

    const link = document.createElement("a");
    link.download = `${pairName}_SAVE-FILES.png`;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

  } catch (error) {
    console.error("PNG 저장 실패:", error);
    alert("PNG 저장에 실패했습니다.");

  } finally {
    downloadButton.disabled = false;
    downloadButton.textContent = originalText;
  }
});

/* =========================
   최초 화면
========================= */

updateSlots();
updateMainSave();
updateEditor();

const fontMap = {
  Pretendard:
    '"Pretendard", "Noto Sans KR", sans-serif',

  "Noto Sans KR":
    '"Noto Sans KR", sans-serif',

  NanumSquareNeo:
    '"NanumSquareNeo", "Noto Sans KR", sans-serif',

 NanumGothic:
  '"Nanum Gothic", "Noto Sans KR", sans-serif',

"Gowun Batang":
  '"Gowun Batang", serif',

  Galmuri11:
    '"Galmuri11", sans-serif',

  NeoDunggeunmo:
    '"NeoDunggeunmo", sans-serif',

  "Noto Sans JP":
    '"Noto Sans JP", sans-serif',

  "Zen Kaku Gothic New":
    '"Zen Kaku Gothic New", sans-serif',

  "Shippori Mincho":
    '"Shippori Mincho", serif',

  Inter:
    '"Inter", sans-serif',

  Montserrat:
    '"Montserrat", sans-serif',

  "Playfair Display":
    '"Playfair Display", serif',

  "Space Mono":
    '"Space Mono", monospace'
};

fontSelect.addEventListener("change", () => {
  const selectedFont = fontSelect.value;

  saveCard.style.fontFamily =
    fontMap[selectedFont] || '"Noto Sans KR", sans-serif';
});
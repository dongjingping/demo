const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const tagContainer = document.getElementById("workTags");
const workCards = [...document.querySelectorAll(".work-card")];
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const qrButtons = [...document.querySelectorAll(".qr")];
const qrDialog = document.getElementById("qrDialog");
const qrTitle = document.getElementById("qrTitle");
const closeDialog = document.getElementById("closeDialog");
const musicToggle = document.getElementById("musicToggle");
const bgm = document.getElementById("bgm");

menuToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

tagContainer?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;
  const category = target.dataset.category || "all";

  tagContainer.querySelectorAll(".tag").forEach((tag) => {
    tag.classList.remove("active");
  });
  target.classList.add("active");

  workCards.forEach((card) => {
    const isVisible = category === "all" || card.dataset.category === category;
    card.style.display = isVisible ? "block" : "none";
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "需求已收到～ 24小时内回复你哦❤";
  contactForm.reset();
});

qrButtons.forEach((button) => {
  button.addEventListener("click", () => {
    qrTitle.textContent = button.dataset.qr || "二维码";
    qrDialog.showModal();
  });
});

closeDialog?.addEventListener("click", () => qrDialog.close());
qrDialog?.addEventListener("click", (event) => {
  const rect = qrDialog.getBoundingClientRect();
  const isOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (isOutside) qrDialog.close();
});

let isMusicPlaying = false;
musicToggle?.addEventListener("click", async () => {
  if (!isMusicPlaying) {
    try {
      await bgm.play();
      isMusicPlaying = true;
      musicToggle.textContent = "关闭背景音乐";
    } catch {
      musicToggle.textContent = "浏览器阻止自动播放，请再点一次";
    }
    return;
  }

  bgm.pause();
  bgm.currentTime = 0;
  isMusicPlaying = false;
  musicToggle.textContent = "播放轻柔背景音乐";
});

document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // 1. 模態框 (Modal) 互動邏輯 (核心邏輯)
  // ===================================
  const openModalButtons = document.querySelectorAll(".open-modal");
  const closeModalButtons = document.querySelectorAll(".close-button");
  const modals = document.querySelectorAll(".modal");

  const closeModals = () => {
    modals.forEach((modal) => {
      modal.style.display = "none";
    });
    document.body.style.overflow = "auto"; // 恢復背景捲動
  };

  // 打開模態框的事件監聽
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modalTarget;
      const modal = document.getElementById(modalId); // 使用 ID 尋找模態框
      if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // 鎖定背景捲動
      }
    });
  });

  // 點擊關閉按鈕 (×) 關閉模態框
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", closeModals);
  });

  // 點擊背景區塊關閉模態框
  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        closeModals();
      }
    });
  });

  // ===================================
  // 2. 捲動動畫 (Scroll Reveal) 邏輯
  // ===================================
  const revealCards = document.querySelectorAll(".reveal-card");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  revealCards.forEach((card) => {
    observer.observe(card);
  });

  // ===================================
  // 3. 平滑捲動 (Smooth Scroll) 邏輯
  // ===================================
  document
    .querySelectorAll('a[href^="#"], .scroll-down-indicator')
    .forEach((element) => {
      if (element.tagName === "A") {
        element.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
      } else if (element.classList.contains("scroll-down-indicator")) {
        element.addEventListener("click", function (e) {
          document.querySelector("#portfolio").scrollIntoView({
            behavior: "smooth",
          });
        });
      }
    });
});

function openTab(evt, tabName) {
  let tabContent = document.querySelectorAll(".tab-content");
  tabContent.forEach((tab) => tab.classList.add("hidden"));

  let tabLinks = document.querySelectorAll(".tab-link");
  tabLinks.forEach((tab) =>
    tab.classList.remove(
      "border-indigo-500",
      "text-indigo-500",
      "tab-active",
      "hidden"
    )
  );

  document.getElementById(tabName).classList.remove("hidden");
  evt.currentTarget.classList.add("border-indigo-500", "text-indigo-500");
  evt.currentTarget.classList.add("tab-active");
}

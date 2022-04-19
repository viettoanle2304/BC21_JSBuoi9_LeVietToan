// Loading
export const loadingOn = () => {
  document
    .getElementById("loading-overlay")
    .style.setProperty("display", "flex", "important");
};

export const loadingOff = () => {
  document
    .getElementById("loading-overlay")
    .style.setProperty("display", "none", "important");
};
// End

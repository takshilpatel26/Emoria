import { useEffect } from "react";

export const ProtectionLayer = () => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - DevTools
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I - Inspect
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+C - Inspect element
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J - Console
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+K - Console (Firefox)
      if (e.ctrlKey && e.shiftKey && e.key === "K") {
        e.preventDefault();
        return false;
      }
      // Ctrl+I - Developer Tools (old browsers)
      if (e.ctrlKey && e.key === "I") {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools opening
    let devToolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          console.warn(
            "%cDeveloper Tools are disabled on this website.",
            "color: red; font-size: 16px; font-weight: bold;"
          );
        }
      } else {
        devToolsOpen = false;
      }
    };

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", detectDevTools);

    // Check DevTools on mount
    detectDevTools();

    // Disable dragging of images
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener("dragstart", handleDragStart);

    // Disable text selection on sensitive elements
    const style = document.createElement("style");
    style.textContent = `
      video {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
      }
      body {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", detectDevTools);
      document.removeEventListener("dragstart", handleDragStart);
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

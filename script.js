const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const fallbackImages = document.querySelectorAll("img[data-fallback]");
fallbackImages.forEach((img) => {
  const applyFallback = () => {
    if (img.dataset.fallbackApplied === "true") {
      return;
    }
    const fallbackSrc = img.getAttribute("data-fallback");
    if (fallbackSrc) {
      img.dataset.fallbackApplied = "true";
      img.src = fallbackSrc;
    }
  };

  img.addEventListener("error", applyFallback);
  if (img.complete && img.naturalWidth === 0) {
    applyFallback();
  }
});

const mediaShell = document.querySelector(".media-shell");
if (mediaShell) {
  const rawVideo = mediaShell.getAttribute("data-video");
  if (rawVideo && rawVideo.trim().length > 0) {
    let videoId = rawVideo.trim();
    if (videoId.includes("youtube.com") || videoId.includes("youtu.be")) {
      try {
        const url = new URL(videoId);
        if (url.hostname.includes("youtu.be")) {
          videoId = url.pathname.replace("/", "");
        } else {
          videoId = url.searchParams.get("v") || videoId;
        }
      } catch (error) {
        videoId = rawVideo.trim();
      }
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
    iframe.title = "Book trailer";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    mediaShell.appendChild(iframe);
    const fallback = mediaShell.querySelector(".media-fallback");
    if (fallback) {
      fallback.remove();
    }
  }
}

function ShareButtons({ closeModal }) {
  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .then(closeModal)
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const shareEmail = () => {
    const subject = "Check out this list";
    const body = `Check out this list of some favorite spots: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    closeModal();
  };

  const shareText = () => {
    const message = `Check this out: ${window.location.href}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
    closeModal();
  };

  const shareFacebook = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
    closeModal();
  };

  const shareTwitter = () => {
    const url = window.location.href;
    const text = "Check this out!";
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
    closeModal();
  };

  return (
    <div className="share-buttons">
      <button onClick={shareLink}>Share Link</button>
      <button onClick={shareEmail}>Share via Email</button>
      <button onClick={shareText}>Share via Text</button>
      <button onClick={shareFacebook}>Share on Facebook</button>
      <button onClick={shareTwitter}>Share on Twitter</button>
      <button className="blue-button" onClick={closeModal}>
        Never Mind
      </button>
    </div>
  );
}
export default ShareButtons;

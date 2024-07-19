function ShareButtons({ closeModal, listName, listDescription }) {
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

  const shareText = () => {
    const message = `Check out this list:${listName}\n${window.location.href}\n${listDescription}`;
    const encodedMessage = encodeURIComponent(message)
      .replace(/%20/g, "+")
      .replace(/%0A/g, "%0D%0A");
    window.location.href = `sms:?body=${encodedMessage}`;
    closeModal();
  };

  const shareEmail = () => {
    const subject = encodeURIComponent("Check out this list");
    const body = `Check out this list:\n\n${listName}\n${window.location.href}\n\n${listDescription}`;
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:?subject=${subject}&body=${encodedBody}`;
    closeModal();
  };

  // Share on Facebook
// const shareFacebook = () => {
//   const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//     window.location.href
//   )}&quote=${encodeURIComponent(
//     `Check out this list: ${listName}\n\n${listDescription}`
//   )}`;
//   window.open(url, "_blank", "width=600,height=400");
//   closeModal();
// };

//   // Share on Twitter
//   const shareTwitter = () => {
//     const text = encodeURIComponent(
//       `Check out this list: ${listName}\n\n${listDescription}`
//     );
//     const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
//       window.location.href
//     )}`;
//     window.open(url, "_blank");
//     closeModal();
//   };

  return (
    <div className="share-buttons">
      <button onClick={shareLink}>Share Link</button>
      <button onClick={shareEmail}>Share via Email</button>
      <button onClick={shareText}>Share via Text</button>
      {/* <button onClick={shareFacebook}>Share on Facebook</button>
      <button onClick={shareTwitter}>Share on Twitter</button> */}
      <button className="blue-button" onClick={closeModal}>
        Never Mind
      </button>
    </div>
  );
}
export default ShareButtons;

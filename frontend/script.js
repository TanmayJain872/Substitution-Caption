/* jshint esversion: 11 */

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          captions {
            playerOut
            numberOut
            playerIn
            numberIn
            time
          }
        }
      `,
    }),
  });
  const data = await response.json();
  const latestCaption = data.data.captions[data.data.captions.length - 1];

  document.querySelector('.player-out .name').innerText = latestCaption.playerOut;
  document.querySelector('.player-out .number').innerText = `#${latestCaption.numberOut}`;
  document.querySelector('.player-in .name').innerText = latestCaption.playerIn;
  document.querySelector('.player-in .number').innerText = `#${latestCaption.numberIn}`;
  document.querySelector('.time').innerText = latestCaption.time;
  setTimeout(() => {
    document.getElementById('substitution-card').style.display = 'hidden'; // Hide after 5 seconds
  }, 5000);
});

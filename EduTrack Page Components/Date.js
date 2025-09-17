function formatDateTime() {
  const now = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dayName = days[now.getDay()];
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear().toString().slice(-2);

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const formattedDate = `${dayName} ${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  document.getElementById("date").textContent = formattedDate;
  document.getElementById("time").textContent = formattedTime;
}

window.onload = () => {
  formatDateTime();
  setInterval(formatDateTime, 1000);
};

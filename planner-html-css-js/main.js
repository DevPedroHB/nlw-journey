dayjs.locale("pt-br");

const section = document.querySelector("section");
let activities = [];

updateActivityList();
createDaysSelection();
createHoursSelection();

function formatter(date) {
  return {
    day: {
      numeric: dayjs(date).format("DD"),
      week: {
        short: dayjs(date).format("ddd"),
        long: dayjs(date).format("dddd"),
      },
    },
    month: dayjs(date).format("MMMM"),
    time: dayjs(date).format("HH:mm"),
  };
}

function saveActivity(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("activity");
  const day = formData.get("day");
  const time = formData.get("time");
  const date = `${day} ${time}`;

  const newActivity = {
    name,
    date,
    completed: false,
  };

  const activityExists = activities.find((activity) => {
    return activity.date == newActivity.date;
  });

  if (activityExists) {
    return alert("Dia/Hora não disponível.");
  }

  activities = [newActivity, ...activities];

  updateActivityList();
}

function createActivityItem(activity) {
  let input = `
    <input
      onchange="completeActivity(event)"
      value="${activity.date}"
      type="checkbox"
  `;

  if (activity.completed) {
    input += "checked";
  }

  input += ">";

  const formatted = formatter(activity.date);

  return `
    <div>
      ${input}
      <span>${activity.name}</span>
      <time>
        ${formatted.day.week.long}, dia ${formatted.day.numeric} de ${formatted.month} as ${formatted.time}h
      </time>
    </div>
  `;
}

function updateActivityList() {
  section.innerHTML = "";

  if (activities.length === 0) {
    section.innerHTML = "<p>Nenhuma atividade cadastrada.</p>";

    return;
  }

  for (let activity of activities) {
    section.innerHTML += createActivityItem(activity);
  }
}

function completeActivity(event) {
  const input = event.target;
  const dateOfThisInput = input.value;

  const activity = activities.find(
    (activity) => activity.date == dateOfThisInput
  );

  if (!activity) return;

  activity.completed = !activity.completed;
}

function createDaysSelection() {
  const days = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ];

  let daysSelection = "";

  for (let day of days) {
    const formatted = formatter(day);
    const dayFormatted = `${formatted.day.numeric} de ${formatted.month}`;

    daysSelection += `<option value="${day}">${dayFormatted}</option>`;
  }

  document.querySelector('select[name="day"]').innerHTML = daysSelection;
}

function createHoursSelection() {
  let availableHours = "";

  for (let i = 6; i < 23; i++) {
    const hour = String(i).padStart(2, "0");

    availableHours += `<option value="${hour}:00">${hour}:00</option>`;
    availableHours += `<option value="${hour}:30">${hour}:30</option>`;
  }

  document.querySelector('select[name="time"]').innerHTML = availableHours;
}
